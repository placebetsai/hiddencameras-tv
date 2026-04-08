import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [];

export default function Page() {
  return (
    <Layout
      title="Hidden Camera Laws by State (2026) — Legal Guide — HiddenCameras.tv"
      description="Complete guide to hidden camera and surveillance laws in all 50 US states. What's legal, recording consent rules, and penalties."
      canonical="https://hiddencameras.tv/hidden-camera-laws"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"Is it legal to put a hidden camera in my own home?","acceptedAnswer":{"@type":"Answer","text":"Yes, in all 50 US states you can place hidden cameras in your own home. Exceptions: you cannot put cameras in bathrooms, guest bedrooms, or any area where someone has a reasonable expectation of privacy."}},{"@type":"Question","name":"Can my landlord put hidden cameras in my apartment?","acceptedAnswer":{"@type":"Answer","text":"No. Landlords cannot place cameras inside rental units. This is illegal in every state. Cameras in common areas (hallways, lobbies, parking lots) are generally legal with notice."}},{"@type":"Question","name":"What are the penalties for illegal hidden cameras?","acceptedAnswer":{"@type":"Answer","text":"Penalties vary by state but typically include felony charges, 1-5 years in prison, and fines up to $10,000. Federal law (18 USC 1801) also criminalizes video voyeurism."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">LEGAL GUIDE</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Hidden Camera Laws by State (2026)</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Complete guide to hidden camera and surveillance laws in all 50 US states. What's legal, recording consent rules, and penalties.</p>

      <AdUnit />

      <AdUnit />

      <p className="text-xs text-gray-600 mt-8">As an Amazon Associate, HiddenCameras.tv earns from qualifying purchases. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
