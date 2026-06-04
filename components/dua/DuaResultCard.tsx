'use client';

import { Dua } from '@/types';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { Button } from '../ui/Base';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DuaResultCardProps {
  dua: Dua;
  isSaved?: boolean;
  onSave?: () => void;
}

export function DuaResultCard({ dua, isSaved, onSave }: DuaResultCardProps) {
  const { t } = useTranslation();
  const { preferences, toggleFavorite, savedDuas } = useAppStore();
  const [copied, setCopied] = useState(false);

  const isFavorite = savedDuas.find(d => d.id === dua.id)?.isFavorite || false;

  const handleCopy = () => {
    const text = `${dua.arabic}\n\n${dua.translation}\n\nSource: ${dua.source}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.appName,
          text: `${dua.arabic}\n\n${dua.translation}\n\nSource: ${dua.source}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <article className="relative overflow-hidden bg-surface-container-lowest/65 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-outline-variant/15">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl"></div>
      
      {isSaved && (
        <Link 
          href={`/my-duas/${dua.id}`}
          className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary flex items-center justify-center text-primary transition-all active:scale-95 shadow-sm"
          title="Gérer l'invocation"
        >
          <span className="material-symbols-outlined text-lg">settings</span>
        </Link>
      )}

      <div className="relative p-8 md:p-12">
        {/* Arabic Text Section */}
        <div className="mb-10 text-right">
          <p className="arabic-text text-3xl md:text-4xl text-primary font-bold leading-loose">
            {dua.arabic}
          </p>
        </div>

        {/* Phonetics Section */}
        {preferences.showTransliteration && dua.transliteration && (
          <div className="mb-8 border-l-2 border-secondary-container pl-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-2 block">
              {t.transliteration}
            </span>
            <p className="text-lg italic text-on-surface-variant leading-relaxed">
              {dua.transliteration}
            </p>
          </div>
        )}

        {/* Translation Section */}
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-2 block">
            {t.results}
          </span>
          <p className="text-xl font-headline text-on-surface leading-relaxed">
            {dua.translation}
          </p>
        </div>

        {/* Source Tag */}
        <div className="flex items-center gap-2 mb-12 py-2 px-4 rounded-lg bg-surface-container-low w-fit">
          <span className="material-symbols-outlined text-sm text-secondary">menu_book</span>
          <span className="text-xs font-bold text-on-surface-variant">
            {t.source}: {dua.source} {dua.hadithStatus && `(${dua.hadithStatus})`}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 border-t border-outline-variant/10 pt-8">
          <button 
            onClick={() => isSaved ? toggleFavorite(dua.id) : onSave?.()}
            className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl hover:bg-surface-container-low transition-all active:scale-95 group"
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
              isFavorite ? "bg-primary text-on-primary" : "bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary"
            )}>
              <span 
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              {isFavorite ? t.favorite : t.save}
            </span>
          </button>

          <button 
            onClick={handleShare}
            className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl hover:bg-surface-container-low transition-all active:scale-95 group"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined">share</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              {t.share}
            </span>
          </button>

          <button 
            onClick={handleCopy}
            className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl hover:bg-surface-container-low transition-all active:scale-95 group"
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
              copied ? "bg-green-100 text-green-600" : "bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary"
            )}>
              <span className="material-symbols-outlined">
                {copied ? 'check' : 'content_copy'}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              {copied ? t.copied : t.copy}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
