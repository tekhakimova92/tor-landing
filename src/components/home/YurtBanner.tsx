"use client";

import { ArrowUpRight, Flame, Moon, Soup } from "lucide-react";
import { useStore } from "@/components/StoreProvider";
import { Photo } from "@/components/ui/Photo";

const perks = [
  { icon: Flame, title: "Печь и войлок", text: "Тепло даже холодной ночью в горах" },
  { icon: Soup, title: "Домашняя еда", text: "Бешбармак, лепёшки и чай у костра" },
  { icon: Moon, title: "Звёздное небо", text: "Ни огней, ни шума — только горы" },
];

export function YurtBanner() {
  const { update, goTo } = useStore();
  return (
    <section id="yurts" className="relative mx-2.5 mt-24 scroll-mt-20 overflow-hidden rounded-[36px] md:mx-3 md:mt-32 md:rounded-frame">
      <Photo bg="linear-gradient(120deg,#5B3A21,#B07A45 60%,#E8C27A)" src="/images/yurt-banner.jpg" alt="Юрта в горах Кыргызстана" sizes="100vw" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(18,22,12,.7)_0%,rgba(18,22,12,.25)_55%,rgba(18,22,12,.05)_100%)]" />
      <div className="relative grid min-h-[640px] items-end gap-8 p-5 md:p-10 xl:grid-cols-[1fr_380px] xl:p-14">
        <div className="max-w-[640px] pt-28 text-cream">
          <span className="glass-dark inline-flex rounded-full px-4 py-2 text-xs font-semibold tracking-[.16em] uppercase">Жить в юрте</span>
          <h2 className="mt-5 mb-5 font-display text-[42px] leading-[.98] font-medium tracking-[-.03em] md:text-[72px]">Почувствуй Кыргызстан <span className="whitespace-nowrap">по-настоящему</span></h2>
          <p className="m-0 mb-8 max-w-[480px] text-lg leading-relaxed text-cream/90">
            Проснись среди гор, выпей чай у костра и проведи ночь там, где веками останавливались путешественники.
          </p>
          <button
            type="button"
            onClick={() => {
              update({ cat: "yurt", onlyFav: false });
              goTo("stays");
            }}
            className="flex h-14 cursor-pointer items-center gap-3 rounded-full bg-gold pr-2 pl-7 font-bold text-forest hover:bg-gold-light"
          >
            Найти юрту
            <span className="grid size-10 place-items-center rounded-full bg-forest text-cream">
              <ArrowUpRight size={19} />
            </span>
          </button>
        </div>
        <ul className="glass m-0 flex list-none flex-col gap-1 rounded-card p-2 text-forest">
          {perks.map((p) => (
            <li key={p.title} className="flex items-center gap-4 rounded-[24px] bg-white/45 p-4">
              <span className="grid size-12 flex-none place-items-center rounded-full bg-forest text-gold">
                <p.icon size={20} />
              </span>
              <span>
                <b className="block font-display text-lg font-medium">{p.title}</b>
                <span className="text-sm text-moss">{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
