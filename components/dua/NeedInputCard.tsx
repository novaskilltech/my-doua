'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '../ui/Base';
import { Sparkles, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

import { useAppStore } from '@/store/app-store';

export function NeedInputCard() {
  const [input, setInput] = useState('');
  const { t, isRTL } = useTranslation();
  const router = useRouter();
  const { isPremium, setPaywallOpen } = useAppStore();

  const handleSearch = () => {
    if (!input.trim()) return;
    if (!isPremium) {
      setPaywallOpen(true);
      return;
    }
    router.push(`/result?q=${encodeURIComponent(input)}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container-low/50 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.03)] relative overflow-hidden border border-outline-variant/25"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-container/10 rounded-full -mr-24 -mt-24 blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-24 -mb-24 blur-[80px]"></div>
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Sparkles size={20} />
          </div>
          <label className="block font-headline text-xl text-primary font-bold" htmlFor="mood-input">
            {t.searchPlaceholder}
          </label>
        </div>
        
        <div className="relative group">
          <textarea
            id="mood-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Exprimez votre état d'esprit ici..."
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all resize-none font-body text-lg leading-relaxed min-h-[160px] shadow-inner"
            rows={4}
            maxLength={500}
          />
          
          <div className="absolute bottom-4 left-6 flex items-center gap-4">
            <span className={cn(
              "text-[10px] font-bold tracking-widest uppercase transition-colors",
              input.length > 450 ? "text-error" : "text-on-surface-variant/40"
            )}>
              {input.length}/500
            </span>
          </div>

          <div className={`absolute bottom-4 ${isRTL ? "left-4" : "right-4"} flex items-center gap-2`}>
            <AnimatePresence>
              {input.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setInput('')}
                  className="p-3 text-on-surface-variant/40 hover:text-error transition-colors"
                >
                  <X size={20} />
                </motion.button>
              )}
            </AnimatePresence>
            
            <button 
              onClick={handleSearch}
              disabled={!input.trim()}
              className="bg-primary text-on-primary p-4 rounded-2xl hover:bg-primary-container transition-all shadow-xl shadow-primary/20 active:scale-90 disabled:opacity-30 disabled:shadow-none disabled:active:scale-100 group"
            >
              <Send size={20} className={cn("transition-transform", !input.trim() ? "" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {['Anxiété', 'Gratitude', 'Patience', 'Succès'].map((tag) => (
            <button
              key={tag}
              onClick={() => setInput(tag)}
              className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
