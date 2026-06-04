'use client';

import { useParams, useRouter } from 'next/navigation';
import { TopBar } from '@/components/layout/TopBar';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { DuaResultCard } from '@/components/dua/DuaResultCard';
import { Button } from '@/components/ui/Base';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function DuaDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t, isRTL } = useTranslation();
  const { savedDuas, removeSavedDua } = useAppStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const dua = savedDuas.find(d => d.id === id);

  if (!dua) {
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <TopBar showBack onBack={() => router.back()} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
          <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-2">
            <AlertTriangle size={40} className="text-outline" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-bold text-primary">Dua non trouvé</h2>
            <p className="text-on-surface-variant max-w-xs mx-auto">
              Cette invocation n&apos;existe plus ou a été supprimée de vos favoris.
            </p>
          </div>
          <Button 
            variant="tonal" 
            className="px-8"
            onClick={() => router.push('/my-duas')}
          >
            {t.back}
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    removeSavedDua(dua.id);
    router.push('/my-duas');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopBar title={t.results} showBack onBack={() => router.back()} />
      
      <main className="flex-1 pt-24 pb-32 px-6 max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <DuaResultCard dua={dua} isSaved />
          
          <div className="pt-12 border-t border-outline-variant">
            <div className="bg-error-container/10 p-6 rounded-3xl border border-error/10 space-y-4">
              <div className="flex items-center gap-3 text-error">
                <AlertTriangle size={20} />
                <h3 className="font-bold">Zone de danger</h3>
              </div>
              <p className="text-sm text-on-surface-variant">
                La suppression de cette invocation est irréversible. Elle ne sera plus accessible dans votre liste personnelle.
              </p>
              <Button 
                variant="danger" 
                className="w-full py-4 rounded-2xl shadow-lg shadow-error/10" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 size={18} className={isRTL ? "ml-2" : "mr-2"} />
                {t.delete}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-surface w-full max-w-sm rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="p-2 hover:bg-surface-container rounded-full transition-colors"
                >
                  <X size={20} className="text-outline" />
                </button>
              </div>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center text-error">
                  <Trash2 size={32} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-headline font-bold text-primary">Supprimer ce Doua ?</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed px-4">
                    Êtes-vous sûr de vouloir supprimer cette invocation de vos favoris ?
                  </p>
                </div>

                <div className="flex flex-col w-full gap-3 pt-2">
                  <Button 
                    variant="danger" 
                    className="w-full py-4 rounded-2xl"
                    onClick={handleDelete}
                  >
                    Confirmer la suppression
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full py-4 rounded-2xl text-outline"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
