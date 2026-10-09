"use client";

import { useNavActions } from "./useNavActions";

export function Header() {
  const nav = useNavActions();
  const items = [
    { label: "Направления", go: nav.regions },
    { label: "Жильё", go: nav.stays },
    { label: "Юрты", go: nav.yurts },
    { label: "Впечатления", go: nav.experiences },
    { label: "Избранное" + (nav.favCount ? ` (${nav.favCount})` : ""), go: nav.favorites },
  ];

  return (
    <header
      className={`top-0 right-0 left-0 z-30 flex items-center justify-between gap-4 px-[18px] py-[18px] md:px-7 lg:px-12 ${
        nav.isHome ? "absolute" : "fixed border-b border-sand bg-cream/92 backdrop-blur-md"
      }`}
    >
      <button
        type="button"
        onClick={nav.home}
        className={`cursor-pointer font-serif text-[32px] tracking-[.04em] ${nav.isHome ? "text-cream" : "text-forest"}`}
      >
        TÖR
      </button>

      <nav className="hidden gap-1.5 rounded-full bg-cream/78 p-1.5 shadow-[0_6px_24px_rgba(31,58,46,.12)] backdrop-blur-md xl:flex">
        {items.map((n) => (
          <button
            key={n.label}
            type="button"
            onClick={n.go}
            className="cursor-pointer rounded-full px-[18px] py-2.5 text-sm font-semibold whitespace-nowrap text-forest hover:bg-sand"
          >
            {n.label}
          </button>
        ))}
      </nav>

      <div className="hidden items-center gap-2.5 xl:flex">
        <button type="button" className="cursor-pointer rounded-full bg-cream/78 px-5 py-[11px] text-sm font-semibold text-forest backdrop-blur-md hover:bg-white">
          Войти
        </button>
        <button type="button" className="cursor-pointer rounded-full bg-forest px-5 py-[11px] text-sm font-bold whitespace-nowrap text-cream hover:bg-teal">
          Разместить жильё
        </button>
      </div>

      <button type="button" className="cursor-pointer rounded-full bg-forest px-4 py-[9px] text-[13px] font-bold text-cream xl:hidden">
        Войти
      </button>
    </header>
  );
}
