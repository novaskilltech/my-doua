'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { aiService } from '@/features/ai/ai-service';
import { AIResponse, SavedDua } from '@/types';
import { DuaResultCard } from '@/components/dua/DuaResultCard';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/Base';
import { Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function ResultContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const router = useRouter();
  const { t } = useTranslation();
  const { addSavedDua, savedDuas, setTopBarProps } = useAppStore();
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTopBarProps({ 
      title: t.results,
      showBack: true,
      onBack: () => router.back()
    });
  }, [setTopBarProps, t.results, router]);

  useEffect(() => {
    if (!query) {
      router.push('/');
      return;
    }

    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await aiService.analyzeNeed(query);
        setResult(res);
      } catch (err) {
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [query, router, t.error]);

  const handleSave = (dua: any) => {
    const savedDua: SavedDua = {
      ...dua,
      savedAt: new Date().toISOString(),
      isFavorite: false,
    };
    addSavedDua(savedDua);
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto w-full">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 space-y-8"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full" 
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
              >
                <Sparkles size={32} />
              </motion.div>
            </div>
            <div className="space-y-3 text-center">
              <h3 className="text-xl font-headline font-bold text-primary">Analyse de votre besoin...</h3>
              <p className="text-on-surface-variant max-w-xs mx-auto text-sm leading-relaxed">
                Notre assistant IA recherche les invocations les plus adaptées à votre situation.
              </p>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 space-y-6 text-center"
          >
            <div className="w-20 h-20 bg-error-container rounded-full flex items-center justify-center text-error">
              <AlertCircle size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-bold text-primary">Oups ! Une erreur est survenue</h3>
              <p className="text-on-surface-variant max-w-xs mx-auto">
                {error}
              </p>
            </div>
            <Button variant="tonal" onClick={() => router.push('/')} className="px-8">
              Réessayer
            </Button>
          </motion.div>
        ) : result ? (
          <motion.div 
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <section className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-[0.2em] uppercase">
                  <Sparkles size={12} className="mr-2" />
                  {t.results}
                </span>
              </motion.div>
              
              <div className="space-y-4">
                <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-tight">
                  L&apos;invocation qui vous correspond
                </h2>
                <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/50">
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Selon votre état actuel : <span className="italic font-medium text-primary">&quot;{result.detectedNeed}&quot;</span>
                  </p>
                </div>
              </div>
            </section>
            
            <div className="space-y-10">
              {result.duas.map((dua, index) => {
                const isSaved = savedDuas.some(d => d.id === dua.id);
                return (
                  <motion.div
                    key={dua.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <DuaResultCard 
                      dua={dua} 
                      isSaved={isSaved}
                      onSave={() => handleSave(dua)}
                    />
                  </motion.div>
                );
              })}
            </div>

            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-primary text-on-primary p-8 rounded-[32px] relative overflow-hidden group shadow-xl shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-secondary-container text-2xl">auto_awesome</span>
                  <h3 className="font-headline font-bold text-xl">Pourquoi cette Doua ?</h3>
                </div>
                <p className="text-on-primary-container/90 text-sm leading-relaxed mb-6">
                  Cette invocation a été sélectionnée car elle répond précisément aux thématiques de <span className="font-bold text-secondary-container">{result.categories.join(', ')}</span> identifiées dans votre message.
                </p>
                <Button 
                  variant="tonal" 
                  className="bg-white/10 hover:bg-white/20 text-white border-none w-full py-4 rounded-2xl"
                  onClick={() => router.push('/')}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Nouvelle recherche
                </Button>
              </div>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ResultPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Suspense fallback={
        <div className="pt-32 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-on-surface-variant text-sm">Chargement...</p>
        </div>
      }>
        <ResultContent />
      </Suspense>
    </div>
  );
}
