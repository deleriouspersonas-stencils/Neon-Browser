
import React, { useState } from 'react';
import { Credentials, ToolSettings } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import ReloadIcon from './icons/ReloadIcon';
import SparklesIcon from './icons/SparklesIcon';
import ToolsIcon from './icons/ToolsIcon';
import ToolsMenu from './ToolsMenu';
import ProtocolIcon from './icons/ProtocolIcon';

interface NavigationBarProps {
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onNewSession: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  tools: ToolSettings;
  onToggleTool: (tool: keyof ToolSettings) => void;
  credentials: Credentials;
}

const NavButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button onClick={onClick} disabled={disabled} className="p-2 rounded-md text-slate-300 disabled:text-slate-600 hover:enabled:bg-cyan-500/20 hover:enabled:text-cyan-300 transition-colors">
        {children}
    </button>
);

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            props.onNavigate(inputValue);
        }
    };
    
  return (
    <header className="bg-dark-navy/80 backdrop-blur-xl border-b border-cyan-500/20 p-2 flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1">
            <NavButton onClick={props.onBack} disabled={!props.canGoBack}>
                <ArrowLeftIcon className="w-5 h-5" />
            </NavButton>
            <NavButton onClick={props.onForward} disabled={!props.canGoForward}>
                <ArrowRightIcon className="w-5 h-5" />
            </NavButton>
            <NavButton onClick={props.onReload} disabled={false}>
                <ReloadIcon className="w-5 h-5" />
            </NavButton>
        </div>

        <div className="flex-grow mx-2">
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter URL or run script via javascript:..."
                    className="w-full px-4 py-2 text-sm rounded-md address-bar text-slate-200 placeholder-slate-500 focus:outline-none"
                />
            </form>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 border border-cyan-500/20 bg-cyan-900/40 px-3 py-1.5 rounded-md">
           <ProtocolIcon className="w-4 h-4 text-cyan-500" />
           <span className="truncate">{props.credentials.endpoint}</span>
        </div>

        <div className="flex items-center gap-1 relative pl-2 border-l border-cyan-500/20">
            <button onClick={props.onNewSession} className="p-2 rounded-md text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors">
                <SparklesIcon className="w-5 h-5" />
            </button>
            
            <button onClick={() => setIsToolsMenuOpen(prev => !prev)} className="p-2 rounded-md text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors">
                <ToolsIcon className="w-5 h-5" />
            </button>
            {isToolsMenuOpen && (
                <ToolsMenu
                    tools={props.tools}
                    onToggleTool={props.onToggleTool}
                    onClose={() => setIsToolsMenuOpen(false)}
                />
            )}
        </div>
    </header>
  );
};

export default NavigationBar;