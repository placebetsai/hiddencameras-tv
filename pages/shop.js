import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Shop() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/best-hidden-cameras-2026");
  }, [router]);
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#080b0d", color: "#9ca3af" }}>
      <p>Redirecting to camera reviews...</p>
    </div>
  );
}
