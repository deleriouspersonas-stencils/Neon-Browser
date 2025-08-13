
import React from 'react';

const SandboxIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M21 7.5a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9h-9m-9 9a9 9 0 019-9m-9 9a9 9 0 009 9m-9-9h9M3 12a9 9 0 019-9m-9 9a9 9 0 009 9m-9-9h9" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
      strokeOpacity="0.5"
    />
  </svg>
);

export default SandboxIcon;