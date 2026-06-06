'use client';

import { TopBar } from '@/components/layout/TopBar';
import { NeedInputCard } from '@/components/dua/NeedInputCard';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { DuaResultCard } from '@/components/dua/DuaResultCard';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Brain, Sun, Moon } from 'lucide-react';

export default function HomePage() {
  const { t, isRTL } = useTranslation();
  const { savedDuas, setTopBarProps } = useAppStore();
  
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

          {/* Quick Suggestions */}
          <motion.section variants={itemVariants}>
            <div className="flex justify-between items-end mb-6">
              <h3 className="font-manrope font-bold text-primary tracking-tight uppercase text-xs">{t.suggestionsForYou}</h3>
              <Link href="/categories" className="flex items-center text-xs font-bold text-secondary group">
                {t.viewAll}
                <ArrowRight size={14} className={`${isRTL ? "mr-1 rotate-180" : "ml-1"} transition-transform group-hover:translate-x-1`} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/categories/anxiete" className="group cursor-pointer bg-surface-container-high rounded-3xl p-6 flex flex-col justify-between aspect-square hover:bg-primary hover:text-on-primary transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/20">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <Brain size={24} />
                </div>
                <div>
                  <h4 className="font-headline text-xl font-bold mb-1">{t.anxiety}</h4>
                  <p className="text-[10px] opacity-70 group-hover:opacity-100 uppercase tracking-wider font-bold">{t.innerCalm}</p>
                </div>
              </Link>
              <Link href="/categories/gratitude" className="group cursor-pointer bg-secondary-container rounded-3xl p-6 flex flex-col justify-between aspect-square hover:bg-primary hover:text-on-primary transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/20">
                <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center text-on-secondary-container group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="font-headline text-xl font-bold mb-1 text-on-secondary-container group-hover:text-on-primary">{t.gratitude}</h4>
                  <p className="text-[10px] text-on-secondary-container/70 group-hover:text-on-primary/70 uppercase tracking-wider font-bold">{t.blessings}</p>
                </div>
              </Link>
            </div>
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

          {/* Time-based section */}
          <motion.section 
            variants={itemVariants}
            className="bg-surface-container rounded-[32px] p-8 flex items-center gap-6 border border-outline-variant/30"
          >
            <div className="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container shrink-0">
              {new Date().getHours() > 18 || new Date().getHours() < 6 ? <Moon size={32} /> : <Sun size={32} />}
            </div>
            <div className="space-y-1">
              <h4 className="font-headline font-bold text-primary text-lg">
                {new Date().getHours() > 18 || new Date().getHours() < 6 ? t.eveningDuas : t.morningDuas}
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {new Date().getHours() > 18 || new Date().getHours() < 6 ? t.eveningDuasDesc : t.morningDuasDesc}
              </p>
            </div>
            <Link 
              href={new Date().getHours() > 18 || new Date().getHours() < 6 ? "/categories/soir" : "/categories/matin"} 
              className="ml-auto w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
            </Link>
          </motion.section>

          {/* Mood Input Section (AI Assistant) */}
          <motion.section variants={itemVariants}>
            <NeedInputCard />
          </motion.section>
        </div>
      </motion.main>
    </div>
  );
}
