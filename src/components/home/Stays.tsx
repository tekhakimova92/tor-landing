"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { ALL_REGIONS, CATEGORIES, PRICE_MAX, PRICE_MIN, STAYS, TYPE_FILTERS, type Stay } from "@/data/catalog";
import { fmt, plural } from "@/lib/format";
import { useStore, type Sort } from "@/components/StoreProvider";
import { Photo } from "@/components/ui/Photo";
import { StayCard } from "./StayCard";

const SORTS: { id: Sort; label: string }[] = [
  { id: "pop", label: "Популярные" },
  { id: "asc", label: "Сначала дешевле" },
  { id: "desc", label: "Сначала дороже" },
  { id: "rate", label: "По рейтингу" },
];

const PREVIEW_COUNT = 6;

const sorters: Record<Sort, (a: Stay, b: Stay) => number> = {
  pop: (a, b) => b.reviews - a.reviews,
  asc: (a, b) => a.price - b.price,
  desc: (a, b) => b.price - a.price,
  rate: (a, b) => b.rating - a.rating,
};

const pill =
  "flex h-12 cursor-pointer items-center gap-2 rounded-full border border-line bg-white/60 px-5 text-sm font-semibold text-forest transition-colors hover:bg-white";

export function Stays() {
  const s = useStore();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const list = STAYS.filter((p) => {
    if (s.region !== ALL_REGIONS && p.region !== s.region) return false;
    if (p.cap < s.guests) return false;
    if (p.price > s.maxPrice) return false;
    if (s.type !== "all" && p.type !== s.type) return false;
    if (s.cat === "issyk" && p.region !== "Иссык-Куль") return false;
    if ((s.cat === "mountain" || s.cat === "nature") && !p.tags.includes(s.cat)) return false;
    if (s.cat !== "all" && s.cat !== "issyk" && s.cat !== "mountain" && s.cat !== "nature" && p.type !== s.cat) return false;
    if (s.onlyFav && !s.favs.includes(p.id)) return false;
    return true;
  }).sort(sorters[s.sort]);

  const title = s.region !== ALL_REGIONS ? s.region : s.onlyFav ? "Избранное" : "Лучшее жильё";
  const info = `${list.length} ${plural(list.length, "вариант", "варианта", "вариантов")} на ${s.guests} ${plural(s.guests, "гостя", "гостей", "гостей")}`;

  return (
    <section id="stays" className="section pt-20 pb-6 md:pt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="eyebrow">Жильё</span>
          <h2 className="h-section mt-4">{title}</h2>
          <p className="mt-3 mb-0 text-[15px] text-moss">{info}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((o) => !o)} className={`${pill} ${filtersOpen ? "bg-white" : ""}`}>
            {filtersOpen ? <X size={17} /> : <SlidersHorizontal size={17} />} Фильтры
          </button>
          <label className="relative">
            <select
              aria-label="Сортировка"
              value={s.sort}
              onChange={(e) => s.update({ sort: e.target.value as Sort })}
              className={`${pill} appearance-none pr-11`}
            >
              {SORTS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
          </label>
        </div>
      </div>

      <div className="no-scrollbar -mx-[18px] mb-8 flex gap-2.5 overflow-x-auto px-[18px] pb-1 md:mx-0 md:px-0">
        {CATEGORIES.map((c) => {
          const on = s.cat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => s.update({ cat: c.id, onlyFav: false })}
              className={`flex h-12 flex-none cursor-pointer items-center gap-2.5 rounded-full border py-1 pr-5 pl-1 text-sm font-semibold transition-colors ${
                on ? "border-forest bg-forest text-cream" : "border-line bg-white/60 text-forest hover:bg-white"
              }`}
            >
              <span className="relative size-10 overflow-hidden rounded-full">
                <Photo bg={c.bg} src={c.image} alt="" sizes="40px" />
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      {filtersOpen && (
        <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 rounded-card border border-line bg-white/70 p-6">
          <label className="block">
            <div className="mb-3 text-sm font-semibold text-moss">
              Цена за ночь до <b className="text-forest">{fmt(s.maxPrice)} сом</b>
            </div>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={500}
              value={s.maxPrice}
              onChange={(e) => s.update({ maxPrice: +e.target.value })}
              className="w-full accent-teal"
            />
          </label>
          <div>
            <div className="mb-3 text-sm font-semibold text-moss">Тип жилья</div>
            <div className="flex flex-wrap gap-2">
              {TYPE_FILTERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={s.type === t.id}
                  onClick={() => s.update({ type: t.id })}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold ${
                    s.type === t.id ? "border-forest bg-forest text-cream" : "border-line text-forest hover:bg-sand"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <button type="button" onClick={s.resetFilters} className="cursor-pointer text-sm font-semibold underline">
              Сбросить всё
            </button>
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <div className="rounded-card border border-dashed border-sage px-6 py-16 text-center">
          <div className="font-display text-[32px] font-medium">Ничего не нашлось</div>
          <p className="mt-2 mb-5 text-moss">Измените даты, число гостей или фильтры.</p>
          <button type="button" onClick={s.resetFilters} className="cursor-pointer rounded-full bg-forest px-6 py-3 font-bold text-cream hover:bg-teal">
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {(showAll ? list : list.slice(0, PREVIEW_COUNT)).map((p) => (
            <StayCard key={p.id} stay={p} />
          ))}
        </div>
      )}

      {list.length > PREVIEW_COUNT && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShowAll((v) => !v)} className={`${pill} bg-white px-7`}>
            {showAll ? "Свернуть" : `Показать все ${list.length}`}
            <ChevronDown size={17} className={showAll ? "rotate-180" : ""} />
          </button>
        </div>
      )}
    </section>
  );
}
