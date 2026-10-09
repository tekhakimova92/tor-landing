"use client";

import { REGIONS } from "@/data/catalog";
import { useStore } from "@/components/StoreProvider";
import { Photo } from "@/components/ui/Photo";

export function Regions() {
  const { update, goTo } = useStore();
  return (
    <section id="regions" className="section pt-[72px] pb-6">
      <h2 className="m-0 mb-2 font-serif text-[34px] leading-[1.05] font-normal md:text-[52px]">Открой Кыргызстан</h2>
      <p className="mt-0 mb-7 max-w-[560px] text-base text-moss">
        Семь регионов, и в каждом свой характер. Выберите направление, и мы покажем жильё рядом.
      </p>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-2 xl:auto-rows-[240px] xl:grid-cols-4">
        {REGIONS.map((r, i) => (
          <button
            key={r.name}
            type="button"
            onClick={() => {
              update({ region: r.name, cat: "all", onlyFav: false });
              goTo("stays");
            }}
            className={`group relative min-h-[200px] cursor-pointer overflow-hidden rounded-[28px] text-left ${i === 0 ? "xl:col-span-2 xl:row-span-2" : ""}`}
          >
            <Photo
              bg={r.bg}
              src={r.image}
              alt={r.name}
              sizes="(max-width: 1100px) 50vw, 25vw"
              className="transition-transform duration-700 ease-soft group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,40,34,0)_45%,rgba(15,40,34,.72)_100%)]" />
            <div className="pointer-events-none absolute right-[22px] bottom-5 left-[22px] text-cream">
              <div className="font-serif text-[30px] leading-none">{r.name}</div>
              <div className="mt-1.5 text-sm leading-[1.4]">{r.text}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
