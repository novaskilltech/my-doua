'use client';

import { TopBar } from '@/components/layout/TopBar';
import { NeedInputCard } from '@/components/dua/NeedInputCard';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { DuaResultCard } from '@/components/dua/DuaResultCard';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CategoryGrid } from '@/components/categories/CategoryGrid';

export default function HomePage() {
  const { t, isRTL } = useTranslation();
  const { savedDuas, setTopBarProps, addSavedDua } = useAppStore();
  
  useEffect(() => {
    setTopBarProps({});
  }, [setTopBarProps]);

  const recentSaved = savedDuas.slice(-2).reverse();



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 pt-24 pb-32 px-4 max-w-2xl mx-auto w-full"
      >
        <div className="bg-surface-container-lowest rounded-[32px] p-5 sm:p-8 md:p-10 shadow-md border border-outline-variant/30 space-y-12">
          {/* Welcome Section */}
          <motion.section variants={itemVariants} className="space-y-2">
            <div className="flex items-center gap-2 text-secondary mb-1">
              <Sparkles size={16} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{t.welcome}</span>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-tight animate-none">
              {t.peaceBeUponYou}
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
              {t.slogan}
            </p>
          </motion.section>

          {/* Categories Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="font-manrope font-bold text-primary tracking-tight uppercase text-xs">
                {t.categories}
              </h3>
            </div>
            <CategoryGrid />
          </motion.section>

          {/* Daily Verse */}
          <motion.section 
            variants={itemVariants}
            className="bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-[32px] p-10 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            <Sparkles className="text-secondary/40 mx-auto mb-6" size={32} />
            <p className="font-headline italic text-2.5xl text-primary leading-relaxed mb-6">
              {t.dailyVerse}
            </p>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">
              {t.dailyVerseSource}
            </div>
          </motion.section>

          {/* Recent Saved */}
          {recentSaved.length > 0 && (
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-manrope font-bold text-primary tracking-tight uppercase text-xs">{t.recentSaved}</h3>
                <Link href="/my-duas" className="flex items-center text-xs font-bold text-primary group">
                  {t.myDuas}
                  <ArrowRight size={14} className={`${isRTL ? "mr-1 rotate-180" : "ml-1"} transition-transform group-hover:translate-x-1`} />
                </Link>
              </div>
              <div className="space-y-6">
                {recentSaved.map((dua) => (
                  <DuaResultCard key={dua.id} dua={dua} isSaved />
                ))}
              </div>
            </motion.section>
          )}

          {/* Mood Input Section (AI Assistant) */}
          <motion.section variants={itemVariants}>
            <NeedInputCard />
          </motion.section>
        </div>
      </motion.main>
    </div>
  );
}
