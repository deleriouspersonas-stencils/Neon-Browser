
import React from 'react';

const ProtocolIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3.75H19.5a2.25 2.25 0 012.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6a2.25 2.25 0 012.25-2.25h3.75m13.5 0V9.75M8.25 3.75v6M8.25 15v3.75M3 15h3.75m13.5 0h-3.75M3 12h18M9.75 9h4.5M9.75 15h4.5"
    />
  </svg>
);

export default ProtocolIcon;