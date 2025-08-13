import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { Credentials, ToolSettings } from './types';
import { generateCredentials } from './utils/credentialGenerator';
import NavigationBar from './components/NavigationBar';
import BrowserFrame from './components/BrowserFrame';
import StatusBar from './components/StatusBar';
import BypassOverlay from './components/BypassOverlay';

const HOME_PAGE = 'about:blank';

const App: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>(generateCredentials());
  const [url, setUrl] = useState<string>(HOME_PAGE);
  const [history, setHistory] = useState<string[]>([HOME_PAGE]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isBypassing, setIsBypassing] = useState(false);
  const bypassTimerRef = useRef<number | null>(null);
  
  const [tools, setTools] = useState<ToolSettings>({
    downloadAccelerator: true,
    protocolInjection: false,
    sandboxOverride: false,
    memoryCloaking: false,
    transactionSplicer: false,
    rngOverride: false,
    certificateForgery: false,
    cspNeutralizer: false,
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (newUrl: string) => {
    // If Protocol Injection is off, block javascript: URIs.
    if (newUrl.toLowerCase().startsWith('javascript:') && !tools.protocolInjection) {
      // Treat as a search query instead of executing
      const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(newUrl)}`;
      setUrl(searchUrl);
      return;
    }
    
    // Basic URL validation for http/https/about
    let correctedUrl = newUrl;
    if (!/^(https?:\/\/|about:|javascript:)/i.test(newUrl)) {
      correctedUrl = `https://duckduckgo.com/?q=${encodeURIComponent(newUrl)}`;
    }

    if (tools.cspNeutralizer && newUrl !== HOME_PAGE) {
      if (bypassTimerRef.current) {
        clearTimeout(bypassTimerRef.current);
      }
      setIsBypassing(true);
      bypassTimerRef.current = window.setTimeout(() => {
        setIsBypassing(false);
        bypassTimerRef.current = null;
      }, 3000);
    }
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(correctedUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setUrl(correctedUrl);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
    }
  };
  
  const handleReload = () => {
    if (iframeRef.current) {
        if (tools.cspNeutralizer && url !== HOME_PAGE) {
            setIsBypassing(true);
            if (bypassTimerRef.current) clearTimeout(bypassTimerRef.current);
            bypassTimerRef.current = window.setTimeout(() => setIsBypassing(false), 3000);
        }
        iframeRef.current.src = 'about:blank';
        setTimeout(() => {
            if(iframeRef.current) iframeRef.current.src = url;
        }, 100);
    }
  };

  const handleNewSession = () => {
    setCredentials(generateCredentials());
    setUrl(HOME_PAGE);
    setHistory([HOME_PAGE]);
    setHistoryIndex(0);
  };

  const handleToggleTool = (tool: keyof ToolSettings) => {
    setTools(prev => ({ ...prev, [tool]: !prev[tool] }));
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-900/80 backdrop-blur-sm border border-cyan-500/10 shadow-2xl relative">
      <NavigationBar
        onNavigate={handleNavigate}
        onBack={handleBack}
        onForward={handleForward}
        onReload={handleReload}
        onNewSession={handleNewSession}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < history.length - 1}
        tools={tools}
        onToggleTool={handleToggleTool}
        credentials={credentials}
      />
      <BrowserFrame ref={iframeRef} url={url} sandboxOverride={tools.sandboxOverride} />
      <StatusBar tools={tools} />
      {isBypassing && <BypassOverlay url={url} />}
    </div>
  );
};

export default App;