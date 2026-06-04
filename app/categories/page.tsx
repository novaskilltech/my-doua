'use client';

import { CategoryGrid } from '@/components/categories/CategoryGrid';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function CategoriesPage() {
  const { t } = useTranslation();
  const { setTopBarProps } = useAppStore();

  useEffect(() => {
    setTopBarProps({ title: t.categories });
  }, [setTopBarProps, t.categories]);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <main className="flex-1 pt-24 pb-32 px-6 max-w-2xl mx-auto w-full">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-headline font-bold text-primary tracking-tight">
              {t.categories}
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Parcourez les invocations par thématiques pour trouver celle qui vous convient.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CategoryGrid />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
