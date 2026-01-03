const DB_NAME = "clickone_dashboard_cache";
const DB_VERSION = 1;
const STORE_NAME = "analytics_cache";
const MAX_CACHE_AGE = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_VERSION = "v1";

interface CacheEntry<T> {
  key: string;
  data: T;
  timestamp: number;
  version: string;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
  });
};

export const cacheUtils = {
  set: async <T>(key: string, data: T): Promise<void> => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      
      const entry: CacheEntry<T> = {
        key,
        data,
        timestamp: Date.now(),
        version: CACHE_VERSION,
      };
      
      store.put(entry);
      
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) {
      console.warn("Cache write failed:", e);
    }
  },

  get: async <T>(key: string): Promise<T | null> => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      
      return new Promise((resolve) => {
        const request = store.get(key);
        
        request.onsuccess = () => {
          const entry = request.result as CacheEntry<T> | undefined;
          
          if (!entry) {
            resolve(null);
            return;
          }
          
          // Check version and age
          if (entry.version !== CACHE_VERSION) {
            resolve(null);
            return;
          }
          
          if (Date.now() - entry.timestamp > MAX_CACHE_AGE) {
            // Cache expired, delete it
            cacheUtils.delete(key);
            resolve(null);
            return;
          }
          
          resolve(entry.data);
        };
        
        request.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  },

  getTimestamp: async (key: string): Promise<number | null> => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      
      return new Promise((resolve) => {
        const request = store.get(key);
        
        request.onsuccess = () => {
          const entry = request.result as CacheEntry<unknown> | undefined;
          resolve(entry?.timestamp || null);
        };
        
        request.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  },

  delete: async (key: string): Promise<void> => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(key);
    } catch (e) {
      console.warn("Cache delete failed:", e);
    }
  },

  clearAll: async (): Promise<void> => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).clear();
    } catch (e) {
      console.warn("Cache clear failed:", e);
    }
  },

  createKey: (prefix: string, filters: { startDate: Date; endDate: Date }): string => {
    return `${prefix}_${filters.startDate.toISOString()}_${filters.endDate.toISOString()}`;
  },
};
