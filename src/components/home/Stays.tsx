"use client";

import { useState } from "react";
import { ALL_REGIONS, PRICE_MAX, PRICE_MIN, STAYS, TYPE_FILTERS, type Stay } from "@/data/catalog";
import { fmt, plural } from "@/lib/format";
import { useStore, type Sort } from "@/components/StoreProvider";
import { StayCard } from "./StayCard";

const SORTS: { id: Sort; label: string }[] = [
  { id: "pop", label: "Популярные" },
  { id: "asc", label: "Сначала дешевле" },
  { id: "desc", label: "Сначала дороже" },
  { id: "rate", label: "По рейтингу" },
];

const sorters: Record<Sort, (a: Stay, b: Stay) => number> = {
  pop: (a, b) => b.reviews - a.reviews,
  asc: (a, b) => a.price - b.price,
  desc: (a, b) => b.price - a.price,
  rate: (a, b) => b.rating - a.rating,
};

const pill = "cursor-pointer rounded-full border border-sage px-5 py-[11px] text-sm font-semibold text-forest hover:bg-sand";

export function Stays() {
  const s = useStore();
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    <section id="stays" className="section pt-12 pb-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="m-0 font-serif text-[34px] leading-[1.05] font-normal md:text-[52px]">{title}</h2>
          <p className="mt-2 mb-0 text-[15px] text-moss">{info}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((o) => !o)} className={`${pill} ${filtersOpen ? "bg-sand" : ""}`}>
            Фильтры
          </button>
          <select aria-label="Сортировка" value={s.sort} onChange={(e) => s.update({ sort: e.target.value as Sort })} className={`${pill} bg-transparent px-4`}>
            {SORTS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtersOpen && (
        <div className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 rounded-3xl bg-sand-deep px-6 py-[22px]">
          <label className="block">
            <div className="field-label mb-2.5 text-xs">Цена за ночь до {fmt(s.maxPrice)} сом</div>
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
            <div className="field-label mb-2.5 text-xs">Тип жилья</div>
            <div className="flex flex-wrap gap-2">
              {TYPE_FILTERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={s.type === t.id}
                  onClick={() => s.update({ type: t.id })}
                  className={`cursor-pointer rounded-full border border-sage px-3.5 py-2 text-[13px] font-semibold ${
                    s.type === t.id ? "bg-forest text-cream" : "text-forest"
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
        <div className="rounded-[28px] border border-dashed border-sage px-6 py-16 text-center">
          <div className="font-serif text-[30px]">Ничего не нашлось</div>
          <p className="mt-2 mb-5 text-moss">Измените даты, число гостей или фильтры.</p>
          <button type="button" onClick={s.resetFilters} className="cursor-pointer rounded-full bg-forest px-6 py-3 font-bold text-cream hover:bg-teal">
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:gap-x-6 md:gap-y-8">
          {list.map((p) => (
            <StayCard key={p.id} stay={p} />
          ))}
        </div>
      )}
    </section>
  );
}
