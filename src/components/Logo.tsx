import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  isDark?: boolean;
}

export default function Logo({ className = 'h-10 w-auto', variant = 'full', isDark = false }: LogoProps) {
  const bgColor = isDark ? '#0a1929' : '#ffffff';
  const cloudColor1 = '#2563eb';
  const cloudColor2 = '#0ea5e9';
  const textColor = isDark ? '#ffffff' : '#102a43';

  return (
    <motion.svg
      viewBox="0 0 260 90"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <defs>
        {/* Gradient for cloud */}
        <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: cloudColor1, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: cloudColor2, stopOpacity: 1 }} />
        </linearGradient>

        {/* Gradient for text */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#102a43', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: cloudColor1, stopOpacity: 1 }} />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="shadowFilter">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" floodColor="#102a43" />
        </filter>
      </defs>

      {/* Cloud icon with download arrow */}
      <g filter="url(#shadowFilter)">
        {/* Cloud shape */}
        <path
          d="M 45 20 Q 35 20 30 28 Q 18 28 16 40 Q 16 52 25 58 L 65 58 Q 76 58 76 47 Q 76 36 68 32 Q 65 22 57 20 Q 51 15 45 15 Q 36 15 32 20"
          fill="url(#cloudGradient)"
          stroke="url(#cloudGradient)"
          strokeWidth="0.5"
          opacity="0.95"
        />

        {/* Download arrow - vertical line */}
        <line x1="50" y1="30" x2="50" y2="48" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

        {/* Download arrow - top part */}
        <path
          d="M 50 48 L 45 42 M 50 48 L 55 42"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Base line */}
        <line x1="38" y1="52" x2="62" y2="52" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Company name - "Optimum" */}
      {variant === 'full' && (
        <>
          <text
            x="85"
            y="48"
            fontSize="32"
            fontWeight="700"
            fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fill="url(#textGradient)"
            letterSpacing="-0.5"
          >
            Optimum
          </text>

          {/* Tagline - "PRIME SOLUTIONS LTD" */}
          <text
            x="85"
            y="68"
            fontSize="11"
            fontWeight="600"
            fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fill="#243b53"
            letterSpacing="1.3"
          >
            PRIME SOLUTIONS LTD
          </text>
        </>
      )}
    </motion.svg>
  );
}
