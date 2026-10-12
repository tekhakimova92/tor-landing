"use client";

import { ArrowUpRight } from "lucide-react";
import { REGIONS, STAYS } from "@/data/catalog";
import { plural } from "@/lib/format";
import { useStore } from "@/components/StoreProvider";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "./SectionHead";

export function Regions() {
  const { update, goTo } = useStore();
  return (
    <section id="regions" className="section pt-24 pb-6 md:pt-32">
      <SectionHead
        eyebrow="Направления"
        title="Открой Кыргызстан"
        text="Семь регионов, и в каждом свой характер. Выберите направление, и мы покажем жильё рядом."
      />
      <div className="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-2 xl:auto-rows-[250px] xl:grid-cols-4">
        {REGIONS.map((r, i) => {
          const count = STAYS.filter((s) => s.region === r.name).length;
          return (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                update({ region: r.name, cat: "all", onlyFav: false });
                goTo("stays");
              }}
              className={`group relative cursor-pointer overflow-hidden rounded-card text-left ${i === 0 ? "md:col-span-2 xl:row-span-2" : ""} ${i >= 5 ? "xl:col-span-2" : ""}`}
            >
              <Photo
                bg={r.bg}
                src={r.image}
                alt={r.name}
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                className="transition-transform duration-[900ms] ease-soft group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,38,29,0)_40%,rgba(18,38,29,.55)_100%)]" />
              <span className="glass absolute top-3.5 left-3.5 rounded-full px-3.5 py-2 text-xs font-bold text-forest">
                {count} {plural(count, "вариант", "варианта", "вариантов")}
              </span>
              <span className="arrow-btn glass absolute top-3.5 right-3.5 text-forest group-hover:rotate-45 group-hover:bg-forest group-hover:text-cream">
                <ArrowUpRight size={20} />
              </span>
              <div className="absolute right-5 bottom-5 left-5 text-cream">
                <div className={`font-display leading-none font-medium tracking-[-.02em] ${i === 0 ? "text-[44px] md:text-[56px]" : "text-[32px]"}`}>
                  {r.name}
                </div>
                <div className="mt-2 max-w-[340px] text-sm leading-snug text-cream/90">{r.text}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
