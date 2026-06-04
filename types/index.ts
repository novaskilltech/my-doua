export type HadithStatus = "Sahih" | "Hasan";

export interface Dua {
  id: string;
  arabic: string;
  transliteration?: string;
  translation: string;
  source: string;
  hadithStatus?: HadithStatus;
  recommendedMoment?: string;
  repetition?: string;
  categoryIds: string[];
}

export interface AIResponse {
  id: string;
  detectedNeed: string;
  categories: string[];
  duas: Dua[];
  createdAt: string;
}

export interface Category {
  id: string;
  label: Record<string, string>; // e.g. { ar: "...", fr: "...", en: "..." }
  icon: string;
}

export type Language = "ar" | "fr" | "en";

export type Theme = "default" | "emerald" | "amber" | "rose" | "slate";

export interface UserPreferences {
  language: Language;
  theme: Theme;
  showTransliteration: boolean;
  notificationsEnabled: boolean;
  notificationFrequency: "daily" | "weekly" | "none";
}

export interface SavedDua extends Dua {
  savedAt: string;
  isFavorite: boolean;
  userNote?: string;
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: string;
  resultId: string;
}
