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
      {/* camera body */}
      <rect x="3" y="10" width="20" height="14" rx="2.5" fill="#1a1a1a" stroke="#00c853" strokeWidth="1.5"/>
      {/* shutter bump */}
      <rect x="10" y="8" width="5" height="3" rx="1" fill="#00c853"/>
      {/* lens ring */}
      <circle cx="13" cy="17" r="5" fill="#0d0d0d" stroke="#00c853" strokeWidth="1.5"/>
      {/* lens iris */}
      <circle cx="13" cy="17" r="2.5" fill="#00c853" opacity="0.9"/>
      {/* lens glint */}
      <circle cx="14.2" cy="15.8" r="0.9" fill="#fff" opacity="0.5"/>
      {/* CCTV mount arm */}
      <path d="M23 13.5 L29 11.5 L29 22.5 L23 20.5" stroke="#00c853" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
      {/* record dot */}
      <circle cx="21.5" cy="12" r="1.5" fill="#ff3b3b"/>
    </svg>
  );
}
