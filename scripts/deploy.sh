#!/usr/bin/env bash
# Build + deploy hiddencameras.tv from THIS laptop with wrangler.
#
# Replaces .github/workflows/deploy.yml, which was doing this on a GitHub
# runner — and doing it WRONG: it passed --project-name=hiddencameras, but the
# Cloudflare project is `hiddencameras-tv`. That mismatch is why the project
# sat undeployed for two months while the article cron kept committing content
# nobody ever saw. Deploying from here means the command sits next to the code
# and the project name is checked against Cloudflare before we upload.
#
# Credentials: .env.deploy (mode 600, gitignored) holding
#   CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
#
# Usage:
#   scripts/deploy.sh              build and deploy
#   scripts/deploy.sh --no-build   deploy an existing out/ (faster iteration)
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."
PROJECT="hiddencameras-tv"
BUILD=1
[ "${1:-}" = "--no-build" ] && BUILD=0

# --- credentials -----------------------------------------------------------
if [ ! -f .env.deploy ]; then
  echo "deploy: .env.deploy missing — create it with CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID (mode 600)" >&2
  exit 1
fi
set -a
# shellcheck disable=SC1091
. ./.env.deploy
set +a
[ -n "${CLOUDFLARE_API_TOKEN:-}" ] || { echo "deploy: CLOUDFLARE_API_TOKEN not set" >&2; exit 1; }
[ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ] || { echo "deploy: CLOUDFLARE_ACCOUNT_ID not set" >&2; exit 1; }

# --- prove the project name exists before spending time building -----------
# The old workflow's wrong project name is exactly the failure this catches.
echo "deploy: checking Cloudflare knows a Pages project called '$PROJECT'"
if ! npx wrangler pages project list 2>/dev/null | grep -qw "$PROJECT"; then
  echo "deploy: NO SUCH PROJECT '$PROJECT'. Refusing to deploy — the old workflow shipped to a project that does not exist." >&2
  echo "deploy: available projects:" >&2
  npx wrangler pages project list 2>&1 | sed 's/^/    /' >&2
  exit 1
fi
echo "deploy: project '$PROJECT' confirmed"

# --- build -----------------------------------------------------------------
if [ "$BUILD" -eq 1 ]; then
  [ -d node_modules ] || npm install --legacy-peer-deps
  echo "deploy: building"
  npm run build
fi

[ -d out ] || { echo "deploy: out/ missing — run without --no-build" >&2; exit 1; }
echo "deploy: out/ contains $(find out -type f | wc -l) files"

# --- upload ----------------------------------------------------------------
npx wrangler pages deploy out --project-name="$PROJECT" --branch=main --commit-dirty=true

# --- verify ----------------------------------------------------------------
SHA="$(git rev-parse HEAD)"
echo "deploy: verifying the live site reflects $SHA"
for i in 1 2 3 4 5 6; do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 25 https://hiddencameras-tv.pages.dev/ || true)"
  echo "  attempt $i: hiddencameras-tv.pages.dev -> HTTP $code"
  if [ "$code" = "200" ]; then
    echo "deploy: VERIFIED live (commit $SHA)"
    exit 0
  fi
  sleep 5
done
echo "deploy: NOT VERIFIED — the live site never returned 200" >&2
exit 1
