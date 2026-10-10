import { EDITORIAL_A } from "../lib/categoryEditorial";
import { EDITORIAL_B } from "../lib/categoryEditorialB";
import Link from "next/link";

const EDITORIAL = { ...EDITORIAL_A, ...EDITORIAL_B };

/**
 * Unique editorial section for each camera category.
 *
 * Two jobs:
 *  1. Give every category page genuinely distinct, useful text, so the pages
 *     stop being the same template with a keyword swapped — which is what the
 *     AdSense "low value content" review flagged.
 *  2. Render the FAQ visibly in the page. Several pages shipped FAQPage
 *     structured data promising questions that never appeared in the body,
 *     which Google treats as a structured-data mismatch. The schema emitted
 *     here is built from the same array that renders the visible FAQ, so the
 *     two cannot drift apart again.
 */
export default function Editorial({ slug }) {
  const data = EDITORIAL[slug];
  if (!data) return null;

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section aria-labelledby={`editorial-${slug}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <h2
        id={`editorial-${slug}`}
        className="text-xl font-bold text-white mt-12 mb-4"
      >
        {data.kicker}
      </h2>
      <p className="text-gray-400 mb-8 max-w-3xl leading-relaxed">{data.intro}</p>

      {data.sections.map((s) => (
        <div key={s.h2} className="mb-10">
          <h3 className="text-lg font-bold text-white mb-3">{s.h2}</h3>
          {s.p.map((para, i) => (
            <p key={i} className="text-gray-400 mb-4 max-w-3xl leading-relaxed">
              {para}
            </p>
          ))}
          {s.list && (
            <ul className="mb-4 max-w-3xl space-y-2">
              {s.list.map((item, i) => (
                <li key={i} className="text-gray-400 text-sm leading-relaxed pl-5 relative">
                  <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <h3 className="text-lg font-bold text-white mt-12 mb-5">
        Frequently asked questions
      </h3>
      <div className="max-w-3xl space-y-3">
        {data.faq.map((f) => (
          <details
            key={f.q}
            className="border border-white/10 rounded-lg px-4 py-3 group"
          >
            <summary className="cursor-pointer font-semibold text-white text-sm list-none flex items-start justify-between gap-4">
              {f.q}
              <span className="text-white/50 shrink-0 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>

      <p className="text-xs text-gray-600 mt-6 max-w-3xl">
        Guides are written for information only and are not legal advice —
        surveillance and recording laws differ by state.{" "}
        <Link href="/hidden-camera-laws" className="underline">
          Recording laws by state
        </Link>
        . <Link href="/contact" className="underline">Contact us</Link> with a
        correction.
      </p>
    </section>
  );
}
