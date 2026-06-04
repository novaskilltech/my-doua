'use client';

import { CATEGORIES } from '@/data/categories';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function CategoryGrid() {
  const { language } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Featured: Citadelle du Musulman (Mocked as first item) */}
      <Link 
        href={`/categories/${CATEGORIES[0].id}`}
        className="md:col-span-8 group cursor-pointer overflow-hidden rounded-[2rem] bg-primary text-on-primary relative p-8 flex flex-col justify-end min-h-[300px] transition-transform active:scale-95 duration-200"
      >
        <div className="absolute inset-0 opacity-40">
          <Image 
            alt="Quran" 
            className="w-full h-full object-cover" 
            src="https://picsum.photos/seed/quran/800/400" 
            fill
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
        <div className="relative z-10">
          <span className="material-symbols-outlined text-secondary-container mb-4 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            menu_book
          </span>
          <h3 className="font-headline text-3xl mb-2">Citadelle du Musulman</h3>
          <p className="text-on-primary/70 text-sm max-w-sm">Le recueil complet des invocations authentiques issues du Coran et de la Sunnah.</p>
        </div>
      </Link>

      {CATEGORIES.slice(1).map((category, index) => {
        // Varying styles for bento effect
        const isSmall = index % 3 === 0;
        
        return (
          <Link 
            key={category.id} 
            href={`/categories/${category.id}`}
            className={cn(
              "group cursor-pointer rounded-[2rem] p-8 flex flex-col transition-all active:scale-95",
              isSmall 
                ? "md:col-span-4 bg-surface-container-high items-center justify-center text-center hover:bg-surface-container-highest" 
                : "md:col-span-4 bg-surface-container-low border border-outline-variant/10 hover:shadow-xl hover:shadow-primary/5"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-6",
              isSmall ? "bg-secondary-container text-secondary" : "bg-primary-container/10 text-primary"
            )}>
              <Icon name={category.icon.toLowerCase()} />
            </div>
            <h3 className="font-headline text-xl text-primary mb-2">
              {category.label[language] || category.label.fr}
            </h3>
            <p className="text-on-surface-variant text-xs">
              {category.id === 'protection' ? 'Protections quotidiennes' : 'Invocations thématiques'}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
