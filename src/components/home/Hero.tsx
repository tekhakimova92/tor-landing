"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  ChevronDown,
  Compass,
  Heart,
  House,
  MapPin,
  Search,
  Share2,
  Sparkles,
  Star,
  Tent,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { ALL_REGIONS, REGIONS, STAYS, getStay } from "@/data/catalog";
import { fmt, fmtRating } from "@/lib/format";
import { useStore } from "@/components/StoreProvider";
import { useNavActions } from "@/components/useNavActions";
import { Logo } from "@/components/Header";
import { GuestsStepper } from "@/components/ui/GuestsStepper";
import { Photo } from "@/components/ui/Photo";

const featured = getStay(1)!;
const previews = [getStay(5)!, getStay(2)!, getStay(9)!];
const HERO_BG = "linear-gradient(180deg,#8EC1DD 0%,#CFE3EA 38%,#7FA27A 72%,#2E5B43 100%)";

export function Hero() {
  const { goTo } = useStore();
  const nav = useNavActions();

  return (
    <section className="relative mx-2.5 mt-2.5 h-[780px] overflow-hidden rounded-[36px] md:mx-3 md:mt-3 md:h-[820px] md:rounded-frame lg:rounded-bl-none xl:h-[min(900px,calc(100svh-24px))] xl:min-h-[760px]">
      <Photo bg={HERO_BG} src="/images/hero.jpg" alt="Юрты на высокогорном пастбище в Кыргызстане" priority />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,38,29,.5)_0%,rgba(18,38,29,.12)_38%,rgba(18,38,29,.1)_60%,rgba(18,38,29,.5)_100%)]" />

      {/* Верхняя панель */}
      <div className="absolute top-3 right-3 left-3 z-10 flex items-start justify-between gap-3 md:top-4 md:right-4 md:left-4">
        <Logo onClick={nav.home} />
        <SearchBar className="hidden lg:grid" />
        <button
          type="button"
          className="glass flex h-12 cursor-pointer items-center gap-2 rounded-full pr-1.5 pl-5 text-sm font-bold whitespace-nowrap text-forest hover:bg-white/80"
        >
          <span className="hidden md:inline">Разместить жильё</span>
          <span className="md:hidden">Войти</span>
          <span className="grid size-9 place-items-center rounded-full bg-forest text-cream">
            <ArrowUpRight size={18} />
          </span>
        </button>
      </div>

      <Rail />

      {/* Заголовок */}
      <div className="pointer-events-none absolute top-[104px] right-5 left-5 text-center md:top-[130px] xl:top-[13%]">
        <div className="glass-dark mx-auto mb-5 inline-flex rounded-full px-4 py-2 text-xs font-semibold tracking-[.16em] text-cream uppercase md:text-[13px]">
          Бронирование жилья по Кыргызстану
        </div>
        <h1 className="m-0 font-display text-[54px] leading-[.95] font-medium tracking-[-.035em] text-white/90 [text-shadow:0_6px_40px_rgba(18,38,29,.35)] md:text-[96px] xl:text-[128px]">
          Место, где
          <br />
          тебя ждут
        </h1>
      </div>

      <p className="absolute top-[52%] left-24 hidden max-w-[300px] text-[15px] leading-relaxed text-white/90 [text-shadow:0_2px_18px_rgba(18,38,29,.5)] xl:block">
        Юрты у горных озёр, гостевые дома с домашней кухней и дома с видом на ледники. Выбирайте жильё у местных хозяев по всему Кыргызстану.
      </p>

      {/* Поиск на телефоне и планшете */}
      <SearchPanel className="lg:hidden" />

      {/* Вырезанная карточка снизу слева */}
      <div className="absolute bottom-0 left-0 hidden w-[430px] rounded-tr-frame bg-cream px-7 pt-7 pb-6 lg:block">
        <span aria-hidden className="absolute -top-11 left-0 size-11 bg-[radial-gradient(circle_at_100%_0,transparent_44px,var(--color-cream)_44.5px)]" />
        <span aria-hidden className="absolute right-[-44px] bottom-0 size-11 bg-[radial-gradient(circle_at_100%_0,transparent_44px,var(--color-cream)_44.5px)]" />
        <div className="font-display text-[26px] leading-tight font-medium">Найдите своё место</div>
        <p className="mt-2 mb-5 text-sm leading-relaxed text-moss">
          От юрты на джайлоо до шале в абрикосовом саду — жильё, где встречают как родных.
        </p>
        <div className="flex items-center gap-4">
          <div>
            <div className="font-display text-[52px] leading-none font-medium tracking-[-.03em]">{REGIONS.length}</div>
            <div className="mt-1 text-xs font-semibold text-moss">регионов</div>
          </div>
          <div className="ml-auto flex -space-x-3">
            {previews.map((p) => (
              <span key={p.id} className="relative size-12 overflow-hidden rounded-full border-[3px] border-cream">
                <Photo bg={p.bg} src={p.image} alt={p.name} sizes="48px" />
              </span>
            ))}
            <span className="relative grid size-12 place-items-center rounded-full border-[3px] border-cream bg-sand text-xs font-bold">
              +{STAYS.length - previews.length}
            </span>
          </div>
          <button type="button" aria-label="Смотреть жильё" onClick={() => goTo("stays")} className="arrow-btn cursor-pointer">
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>

      <FeaturedCard />

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden size-[84px] -translate-x-1/2 place-items-center rounded-full bg-forest font-display text-[22px] font-semibold tracking-[.04em] text-gold shadow-[0_12px_40px_rgba(18,38,29,.4)] xl:grid">
        TÖR
      </div>
    </section>
  );
}

