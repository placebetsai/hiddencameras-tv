import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout
      title="Contact — HiddenCameras.tv"
      canonical="https://hiddencameras.tv/contact"
    >
      <div className="max-w-xl mx-auto text-center py-20">
        <h1 className="text-3xl font-black text-white mb-4">Get in Touch</h1>
        <p className="text-gray-400 mb-8">
          Questions, tips, or partnership inquiries — we'd love to hear from you.
        </p>
        <a
          href="mailto:info@hiddencameras.tv?subject=HiddenCameras.tv Inquiry"
          className="btn-primary text-lg px-8 py-4 inline-block"
        >
          Email Us → info@hiddencameras.tv
        </a>
      </div>
    </Layout>
  );
}
