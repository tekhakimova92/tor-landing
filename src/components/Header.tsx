"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavActions } from "./useNavActions";

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const pastHero = () => window.scrollY > 560;

export function Logo({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass flex h-12 cursor-pointer items-center gap-2 rounded-full pr-5 pl-1.5 font-display text-xl font-semibold tracking-[.06em] text-forest ${className}`}
    >
      <span className="grid size-9 place-items-center rounded-full bg-forest text-[13px] tracking-normal text-gold">T</span>
      TÖR
    </button>
  );
}

// Плавающая стеклянная шапка. На главной её роль до прокрутки выполняет верхняя панель героя.
export function Header() {
  const nav = useNavActions();
  const scrolled = useSyncExternalStore(subscribeScroll, pastHero, () => false);
  const visible = !nav.isHome || scrolled;

  const items = [
    { label: "Направления", go: nav.regions },
    { label: "Жильё", go: nav.stays },
    { label: "Юрты", go: nav.yurts },
    { label: "Впечатления", go: nav.experiences },
    { label: "Избранное" + (nav.favCount ? ` · ${nav.favCount}` : ""), go: nav.favorites },
  ];

  return (
    <header
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed top-0 right-0 left-0 z-30 flex items-center justify-between gap-4 px-[18px] pt-[max(12px,env(safe-area-inset-top))] transition-all duration-500 ease-soft md:px-7 lg:px-12 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"
      }`}
    >
      <Logo onClick={nav.home} />

      <nav className="glass hidden h-12 items-center gap-1 rounded-full px-1.5 xl:flex">
        {items.map((n) => (
          <button
            key={n.label}
            type="button"
            onClick={n.go}
            className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-forest transition-colors hover:bg-white/70"
          >
            {n.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button type="button" className="glass hidden h-12 cursor-pointer rounded-full px-5 text-sm font-semibold text-forest hover:bg-white/80 md:block">
          Войти
        </button>
        <button
          type="button"
          className="flex h-12 cursor-pointer items-center gap-2 rounded-full bg-forest pr-1.5 pl-5 text-sm font-bold whitespace-nowrap text-cream shadow-glass hover:bg-teal"
        >
          <span className="hidden sm:inline">Разместить жильё</span>
          <span className="sm:hidden">Войти</span>
          <span className="grid size-9 place-items-center rounded-full bg-cream/15">
            <ArrowUpRight size={18} />
          </span>
        </button>
      </div>
    </header>
  );
}
