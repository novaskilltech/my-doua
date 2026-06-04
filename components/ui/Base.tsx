'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'tonal';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-on-primary border-b-4 border-black/35 hover:brightness-105 active:border-b-0 active:translate-y-1 shadow-lg',
    secondary: 'bg-secondary text-on-secondary border-b-4 border-black/35 hover:brightness-105 active:border-b-0 active:translate-y-1 shadow-md',
    tonal: 'bg-secondary-container text-on-secondary-container border-b-4 border-black/15 hover:brightness-105 active:border-b-0 active:translate-y-1',
    ghost: 'bg-transparent text-on-surface hover:bg-surface-container-low active:translate-y-[2px]',
    outline: 'bg-transparent border-2 border-outline border-b-4 hover:bg-surface-container-low active:border-b-2 active:translate-y-[2px]',
    danger: 'bg-red-600 text-white border-b-4 border-red-800 hover:brightness-105 active:border-b-0 active:translate-y-1 shadow-lg',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs font-bold uppercase tracking-wider',
    md: 'px-6 py-3 text-sm font-bold uppercase tracking-wider',
    lg: 'px-8 py-4 text-base font-bold uppercase tracking-wider',
    icon: 'p-3 rounded-2xl',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('bg-surface-container-low/60 backdrop-blur-xl border border-outline-variant/15 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-hidden', className)}>
      {children}
    </div>
  );
}
