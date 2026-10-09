"use client";

import { CATEGORIES } from "@/data/catalog";
import { useStore } from "@/components/StoreProvider";
import { Photo } from "@/components/ui/Photo";

export function Categories() {
  const { cat, update } = useStore();
  return (
    <section className="section pt-11 pb-2">
      <div className="no-scrollbar flex gap-3.5 overflow-x-auto pt-1 pb-3">
        {CATEGORIES.map((c) => {
          const on = cat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => update({ cat: c.id, onlyFav: false })}
              className="flex w-[120px] flex-none cursor-pointer flex-col gap-2.5 transition-transform duration-[250ms] hover:-translate-y-1 md:w-[150px]"
            >
              <div
                className={`relative h-[120px] overflow-hidden rounded-[22px] outline-offset-3 md:h-[150px] ${on ? "outline-2 outline-teal" : ""}`}
              >
                <Photo bg={c.bg} src={c.image} alt={c.label} sizes="150px" />
              </div>
              <span className={`text-center text-sm text-forest ${on ? "font-bold" : "font-medium"}`}>{c.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
