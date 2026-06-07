'use client';

import { useAppStore } from '@/store/app-store';
import { useTranslation } from '@/hooks/use-translation';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Drawer() {
  const { isDrawerOpen, toggleDrawer } = useAppStore();
  const { t, isRTL } = useTranslation();

  const menuItems = [
    { href: '/app', icon: 'home', label: t.home },
    { href: '/categories', icon: 'menu_book', label: t.categories },
    { href: '/my-duas', icon: 'auto_awesome', label: t.myDuas },
    { href: '/settings', icon: 'settings', label: t.settings },
    { href: '/about', icon: 'info', label: 'À propos' },
    { href: '/contact', icon: 'mail', label: 'Contact' },
  ];

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          key="drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
        />
      )}
      {isDrawerOpen && (
        <motion.aside
          key="drawer-aside"
          initial={{ x: isRTL ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: isRTL ? '100%' : '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cn(
            "fixed top-0 bottom-0 w-80 bg-surface z-[120] shadow-2xl flex flex-col",
            isRTL ? "right-0 rounded-l-[2.5rem]" : "left-0 rounded-r-[2.5rem]"
          )}
        >
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <Image 
                  src="/app_logo.png" 
                  alt="Logo" 
                  width={64} 
                  height={64} 
                  className="rounded-full shadow-md"
                />
              </div>
              <button 
                onClick={toggleDrawer}
                className="p-2 hover:bg-surface-container rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-on-surface/60">close</span>
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleDrawer}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-colors group"
                >
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform text-[28px]">
                    {item.icon}
                  </span>
                  <span className="font-manrope font-medium text-on-surface">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="pt-8 border-t border-outline-variant/10">
              <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest text-center">
                © novaskilltech 2026 • Version 1.0.0
              </p>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
