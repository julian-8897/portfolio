export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      aria-label="Julian Chan"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* J — curved tail */}
      <path
        d="M9 6v15a4 4 0 0 1-4 4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* C — open arc */}
      <path
        d="M28 12a7 7 0 1 0 0 12"
        stroke="hsl(var(--primary))"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* trajectory dot — phase plot reference */}
      <circle cx="22.5" cy="18" r="1.4" fill="hsl(var(--primary))" />
    </svg>
  );
}
