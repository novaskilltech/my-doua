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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {CATEGORIES.map((category) => (
        <Link 
          key={category.id} 
          href={`/categories/${category.id}`}
          className="group cursor-pointer rounded-[2rem] p-6 bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container hover:shadow-xl hover:shadow-primary/5 transition-all active:scale-95 flex flex-col items-center text-center justify-between min-h-[160px]"
        >
          <div className="w-14 h-14 rounded-full bg-primary-container/10 text-primary flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Icon name={category.icon.toLowerCase()} />
          </div>
          <h3 className="font-headline text-base text-primary font-bold leading-snug">
            {category.label[language] || category.label.fr}
          </h3>
          <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-bold mt-2">
            Invocations
          </p>
        </Link>
      ))}
    </div>
  );
}

