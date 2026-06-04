'use client';

import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function TopBar({ title, showBack, onBack }: TopBarProps) {
  const { t, isRTL } = useTranslation();
  const { toggleDrawer } = useAppStore();

  return (
    <header className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex items-center gap-4">
        {showBack ? (
          <button 
            type="button"
            onClick={onBack}
            className="hover:bg-surface-container transition-colors p-2.5 rounded-full active:scale-90 transition-transform"
          >
            <span className={cn("material-symbols-outlined text-primary text-2xl", isRTL && "rotate-180")}>
              arrow_back
            </span>
          </button>
        ) : (
          <button 
            type="button"
            onClick={toggleDrawer}
            className="p-2.5 hover:bg-surface-container transition-colors rounded-full active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-primary text-2xl">menu</span>
          </button>
        )}
      </div>
      
      {/* Centered Title Banner */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <h2 className="font-headline font-bold text-lg sm:text-xl text-primary tracking-tight flex items-center gap-2 select-none">
          {title ? (
            <span>{title}</span>
          ) : (
            <>
              <span>Mon Dou‘a</span>
              <span className="text-secondary font-medium font-arabic text-sm">دعائي</span>
            </>
          )}
        </h2>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="hover:bg-surface-container p-2.5 rounded-full transition-colors active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-on-surface/60 text-2xl">share</span>
        </button>
        <div className="w-10 h-10 rounded-2xl bg-surface-container overflow-hidden border-2 border-white shadow-sm ring-1 ring-outline-variant/10 relative">
          <Image 
            alt="Logo" 
            className="w-full h-full object-cover" 
            src="/favicon1.png" 
            fill
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
