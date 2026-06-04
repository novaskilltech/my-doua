import { create } from 'zustand';
import { Language, Theme, UserPreferences, SavedDua } from '@/types';
import { storage } from '@/lib/storage';

interface AppState {
  preferences: UserPreferences;
  savedDuas: SavedDua[];
  isInitialized: boolean;
  isDrawerOpen: boolean;
  isPremium: boolean;
  isPaywallOpen: boolean;
  topBarProps: {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
  };
  
  // Actions
  init: () => Promise<void>;
  toggleDrawer: () => void;
  setTopBarProps: (props: { title?: string; showBack?: boolean; onBack?: () => void }) => void;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTransliteration: () => void;
  toggleNotifications: () => void;
  addSavedDua: (dua: SavedDua) => void;
  removeSavedDua: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clearData: () => Promise<void>;
  setPaywallOpen: (open: boolean) => void;
  setPremium: (premium: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  preferences: {
    language: 'fr',
    theme: 'emerald',
    showTransliteration: true,
    notificationsEnabled: false,
    notificationFrequency: 'none',
  },
  savedDuas: [],
  isInitialized: false,
  isDrawerOpen: false,
  isPremium: false,
  isPaywallOpen: false,
  topBarProps: {},
  
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setTopBarProps: (props) => set({ topBarProps: props }),
  setPaywallOpen: (open) => set({ isPaywallOpen: open }),
  setPremium: (premium) => {
    set({ isPremium: premium });
    storage.setPreference('isPremium', premium);
  },

  init: async () => {
    if (typeof window === 'undefined') return;
    
    const lang = await storage.getPreference('language') || 'fr';
    const theme = await storage.getPreference('theme') || 'emerald';
    const showTrans = await storage.getPreference('showTransliteration') ?? true;
    const isPrem = await storage.getPreference('isPremium') ?? false;
    const saved = await storage.getSavedDuas();
    
    set({
      preferences: {
        ...get().preferences,
        language: lang as Language,
        theme: theme as Theme,
        showTransliteration: showTrans as boolean,
      },
      savedDuas: saved,
      isPremium: isPrem as boolean,
      isInitialized: true,
    });
  },

  setLanguage: (language) => {
    set((state) => ({ preferences: { ...state.preferences, language } }));
    storage.setPreference('language', language);
  },

  setTheme: (theme) => {
    set((state) => ({ preferences: { ...state.preferences, theme } }));
    storage.setPreference('theme', theme);
  },

  toggleTransliteration: () => {
    const newValue = !get().preferences.showTransliteration;
    set((state) => ({ preferences: { ...state.preferences, showTransliteration: newValue } }));
    storage.setPreference('showTransliteration', newValue);
  },

  toggleNotifications: () => {
    const newValue = !get().preferences.notificationsEnabled;
    set((state) => ({ preferences: { ...state.preferences, notificationsEnabled: newValue } }));
    storage.setPreference('notificationsEnabled', newValue);
  },

  addSavedDua: (dua) => {
    set((state) => ({ savedDuas: [...state.savedDuas, dua] }));
    storage.saveDua(dua);
  },

  removeSavedDua: (id) => {
    set((state) => ({ savedDuas: state.savedDuas.filter(d => d.id !== id) }));
    storage.deleteDua(id);
  },

  toggleFavorite: (id) => {
    set((state) => ({
      savedDuas: state.savedDuas.map(d => 
        d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
      )
    }));
    const updated = get().savedDuas.find(d => d.id === id);
    if (updated) storage.saveDua(updated);
  },

  clearData: async () => {
    await storage.clearAll();
    set({
      savedDuas: [],
      preferences: {
        language: 'fr',
        theme: 'emerald',
        showTransliteration: true,
        notificationsEnabled: false,
        notificationFrequency: 'none',
      }
    });
  }
}));
