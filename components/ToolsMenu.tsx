import React from 'react';
import { ToolSettings } from '../types';
import DownloadIcon from './icons/DownloadIcon';
import InjectionIcon from './icons/InjectionIcon';
import SandboxIcon from './icons/SandboxIcon';
import MemoryIcon from './icons/MemoryIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import DiceIcon from './icons/DiceIcon';
import CertificateIcon from './icons/CertificateIcon';
import ShieldSlashIcon from './icons/ShieldSlashIcon';

interface ToolsMenuProps {
  tools: ToolSettings;
  onToggleTool: (tool: keyof ToolSettings) => void;
  onClose: () => void;
}

const ToolToggle: React.FC<{
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: () => void;
}> = ({ label, description, icon, enabled, onToggle }) => (
  <div
    onClick={onToggle}
    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-cyan-500/10 cursor-pointer transition-colors"
  >
    <div className="flex-shrink-0 w-6 h-6 text-slate-400">{icon}</div>
    <div className="flex-grow">
      <p className="font-medium text-slate-200">{label}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
    <div className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-cyan-500' : 'bg-slate-700'}`}>
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'transform translate-x-5' : ''}`}></div>
    </div>
  </div>
);

const ToolsMenu: React.FC<ToolsMenuProps> = ({ tools, onToggleTool, onClose }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-slate-900/90 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-2xl p-2 z-20">
      <h3 className="px-3 py-1 text-xs font-semibold text-cyan-400 tracking-wider uppercase">Protocol Tools</h3>
      <div className="mt-1 space-y-1">
        <ToolToggle
          label="CSP Neutralizer"
          description="Bypasses X-Frame-Options & CSP headers."
          icon={<ShieldSlashIcon />}
          enabled={tools.cspNeutralizer}
          onToggle={() => onToggleTool('cspNeutralizer')}
        />
        <ToolToggle
          label="Certificate Forgery"
          description="Spoofs SSL/TLS certificates to bypass warnings."
          icon={<CertificateIcon />}
          enabled={tools.certificateForgery}
          onToggle={() => onToggleTool('certificateForgery')}
        />
        <ToolToggle
          label="Protocol Injection"
          description="Allows javascript: execution in address bar."
          icon={<InjectionIcon />}
          enabled={tools.protocolInjection