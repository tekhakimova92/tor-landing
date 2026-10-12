"use client";

import { Heart, Search, Sparkles, Tent } from "lucide-react";
import { useNavActions } from "./useNavActions";

export function MobileNav() {
  const nav = useNavActions();
  const tabs = [
    { label: "Поиск", icon: Search, go: nav.home, on: nav.isHome && !nav.onlyFav },
    { label: "Юрты", icon: Tent, go: nav.yurts, on: false },
    { label: "Избранное", icon: Heart, go: nav.favorites, on: nav.onlyFav, badge: nav.favCount },
    { label: "Впечатления", icon: Sparkles, go: nav.experiences, on: false },
  ];

  return (
    <nav className="glass fixed right-3 bottom-[max(12px,env(safe-area-inset-bottom))] left-3 z-40 grid grid-cols-4 gap-1 rounded-full p-1.5 md:hidden">
      {tabs.map((t) => (
        <button
          key={t.label}
          type="button"
          onClick={t.go}
          className={`relative flex h-14 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-bold transition-colors ${
            t.on ? "bg-forest text-cream" : "text-forest"
          }`}
        >
          <t.icon size={19} strokeWidth={1.9} />
          {t.label}
          {!!t.badge && (
            <span className="absolute top-1.5 right-[calc(50%-20px)] grid min-w-4 place-items-center rounded-full bg-rose px-1 text-[9px] leading-4 text-white">{t.badge}</span>
          )}
        </button>
      ))}
    </nav>
  );
}
