import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, RefreshCw, Trash2, Mail, Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Domain {
  id: string;
  domain: string;
}

interface EmailDisplayProps {
  email: string | null;
  loading: boolean;
  domains: Domain[];
  selectedDomain: string | null;
  onDomainChange: (domain: string) => void;
  onRefresh: (customPrefix?: string, domain?: string) => void;
  onDelete: () => void;
}

export const EmailDisplay = ({ 
  email, 
  loading, 
  domains, 
  selectedDomain, 
  onDomainChange, 
  onRefresh, 
  onDelete 
}: EmailDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [customPrefix, setCustomPrefix] = useState('');

  const handleCopy = async () => {
    if (!email) return;
    
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateWithCustomPrefix = () => {
    const prefix = customPrefix.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    onRefresh(prefix || undefined, selectedDomain || undefined);
    setCustomPrefix('');
  };

  const handleDomainSelect = (domain: string) => {
    onDomainChange(domain);
    // Extract current username and regenerate with new domain
    if (email) {
      const username = email.split('@')[0];
      onRefresh(username, domain);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel p-4 sm:p-6 md:p-8 relative overflow-hidden"
    >
      {/* Moving mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient-bg opacity-30 pointer-events-none" />
      
      {/* Neon glow effect */}
      <div className="absolute inset-0 animate-pulse-neon rounded-xl pointer-events-none" />
      
      {/* Background gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-[hsl(var(--neon-glow-secondary))]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium text-muted-foreground">Your Disposable Email</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[260px] text-center">
                    <p className="text-xs">
                      This is a temporary disposable address for privacy protection — not a permanent Gmail account. Perfect for signups, trials, and avoiding spam.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground/60">Auto-refreshes every 5 seconds</p>
              {/* Live Pulse Dot */}
              <div className="relative flex items-center">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Custom Username Input - Always Visible */}
        <div className="mb-4">
          <label className="text-xs text-muted-foreground mb-1.5 block">Custom Email ID (optional)</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-0">
              <Input
                type="text"
                placeholder="your-custom-id"
                value={customPrefix}
                onChange={(e) => setCustomPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                className="flex-1 bg-secondary/50 border-border text-sm rounded-r-none focus:z-10"
                maxLength={20}
              />
              <span className="px-3 py-2 bg-secondary/30 border border-l-0 border-border text-muted-foreground text-sm">
                @
              </span>
              {/* Domain Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-l-none border-l-0 bg-secondary/50 border-border hover:border-primary/50 transition-all min-w-[100px] sm:min-w-[140px] justify-between h-10"
                    disabled={loading || domains.length === 0}
                  >
                    <span className="text-xs sm:text-sm truncate max-w-[60px] sm:max-w-[100px]">
                      {selectedDomain || 'Select'}
                    </span>
                    <ChevronDown className="w-3 h-3 ml-1 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="glass-panel border-border bg-background/95 backdrop-blur-xl min-w-[180px] z-50"
                >
                  {domains.map((domain) => (
                    <DropdownMenuItem
                      key={domain.id}
                      onClick={() => handleDomainSelect(domain.domain)}
                      className={`cursor-pointer transition-colors ${
                        selectedDomain === domain.domain 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      @{domain.domain}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              onClick={handleGenerateWithCustomPrefix}
              disabled={loading}
              className="mesh-gradient-btn-intense text-white font-medium h-10 px-4 whitespace-nowrap"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Generate
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/50 mt-1.5">
            Leave empty for random ID • Only lowercase letters and numbers
          </p>
        </div>

        {/* Current Email Display */}
        <div className="mb-4">
          <label className="text-xs text-muted-foreground mb-1.5 block">Current Email Address</label>
          <div 
            className="w-full bg-secondary/50 rounded-lg px-3 sm:px-4 py-3 border border-border cursor-pointer hover:border-primary/50 transition-colors group relative overflow-hidden"
            onClick={handleCopy}
          >
            {/* Subtle mesh gradient on hover */}
            <div className="absolute inset-0 mesh-gradient-bg opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-muted-foreground">Generating...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="email"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm sm:text-base md:text-lg font-mono neon-text block group-hover:scale-[1.01] transition-transform relative z-10 break-all"
                >
                  {email || 'No email generated'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons - Stacked on mobile */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  disabled={!email || loading}
                  className="flex-1 sm:flex-none border-border hover:border-primary/50 hover:bg-primary/10 transition-all hover:scale-105 h-11"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Email</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy email to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => onRefresh(undefined, selectedDomain || undefined)}
                  disabled={loading}
                  className="flex-1 sm:flex-none border-border hover:border-primary/50 hover:bg-primary/10 transition-all hover:scale-105 h-11"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  <span>New Random</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate new random email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={onDelete}
                  disabled={!email || loading}
                  className="flex-1 sm:flex-none border-border hover:border-destructive/50 hover:bg-destructive/10 transition-all hover:scale-105 h-11"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span>Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete current mailbox</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
};
