
import React from 'react';
import TorIcon from './icons/TorIcon';
import type { ToolSettings } from '../types';

interface StatusBarProps {
  tools: ToolSettings;
}

const StatusBar: React.FC<StatusBarProps> = ({ tools }) => {
  const isBypassing = tools.certificateForgery;

  return (
    <footer className="bg-dark-navy/80 backdrop-blur-xl border-t border-cyan-500/20 px-4 py-1 flex items-center justify-between text-xs text-slate-400 flex-shrink-0">
      <div className="flex items-center gap-2">
        <TorIcon className="w-4 h-4 text-cyan-400" />
        <span>TOR CIRCUIT: <span className="text-green-400 font-medium">ACTIVE</span></span>
      </div>
      <div className="font-mono flex items-center gap-2">
        {isBypassing ? (
          <>
            <span>STATUS: <span className="text-amber-400 font-bold tracking-wider">UNCHAINED</span></span>
          </>
        ) : (
          <span>STATUS: <span className="text-green-400">SECURE</span></span>
        )}
      </div>
    </footer>
  );
};

export default StatusBar;