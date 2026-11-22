import { DEFAULT_PORTFOLIO_DATA } from '../data/portfolioData';
import type { PortfolioData } from '../types/portfolio';

const DB_NAME = 'mahruf_portfolio_db';
const STORE_NAME = 'portfolio_store';
const DATA_KEY = 'portfolio_v1';
const LOCAL_FALLBACK_KEY = 'mahruf_portfolio_fallback_v1';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadPortfolioData(): Promise<PortfolioData> {
  try {
    const db = await openDB();
    const result = await new Promise<PortfolioData | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(DATA_KEY);
      req.onsuccess = () => resolve(req.result as PortfolioData | undefined);
      req.onerror = () => reject(req.error);
    });
    if (result && result.personal) {
      return result;
    }
  } catch {
    // Fallback to localStorage below
  }

  try {
    const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PortfolioData;
      if (parsed && parsed.personal) {
        return parsed;
      }
    }
  } catch {
    // Ignore parse errors
  }

  return DEFAULT_PORTFOLIO_DATA;
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, DATA_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    try {
      localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(data));
    } catch {
      // Storage quota exceeded on fallback
    }
  }
}

export async function resetPortfolioData(): Promise<PortfolioData> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(DATA_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore
  }
  try {
    localStorage.removeItem(LOCAL_FALLBACK_KEY);
  } catch {
    // Ignore
  }
  return DEFAULT_PORTFOLIO_DATA;
}

export function exportPortfolioJSON(data: PortfolioData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mahruf-portfolio-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
