'use client';

import { useParams, useRouter } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';
import { MOCK_DUAS } from '@/data/duas';
import { useTranslation } from '@/hooks/use-translation';
import { DuaResultCard } from '@/components/dua/DuaResultCard';
import { Dua, SavedDua } from '@/types';
import { useAppStore } from '@/store/app-store';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  const { language, t } = useTranslation();
  const { addSavedDua, savedDuas, setTopBarProps } = useAppStore();

  const category = CATEGORIES.find(c => c.id === categoryId);
  const filteredDuas = MOCK_DUAS.filter(d => d.categoryIds.includes(categoryId));

  useEffect(() => {
    if (category) {
      setTopBarProps({ 
        title: category.label[language] || category.label.fr,
        showBack: true,
        onBack: () => router.back()
      });
    }
  }, [category, language, router, setTopBarProps]);

  const handleSave = (dua: Dua) => {
    const savedDua: SavedDua = {
      ...dua,
      savedAt: new Date().toISOString(),
      isFavorite: false,
    };
    addSavedDua(savedDua);
  };

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-6">
        <h1 className="text-2xl font-headline text-primary mb-4">Catégorie non trouvée</h1>
        <p className="text-on-surface-variant">Désolé, cette catégorie n&apos;existe pas.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <main className="flex-1 pt-24 pb-32 px-6 max-w-2xl mx-auto w-full space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary-container/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name={category.icon} size={40} className="text-primary" />
          </div>
          <h1 className="font-headline text-4xl text-primary">
            {category.label[language] || category.label.fr}
          </h1>
          <p className="text-on-surface-variant max-w-md mx-auto">
            Invocations et dou&apos;as relatives à la catégorie {category.label.fr.toLowerCase()}.
          </p>
        </header>

        {/* Results */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
            <h2 className="font-manrope font-bold text-primary tracking-tight uppercase text-xs">
              {filteredDuas.length} {filteredDuas.length > 1 ? 'RÉSULTATS' : 'RÉSULTAT'}
            </h2>
          </div>

          <div className="space-y-8">
            {filteredDuas.length > 0 ? (
              filteredDuas.map((dua, index) => (
                <motion.div
                  key={dua.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DuaResultCard 
                    dua={dua} 
                    isSaved={savedDuas.some(d => d.id === dua.id)}
                    onSave={() => handleSave(dua)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="bg-surface-container-low rounded-2xl p-12 text-center border border-dashed border-outline-variant">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-4">
                  search_off
                </span>
                <p className="text-on-surface-variant italic">
                  Aucune invocation trouvée pour cette catégorie pour le moment.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
