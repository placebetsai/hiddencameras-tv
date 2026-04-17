export default function CameraIcon({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="10" width="20" height="14" rx="2.5" fill="#0d1424" stroke="#22c55e" strokeWidth="1.5"/>
      <rect x="10" y="8" width="5" height="3" rx="1" fill="#22c55e"/>
      <circle cx="13" cy="17" r="5" fill="#0a0e1a" stroke="#22c55e" strokeWidth="1.5"/>
      <circle cx="13" cy="17" r="2.5" fill="#22c55e" opacity="0.9"/>
      <circle cx="14.2" cy="15.8" r="0.9" fill="#fff" opacity="0.5"/>
      <path d="M23 13.5 L29 11.5 L29 22.5 L23 20.5" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="21.5" cy="12" r="1.5" fill="#ef4444"/>
    </svg>
  );
}
