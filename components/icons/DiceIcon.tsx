
import React from 'react';

const DiceIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 .001l4.5 2.625m-4.5-2.625l-4.5 2.625M21 12l-2.25 1.313M21 12l-2.25-1.313M3 12l2.25 1.313M3 12l2.25-1.313M12 6l2.25 1.313M12 6l-2.25 1.313M12 6V4.5" 
    />
  </svg>
);

export default DiceIcon;