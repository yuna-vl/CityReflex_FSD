import React from 'react';

/**
 * Original CivicReflex Emblem
 * A dignified, non-imitative institutional seal representing public civic services,
 * accountability, and citizen empowerment.
 */
export const Emblem = ({ size = 52, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`civic-emblem ${className}`}
      aria-hidden="true"
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="emblemDarkNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B2545" />
          <stop offset="100%" stopColor="#003366" />
        </linearGradient>
        <linearGradient id="emblemGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6E7B8" />
          <stop offset="50%" stopColor="#CDA250" />
          <stop offset="100%" stopColor="#9A7225" />
        </linearGradient>
      </defs>

      {/* Outer Rim */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="url(#emblemGoldGrad)" strokeWidth="3" />
      <circle cx="50" cy="50" r="43" fill="url(#emblemDarkNavy)" stroke="#CDA250" strokeWidth="1" />
      
      {/* Dashed Inner Wheel Motif */}
      <circle cx="50" cy="50" r="39" fill="none" stroke="#CDA250" strokeWidth="0.8" strokeDasharray="3,2" />

      {/* Central Shield of Public Integrity */}
      <path
        d="M 50 19 L 68 26 C 68 40 59 53 50 59 C 41 53 32 40 32 26 Z"
        fill="#0B2545"
        stroke="url(#emblemGoldGrad)"
        strokeWidth="2"
      />

      {/* Civic Pillars inside Shield (Representing Transparency, Redressal, Accountability) */}
      <rect x="42" y="28" width="3" height="15" fill="#FFFFFF" rx="1" />
      <rect x="48.5" y="26" width="3" height="17" fill="#CDA250" rx="1" />
      <rect x="55" y="28" width="3" height="15" fill="#FFFFFF" rx="1" />
      
      {/* Pedestal Arch */}
      <path d="M 40 27 L 60 27 L 50 22 Z" fill="#CDA250" />
      <rect x="39" y="43" width="22" height="2.5" fill="#CDA250" rx="0.5" />

      {/* Laurel of Public Welfare & Accountability */}
      <path
        d="M 27 50 C 23 62 31 73 42 77"
        fill="none"
        stroke="#CDA250"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 73 50 C 77 62 69 73 58 77"
        fill="none"
        stroke="#CDA250"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Base Civic Stars */}
      <polygon points="50,71 52,76 57,76 53,79 55,84 50,81 45,84 47,79 43,76 48,76" fill="#CDA250" />
      <polygon points="41,73 42.5,76.5 46,76.5 43,78.5 44.5,82 41,80 37.5,82 39,78.5 36,76.5 39.5,76.5" fill="#CDA250" />
      <polygon points="59,73 60.5,76.5 64,76.5 61,78.5 62.5,82 59,80 55.5,82 57,78.5 54,76.5 57.5,76.5" fill="#CDA250" />
    </svg>
  );
};

export default Emblem;

