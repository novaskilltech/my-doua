'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { Button, Card } from '@/components/ui/Base';
import { Language, Theme } from '@/types';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function SettingsPage() {
  const { t, language, isRTL } = useTranslation();
  const { preferences, setLanguage, setTheme, toggleTransliteration, clearData, setTopBarProps } = useAppStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setTopBarProps({ title: t.settings });
  }, [setTopBarProps, t.settings]);

  const languages: { id: Language; label: string; sub: string }[] = [
    { id: 'ar', label: 'العربية', sub: 'Arabe' },
    { id: 'fr', label: 'Français', sub: 'Français' },
    { id: 'en', label: 'English', sub: 'Anglais' },
  ];

  const themes: { id: Theme; label: string; color: string }[] = [
    { id: 'emerald', label: 'Teal Serene', color: 'bg-[#004643]' },
    { id: 'amber', label: 'Plum Warmth', color: 'bg-[#381932]' },
    { id: 'rose', label: 'Crimson Noir', color: 'bg-[#FB3640]' },
    { id: 'slate', label: 'Lime Charcoal', color: 'bg-[#89E900]' },
    { id: 'default', label: 'Indigo Frost', color: 'bg-[#27187E]' },
  ];

  const handleExport = () => {
    const data = JSON.stringify({
      version: '1.0',
      savedDuas: useAppStore.getState().savedDuas,
      preferences: useAppStore.getState().preferences,
    }, null, 2);
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mon-doua-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto w-full space-y-12">
        <header>
          <h1 className="font-headline text-4xl text-primary">{t.settings}</h1>
          <p className="text-on-surface-variant text-sm mt-2">Personnalisez votre expérience et gérez vos données.</p>
        </header>

        {/* Language Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">language</span>
            <h3 className="font-manrope font-bold text-primary tracking-widest uppercase text-xs">{t.language}</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={cn(
                  "flex items-center justify-between p-6 rounded-2xl border transition-all active:scale-[0.98]",
                  preferences.language === lang.id 
                    ? "bg-primary-container/10 border-primary shadow-sm" 
                    : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container"
                )}
              >
                <div className="text-left">
                  <p className={cn("text-lg font-bold", lang.id === 'ar' && "font-arabic text-2xl")}>{lang.label}</p>
                  <p className="text-xs text-on-surface-variant opacity-60">{lang.sub}</p>
                </div>
                {preferences.language === lang.id && (
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Theme Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">palette</span>
            <h3 className="font-manrope font-bold text-primary tracking-widest uppercase text-xs">{t.theme}</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className="flex flex-col items-center gap-3 shrink-0 group"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                  theme.color,
                  preferences.theme === theme.id ? "ring-4 ring-primary/20 scale-110 shadow-lg" : "scale-100 opacity-80 group-hover:opacity-100"
                )}>
                  {preferences.theme === theme.id && (
                    <span className="material-symbols-outlined text-white">check</span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider transition-colors",
                  preferences.theme === theme.id ? "text-primary" : "text-on-surface-variant"
                )}>
                  {theme.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Display Options */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">visibility</span>
            <h3 className="font-manrope font-bold text-primary tracking-widest uppercase text-xs">Affichage</h3>
          </div>
          <div 
            onClick={toggleTransliteration}
            className="flex items-center justify-between p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="space-y-1">
              <p className="font-bold text-on-surface">{t.transliteration}</p>
              <p className="text-xs text-on-surface-variant">Afficher la phonétique sous le texte arabe.</p>
            </div>
            <div className={cn(
              "w-14 h-8 rounded-full p-1 transition-colors duration-300",
              preferences.showTransliteration ? "bg-primary" : "bg-outline-variant"
            )}>
              <div className={cn(
                "w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300",
                preferences.showTransliteration ? (isRTL ? "-translate-x-6" : "translate-x-6") : "translate-x-0"
              )} />
            </div>
          </div>
        </section>
 
        {/* Subscription / Premium Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">workspace_premium</span>
            <h3 className="font-manrope font-bold text-primary tracking-widest uppercase text-xs">Mon Abonnement</h3>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-on-surface">Statut de l&apos;application</p>
                <p className="text-xs text-on-surface-variant">Activez l&apos;Assistant IA de recherche émotionnelle.</p>
              </div>
              <span className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                useAppStore((state) => state.isPremium) 
                  ? "bg-secondary-container text-on-secondary-container" 
                  : "bg-surface-container-high text-on-surface-variant/70"
              )}>
                {useAppStore((state) => state.isPremium) ? "Premium ✨" : "Version Gratuite"}
              </span>
            </div>
            
            {!useAppStore((state) => state.isPremium) ? (
              <div className="pt-2 flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Saisissez votre code d'activation..." 
                  onChange={(e) => {
                    const code = e.target.value.trim().toUpperCase();
                    if (code === 'MDA-MONTHLY-X799' || code === 'MDA-ANNUAL-Y1299') {
                      useAppStore.getState().setPremium(true);
                    }
                  }}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
                <p className="text-[10px] text-on-surface-variant/40 leading-relaxed">
                  Tip de test : saisissez le code mensuel <span className="font-bold">MDA-MONTHLY-X799</span> ou annuel <span className="font-bold">MDA-ANNUAL-Y1299</span> pour activer le statut premium.
                </p>
              </div>
            ) : (
              <div className="pt-2 text-center">
                <button 
                  onClick={() => useAppStore.getState().setPremium(false)}
                  className="text-xs font-bold text-error hover:underline"
                >
                  Désactiver le statut Premium (retour test)
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Data Management */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">database</span>
            <h3 className="font-manrope font-bold text-primary tracking-widest uppercase text-xs">Gestion des données</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-secondary">download</span>
              <div className="text-left">
                <p className="font-bold text-on-surface">{t.export}</p>
                <p className="text-xs text-on-surface-variant">Sauvegarder vos douas dans un fichier JSON.</p>
              </div>
            </button>
            
            <button 
              className="flex items-center gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-secondary">upload</span>
              <div className="text-left">
                <p className="font-bold text-on-surface">{t.import}</p>
                <p className="text-xs text-on-surface-variant">Restaurer vos données depuis un fichier.</p>
              </div>
            </button>

            <button 
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-4 p-6 rounded-2xl bg-error-container/10 border border-error/20 hover:bg-error-container/20 transition-all active:scale-[0.98] group"
            >
              <span className="material-symbols-outlined text-error">delete_forever</span>
              <div className="text-left">
                <p className="font-bold text-error">{t.clearAll}</p>
                <p className="text-xs text-error/60">Supprimer définitivement toutes vos données.</p>
              </div>
            </button>
          </div>
        </section>

        {/* Confirmation Dialog (Simple Overlay) */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-surface rounded-[2rem] p-8 max-w-sm w-full space-y-6 shadow-2xl"
              >
                <div className="w-16 h-16 bg-error-container/20 text-error rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">warning</span>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-headline text-2xl text-primary">Êtes-vous sûr ?</h3>
                  <p className="text-on-surface-variant text-sm">
                    Cette action supprimera toutes vos douas enregistrées et vos préférences. Cette opération est irréversible.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button variant="danger" className="w-full rounded-full" onClick={() => {
                    clearData();
                    setShowClearConfirm(false);
                  }}>
                    Tout supprimer
                  </Button>
                  <Button variant="tonal" className="w-full rounded-full" onClick={() => setShowClearConfirm(false)}>
                    Annuler
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
