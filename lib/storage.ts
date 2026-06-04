import { openDB, IDBPDatabase } from 'idb';
import { SavedDua, SearchHistory, UserPreferences } from '../types';

const DB_NAME = 'mon-doua-adequat';
const DB_VERSION = 1;

export interface AppDatabase {
  savedDuas: SavedDua;
  history: SearchHistory;
  preferences: { key: string; value: any };
}

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('savedDuas')) {
        db.createObjectStore('savedDuas', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('history')) {
        db.createObjectStore('history', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('preferences')) {
        db.createObjectStore('preferences', { keyPath: 'key' });
      }
    },
  });
};

export const storage = {
  async saveDua(dua: SavedDua) {
    const db = await initDB();
    await db.put('savedDuas', dua);
  },
  async getSavedDuas(): Promise<SavedDua[]> {
    const db = await initDB();
    return db.getAll('savedDuas');
  },
  async deleteDua(id: string) {
    const db = await initDB();
    await db.delete('savedDuas', id);
  },
  async saveHistory(item: SearchHistory) {
    const db = await initDB();
    await db.put('history', item);
  },
  async getHistory(): Promise<SearchHistory[]> {
    const db = await initDB();
    return db.getAll('history');
  },
  async setPreference(key: string, value: any) {
    const db = await initDB();
    await db.put('preferences', { key, value });
  },
  async getPreference(key: string) {
    const db = await initDB();
    const result = await db.get('preferences', key);
    return result?.value;
  },
  async clearAll() {
    const db = await initDB();
    await db.clear('savedDuas');
    await db.clear('history');
    await db.clear('preferences');
  }
};
