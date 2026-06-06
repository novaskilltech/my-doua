'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: '/app', icon: 'home', label: t.home },
    { href: '/categories', icon: 'menu_book', label: t.categories },
    { href: '/prayers', icon: 'schedule', label: t.prayers },
    { href: '/my-duas', icon: 'auto_awesome', label: t.myDuas },
    { href: '/settings', icon: 'settings', label: t.settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 sm:px-6 pb-6 pt-3 bg-surface/65 backdrop-blur-3xl border-t border-outline-variant/15 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-t-[32px]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center justify-center px-1 sm:px-4 py-1.5 transition-all active:scale-90 duration-200 group flex-1 max-w-[72px] sm:max-w-none"
          >
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-secondary-container rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span 
              className={cn(
                "material-symbols-outlined mb-0.5 text-xl sm:text-2xl transition-colors duration-300",
                isActive ? "text-on-secondary-container" : "text-on-surface/40 group-hover:text-primary"
              )}
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className={cn(
              "font-manrope text-[8px] sm:text-[10px] tracking-wide uppercase transition-colors duration-300 text-center truncate w-full",
              isActive ? "font-bold text-on-secondary-container" : "font-medium text-on-surface/40 group-hover:text-primary"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
