'use client';

import { useAppStore } from '../store/app-store';
import { translations } from '../lib/i18n';

export function useTranslation() {
  const language = useAppStore((state) => state.preferences.language);
  const t = translations[language] || translations.fr;
  
  return { t, language, isRTL: t.rtl };
}
