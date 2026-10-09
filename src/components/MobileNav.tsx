"use client";

import { useNavActions } from "./useNavActions";

export function MobileNav() {
  const nav = useNavActions();
  const tabs = [
    { label: "Поиск", go: nav.home, on: nav.isHome && !nav.onlyFav },
    { label: "Юрты", go: nav.yurts, on: false },
    { label: "Избранное", go: nav.favorites, on: nav.onlyFav },
    { label: "Впечатления", go: nav.experiences, on: false },
  ];

  return (
    <nav className="fixed right-3 bottom-[max(12px,env(safe-area-inset-bottom))] left-3 z-40 grid grid-cols-4 rounded-[26px] bg-cream/92 p-2 shadow-[0_10px_36px_rgba(31,58,46,.25)] backdrop-blur-lg md:hidden">
      {tabs.map((t) => (
        <button
          key={t.label}
          type="button"
          onClick={t.go}
          className={`flex min-h-12 cursor-pointer items-center justify-center rounded-[20px] text-[13px] font-bold ${
            t.on ? "bg-forest text-cream" : "text-forest"
          }`}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
