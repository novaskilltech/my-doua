'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { DuaResultCard } from '@/components/dua/DuaResultCard';
import { Button } from '@/components/ui/Base';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function MyDuasPage() {
  const { t, isRTL } = useTranslation();
  const { savedDuas, toggleFavorite, setTopBarProps } = useAppStore();
  const [search, setSearch] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  useEffect(() => {
    setTopBarProps({ title: t.myDuas });
  }, [setTopBarProps, t.myDuas]);

  const filteredDuas = savedDuas.filter(dua => {
    const matchesSearch = 
      dua.translation.toLowerCase().includes(search.toLowerCase()) ||
      dua.arabic.includes(search) ||
      dua.source.toLowerCase().includes(search.toLowerCase());
    const matchesFavorite = onlyFavorites ? dua.isFavorite : true;
    return matchesSearch && matchesFavorite;
  }).reverse();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto w-full space-y-10">
        {/* Header Section */}
        <header className="space-y-6">
          <div className="flex items-end justify-between">
            <h1 className="font-headline text-4xl text-primary">{t.myDuas}</h1>
            <span className="text-xs font-manrope font-bold text-on-surface-variant tracking-widest uppercase">
              {savedDuas.length} {savedDuas.length > 1 ? 'Douas' : 'Doua'}
            </span>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher dans mes douas..."
                className="w-full h-14 pl-12 pr-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container transition-all text-on-surface placeholder:text-on-surface-variant/40"
              />
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              <Button 
                variant={onlyFavorites ? 'primary' : 'tonal'} 
                size="sm" 
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className="rounded-full whitespace-nowrap"
              >
                <span 
                  className="material-symbols-outlined mr-2 text-lg"
                  style={{ fontVariationSettings: onlyFavorites ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
                {t.favorite}
              </Button>
              <Button variant="tonal" size="sm" className="rounded-full whitespace-nowrap">
                <span className="material-symbols-outlined mr-2 text-lg">filter_list</span>
                Filtres
              </Button>
              <Button variant="tonal" size="sm" className="rounded-full whitespace-nowrap">
                <span className="material-symbols-outlined mr-2 text-lg">sort</span>
                Trier
              </Button>
            </div>
          </div>
        </header>

        {/* Results List */}
        <section className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredDuas.length > 0 ? (
              filteredDuas.map((dua, index) => (
                <motion.div
                  key={dua.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <DuaResultCard 
                    dua={dua} 
                    isSaved 
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-surface-container-lowest rounded-[2rem] border border-dashed border-outline-variant/20"
              >
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant/20">
                  <span className="material-symbols-outlined text-5xl">
                    {search ? 'search_off' : 'bookmark_border'}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-on-surface font-headline text-xl">
                    {search ? 'Aucun résultat' : t.noSaved}
                  </p>
                  <p className="text-on-surface-variant text-sm max-w-[200px] mx-auto">
                    {search 
                      ? "Essayez d'autres mots-clés pour trouver votre invocation." 
                      : "Enregistrez vos invocations préférées pour les retrouver ici."}
                  </p>
                </div>
                {!search && (
                  <Link 
                    href="/" 
                    className="bg-primary text-on-primary px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:opacity-90 shadow-lg transition-all active:scale-95"
                  >
                    Découvrir des douas
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