type RailItem = { label: string; icon: LucideIcon; go: () => void; on?: boolean; badge?: number };

function Rail() {
  const nav = useNavActions();
  const groups: RailItem[][] = [
    [
      { label: "Главная", icon: House, go: nav.home, on: !nav.onlyFav },
      { label: "Поиск жилья", icon: Search, go: nav.stays },
      { label: "Направления", icon: Compass, go: nav.regions },
    ],
    [
      { label: "Юрты", icon: Tent, go: nav.yurts },
      { label: "Впечатления", icon: Sparkles, go: nav.experiences },
      { label: "Избранное", icon: Heart, go: nav.favorites, badge: nav.favCount },
    ],
  ];
  return (
    <nav aria-label="Разделы" className="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {groups.map((g, i) => (
        <div key={i} className="glass flex flex-col gap-1.5 rounded-full p-1.5">
          {g.map((it) => (
            <button
              key={it.label}
              type="button"
              aria-label={it.label}
              onClick={it.go}
              className={`group relative grid size-11 cursor-pointer place-items-center rounded-full transition-colors ${
                it.on ? "bg-forest text-cream" : "bg-white/60 text-forest hover:bg-white"
              }`}
            >
              <it.icon size={19} strokeWidth={1.8} />
              {!!it.badge && (
                <span className="absolute -top-0.5 -right-0.5 grid min-w-[18px] place-items-center rounded-full bg-rose px-1 text-[10px] leading-[18px] font-bold text-white">
                  {it.badge}
                </span>
              )}
              <span className="pointer-events-none absolute left-[calc(100%+12px)] rounded-full bg-forest px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-cream opacity-0 transition-opacity group-hover:opacity-100">
                {it.label}
              </span>
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

function FeaturedCard() {
  const { favs, toggleFav } = useStore();
  const fav = favs.includes(featured.id);
  const stats = [
    { icon: Users, text: `до ${featured.cap} гостей` },
    { icon: BedDouble, text: featured.beds },
    { icon: Star, text: `${fmtRating(featured.rating)} · ${featured.reviews} отзывов` },
    { icon: Wallet, text: `${fmt(featured.price)} сом / ночь` },
  ];

  const share = async () => {
    const url = `${location.origin}/stay/${featured.id}`;
    try {
      if (navigator.share) await navigator.share({ title: featured.name, url });
      else await navigator.clipboard.writeText(url);
    } catch {}
  };

  return (
    <div className="glass absolute right-6 bottom-6 hidden w-[350px] rounded-card p-5 text-forest xl:block">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold tracking-[.16em] text-teal uppercase">Выбор недели</div>
          <div className="mt-1 font-display text-2xl leading-tight font-medium">{featured.name}</div>
          <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-moss">
            <MapPin size={14} /> {featured.loc}
          </div>
        </div>
        <Link href={`/stay/${featured.id}`} aria-label={`Открыть ${featured.name}`} className="arrow-btn bg-white text-forest hover:text-cream">
          <ArrowUpRight size={20} />
        </Link>
      </div>
      <p className="mt-3 mb-4 line-clamp-3 text-[13px] leading-relaxed text-forest/80">{featured.desc}</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-forest/10 pt-4 text-[13px] font-semibold">
        {stats.map((s) => (
          <div key={s.text} className="flex items-center gap-2">
            <s.icon size={15} strokeWidth={1.8} className="flex-none text-teal" /> {s.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          aria-pressed={fav}
          onClick={() => toggleFav(featured.id)}
          className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/70 text-[13px] font-semibold hover:bg-white"
        >
          <Heart size={16} fill={fav ? "var(--color-rose)" : "none"} color={fav ? "var(--color-rose)" : "currentColor"} />
          {fav ? "В избранном" : "В избранное"}
        </button>
        <button type="button" aria-label="Поделиться" onClick={share} className="grid size-10 cursor-pointer place-items-center rounded-full bg-white/70 hover:bg-white">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}

function useSearchSubmit() {
  const { update, goTo } = useStore();
  return (e: React.FormEvent) => {
    e.preventDefault();
    update({ cat: "all", onlyFav: false });
    goTo("stays");
  };
}

const regionOptions = [ALL_REGIONS, ...REGIONS.map((r) => r.name)];
const control = "w-full min-w-0 cursor-pointer appearance-none border-0 bg-transparent p-0 text-[15px] font-bold text-forest outline-none";

// Поиск в верхней панели на широких экранах.
function SearchBar({ className = "" }: { className?: string }) {
  const { region, from, to, update } = useStore();
  const submit = useSearchSubmit();
  const cell = "flex min-w-0 items-center gap-2.5 rounded-full px-4 py-1.5 hover:bg-white/60";

  return (
    <form onSubmit={submit} className={`glass grid-cols-[1.3fr_1fr_1fr_auto_auto] items-center gap-0.5 rounded-full p-1.5 ${className}`}>
      <label className={cell}>
        <MapPin size={17} className="flex-none text-teal" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[11px] font-semibold text-moss">Куда</span>
          <span className="relative flex items-center">
            <select value={region} onChange={(e) => update({ region: e.target.value })} className={`${control} pr-5`}>
              {regionOptions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-0" />
          </span>
        </span>
      </label>
      <label className={cell}>
        <span className="flex min-w-0 flex-col">
          <span className="text-[11px] font-semibold text-moss">Заезд</span>
          <input type="date" value={from} max={to || undefined} onChange={(e) => update({ from: e.target.value })} className={control} />
        </span>
      </label>
      <label className={cell}>
        <span className="flex min-w-0 flex-col">
          <span className="text-[11px] font-semibold text-moss">Выезд</span>
          <input type="date" value={to} min={from || undefined} onChange={(e) => update({ to: e.target.value })} className={control} />
        </span>
      </label>
      <div className="flex flex-col px-4 py-1.5">
        <span className="text-[11px] font-semibold text-moss">Гости</span>
        <GuestsStepper showValue size={22} />
      </div>
      <button type="submit" aria-label="Найти жильё" className="grid size-12 cursor-pointer place-items-center rounded-full bg-forest text-cream hover:bg-teal">
        <Search size={19} />
      </button>
    </form>
  );
}

// Поиск внизу героя на телефоне и планшете.
function SearchPanel({ className = "" }: { className?: string }) {
  const { region, from, to, update } = useStore();
  const submit = useSearchSubmit();
  const cell = "flex min-w-0 flex-col gap-1 rounded-[20px] bg-white/55 px-4 py-2.5";
  const label = "flex items-center gap-1.5 text-[11px] font-semibold text-moss";

  return (
    <form onSubmit={submit} className={`glass absolute right-3 bottom-3 left-3 grid grid-cols-2 gap-1.5 rounded-[30px] p-2 md:right-4 md:bottom-4 md:left-4 md:grid-cols-4 ${className}`}>
      <label className={`${cell} col-span-2 md:col-span-4`}>
        <span className={label}>
          <MapPin size={13} /> Куда
        </span>
        <span className="relative flex items-center">
          <select value={region} onChange={(e) => update({ region: e.target.value })} className={`${control} pr-5 text-base`}>
            {regionOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-0" />
        </span>
      </label>
      <label className={cell}>
        <span className={label}>Заезд</span>
        <input type="date" value={from} max={to || undefined} onChange={(e) => update({ from: e.target.value })} className={control} />
      </label>
      <label className={cell}>
        <span className={label}>Выезд</span>
        <input type="date" value={to} min={from || undefined} onChange={(e) => update({ to: e.target.value })} className={control} />
      </label>
      <div className={`${cell} justify-center`}>
        <span className={label}>
          <Users size={13} /> Гости
        </span>
        <GuestsStepper showValue size={26} />
      </div>
      <button type="submit" className="flex cursor-pointer items-center justify-center gap-2 rounded-[20px] bg-forest py-3.5 font-bold text-cream hover:bg-teal">
        <Search size={18} /> Найти
      </button>
    </form>
  );
}
