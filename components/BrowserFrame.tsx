
import React, { forwardRef } from 'react';

interface BrowserFrameProps {
  url: string;
  sandboxOverride: boolean;
}

const BrowserFrame = forwardRef<HTMLIFrameElement, BrowserFrameProps>(({ url, sandboxOverride }, ref) => {
  
  // Base sandbox for security
  let sandboxPermissions = "allow-scripts allow-forms allow-popups allow-downloads";

  // If override is on, add more permissions. This is intentionally powerful.
  if (sandboxOverride) {
    sandboxPermissions += " allow-same-origin allow-top-navigation allow-top-navigation-by-user-activation";
  }

  return (
    <div className="flex-grow bg-slate-800/50">
      <iframe
        ref={ref}
        src={url}
        className="w-full h-full border-none"
        title="Neon-Browser Content"
        sandbox={sandboxPermissions}
      />
    </div>
  );
});

export default BrowserFrame;