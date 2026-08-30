export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      return env.ASSET.fetch(new Request(new URL('/index.html', url), request));
    }
    return env.ASSET.fetch(request);
  }
};
