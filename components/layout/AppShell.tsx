'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { BottomNav } from './BottomNav';
import { Drawer } from './Drawer';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

import { TopBar } from './TopBar';
import { PaywallModal } from '../ui/PaywallModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isInitialized, init, preferences, topBarProps } = useAppStore();
  const { isRTL } = useTranslation();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (isInitialized) {
      document.documentElement.setAttribute('data-theme', preferences.theme);
      document.body.setAttribute('data-theme', preferences.theme);
    }
  }, [isInitialized, preferences.theme]);

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "min-h-screen bg-surface selection:bg-secondary-container selection:text-on-secondary-container",
        isRTL ? "rtl" : "ltr"
      )}
      data-theme={preferences.theme}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <TopBar {...topBarProps} />
      <AnimatePresence mode="wait">
        <motion.main
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-surface"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <BottomNav />
      <Drawer />
      <PaywallModal />
    </div>
  );
}
