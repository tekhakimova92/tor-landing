"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ALL_REGIONS, PRICE_MAX, type CategoryId, type StayType } from "@/data/catalog";
import { isoDate } from "@/lib/format";
import { getFavs, getServerFavs, subscribeFavs, toggleFav } from "@/lib/favorites";

export type Sort = "pop" | "asc" | "desc" | "rate";

type Search = {
  region: string;
  from: string;
  to: string;
  guests: number;
  cat: CategoryId;
  type: StayType | "all";
  maxPrice: number;
  sort: Sort;
  onlyFav: boolean;
};

const initialSearch: Search = {
  region: ALL_REGIONS,
  from: "",
  to: "",
  guests: 2,
  cat: "all",
  type: "all",
  maxPrice: PRICE_MAX,
  sort: "pop",
  onlyFav: false,
};

type Store = Search & {
  favs: number[];
  update: (patch: Partial<Search>) => void;
  resetFilters: () => void;
  toggleFav: (id: number) => void;
  goTo: (sectionId: string) => void;
};

const StoreContext = createContext<Store | null>(null);

const noSubscribe = () => () => {};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState<Search>(initialSearch);
  const favs = useSyncExternalStore(subscribeFavs, getFavs, getServerFavs);
  // Даты по умолчанию зависят от «сегодня» у посетителя, поэтому на сервере они пустые.
  const defaultFrom = useSyncExternalStore(noSubscribe, () => isoDate(14), () => "");
  const defaultTo = useSyncExternalStore(noSubscribe, () => isoDate(17), () => "");
  const router = useRouter();
  const pathname = usePathname();

  const update = useCallback((patch: Partial<Search>) => setSearch((s) => ({ ...s, ...patch })), []);

  const resetFilters = useCallback(
    () => setSearch((s) => ({ ...initialSearch, from: s.from, to: s.to, sort: s.sort })),
    [],
  );

  const goTo = useCallback(
    (sectionId: string) => {
      const scroll = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      if (pathname === "/") return scroll();
      router.push("/#" + sectionId);
      setTimeout(scroll, 120);
    },
    [pathname, router],
  );

  const value = useMemo(
    () => ({
      ...search,
      from: search.from || defaultFrom,
      to: search.to || defaultTo,
      favs,
      update,
      resetFilters,
      toggleFav,
      goTo,
    }),
    [search, defaultFrom, defaultTo, favs, update, resetFilters, goTo],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
