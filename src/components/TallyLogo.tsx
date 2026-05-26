interface TallyLogoProps {
  className?: string;
}

export default function TallyLogo({ className = 'h-10 w-auto' }: TallyLogoProps) {
  return (
    <svg
      viewBox="0 0 180 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TallyPrime"
    >
      <rect x="0" y="0" width="40" height="40" rx="10" fill="#dc2626" />
      <text x="20" y="26" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff" fontFamily="Inter, system-ui, sans-serif">
        T
      </text>
      <text x="52" y="22" fontSize="18" fontWeight="700" fill="#111827" fontFamily="Inter, system-ui, sans-serif">
        Tally
      </text>
      <text x="52" y="34" fontSize="10" fill="#b91c1c" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.1em">
        PRIME
      </text>
    </svg>
  );
}
