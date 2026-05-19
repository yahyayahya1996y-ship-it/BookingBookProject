export const storageService = {
  getItem: <T,>(key: string, fallback?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback || null;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return fallback || null;
    }
  },

  setItem: <T,>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing ${key} to localStorage:`, error);
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },
};
