// Избранное хранится в localStorage и раздаётся компонентам через useSyncExternalStore.

const KEY = "tor:favs";
const EMPTY: number[] = [];
const listeners = new Set<() => void>();
let cache: number[] | null = null;

function read(): number[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((x) => typeof x === "number") : [];
  } catch {
    return [];
  }
}

export function subscribeFavs(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export const getFavs = () => (cache ??= read());
export const getServerFavs = () => EMPTY;

export function toggleFav(id: number) {
  const prev = getFavs();
  cache = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {}
  listeners.forEach((l) => l());
}
