"use client";

import Link from "next/link";
import { ALL_REGIONS, REGIONS, getStay } from "@/data/catalog";
import { fmt, fmtRating } from "@/lib/format";
import { useStore } from "@/components/StoreProvider";
import { GuestsStepper } from "@/components/ui/GuestsStepper";
import { Photo } from "@/components/ui/Photo";

const HERO_BG = "linear-gradient(180deg,#8EC1DD 0%,#CFE3EA 38%,#7FA27A 72%,#2E5B43 100%)";
const featured = getStay(1)!;

const field = "flex flex-col gap-0.5 rounded-[20px] px-3.5 py-1.5 hover:bg-white";
const control = "border-0 bg-transparent py-0.5 text-base font-semibold text-forest outline-none";

export function Hero() {
  const { region, from, to, update, goTo } = useStore();

  return (
    <section className="relative h-[780px] overflow-hidden rounded-b-[32px] md:m-3.5 md:h-[760px] md:rounded-[40px]" style={{ background: HERO_BG }}>
      <Photo bg="transparent" alt="Горы Кыргызстана" priority />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,40,34,.62)_0%,rgba(15,40,34,.3)_45%,rgba(15,40,34,.5)_100%)]" />

      <div className="pointer-events-none absolute top-[110px] right-[18px] left-[18px] text-cream md:top-[130px] md:right-7 md:left-7 lg:right-12 lg:left-12">
        <div className="kicker mb-3.5">Бронирование жилья по всему Кыргызстану</div>
        <h1 className="m-0 max-w-[1000px] font-serif text-[42px] leading-[1.02] font-normal tracking-[-.01em] text-balance md:text-[60px] lg:text-[84px]">
          Кыргызстан начинается с места, где тебя ждут
        </h1>
      </div>

      <Link
        href={`/stay/${featured.id}`}
        className="absolute top-[27%] right-12 hidden w-[290px] items-center gap-3.5 rounded-[28px] bg-cream/62 px-5 py-[18px] text-forest no-underline shadow-[0_12px_40px_rgba(15,40,34,.2)] backdrop-blur-lg hover:text-forest xl:flex"
      >
        <div className="flex-1">
          <div className="text-xs font-bold tracking-[.14em] text-teal uppercase">Выбор недели</div>
          <div className="mt-1.5 mb-1 font-serif text-2xl leading-[1.1]">{featured.name}</div>
          <div className="text-[13px]">
            ★ {fmtRating(featured.rating)} · от {fmt(featured.price)} сом
          </div>
        </div>
        <div className="grid size-11 place-items-center rounded-full bg-forest text-lg text-cream">↗</div>
      </Link>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          update({ cat: "all", onlyFav: false });
          goTo("stays");
        }}
        className="absolute right-[18px] bottom-[18px] left-[18px] grid grid-cols-1 items-center gap-1 rounded-[28px] bg-cream/90 p-3.5 shadow-[0_18px_50px_rgba(15,40,34,.25)] backdrop-blur-xl md:right-7 md:bottom-8 md:left-7 md:grid-cols-2 md:gap-1.5 md:p-3 lg:right-12 lg:left-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto] lg:rounded-full"
      >
        <label className={field}>
          <span className="field-label">Куда?</span>
          <select value={region} onChange={(e) => update({ region: e.target.value })} className={`${control} cursor-pointer`}>
            {[ALL_REGIONS, ...REGIONS.map((r) => r.name)].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className={field}>
          <span className="field-label">Заезд</span>
          <input type="date" value={from} max={to || undefined} onChange={(e) => update({ from: e.target.value })} className={control} />
        </label>
        <label className={field}>
          <span className="field-label">Выезд</span>
          <input type="date" value={to} min={from || undefined} onChange={(e) => update({ to: e.target.value })} className={control} />
        </label>
        <div className="flex flex-col gap-0.5 px-3.5 py-1.5">
          <span className="field-label">Гости</span>
          <div className="py-0.5">
            <GuestsStepper showValue />
          </div>
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-forest px-[30px] py-[18px] text-center text-base font-bold text-cream transition-colors duration-200 hover:bg-teal md:col-span-2 lg:col-span-1"
        >
          Найти жильё
        </button>
      </form>
    </section>
  );
}

