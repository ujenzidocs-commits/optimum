import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export default function Logo({ className = 'h-10 w-auto', variant = 'full' }: LogoProps) {
  const strokeColor = 'currentColor';
  const fillColor = 'currentColor';

  return (
    <motion.svg
      viewBox="0 0 260 90"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <g fill="none" stroke={strokeColor} strokeWidth="2">
        <circle cx="42" cy="36" r="22" fill={fillColor} fillOpacity="0.12" />
        <path d="M 30 38 C 30 30 38 24 46 24 C 54 24 61 29 61 38 C 61 48 52 58 46 58 C 38 58 30 48 30 38 Z" fill={fillColor} />
        <path d="M 44 25 L 44 46 L 54 46" stroke="white" strokeWidth="3" />
        <path d="M 44 46 L 51 39" stroke="white" strokeWidth="3" />
      </g>
      {variant === 'full' && (
        <>
          <text x="84" y="42" fontSize="32" fontWeight="700" fontFamily="'Inter', system-ui, sans-serif" fill={strokeColor}>
            Optimum
          </text>
          <text x="84" y="64" fontSize="11" fontWeight="600" fontFamily="'Inter', system-ui, sans-serif" fill="#475569" letterSpacing="1.5">
            PRIME SOLUTIONS LTD
          </text>
        </>
      )}
    </motion.svg>
  );
}
