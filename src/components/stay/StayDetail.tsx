"use client";

import { ArrowLeft, BedDouble, Check, MapPin, Share2, Star, Users } from "lucide-react";
import { TYPE_LABELS, type Stay } from "@/data/catalog";
import { fmtRating, plural } from "@/lib/format";
import { useStore } from "@/components/StoreProvider";
import { HeartIcon } from "@/components/ui/HeartIcon";
import { Photo } from "@/components/ui/Photo";
import { BookingCard } from "./BookingCard";

const pill = "flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-white/70 px-4 text-sm font-semibold text-forest hover:bg-white";

export function StayDetail({ stay }: { stay: Stay }) {
  const { favs, toggleFav, goTo } = useStore();
  const fav = favs.includes(stay.id);
  const photos = [stay.image, ...(stay.gallery ?? [])].slice(0, 5);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: stay.name, url: location.href });
      else await navigator.clipboard.writeText(location.href);
    } catch {}
  };

  const facts = [
    { icon: Users, label: "Гости", value: `до ${stay.cap}` },
    { icon: BedDouble, label: "Спальные места", value: stay.beds },
    { icon: Star, label: "Рейтинг", value: `${fmtRating(stay.rating)} · ${stay.reviews} ${plural(stay.reviews, "отзыв", "отзыва", "отзывов")}` },
  ];

  return (
    <section className="mx-auto box-border max-w-[1360px] px-[18px] pt-24 pb-6 md:px-7 lg:px-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => goTo("stays")} className={pill}>
          <ArrowLeft size={17} /> Назад к жилью
        </button>
        <div className="flex gap-2">
          <button type="button" aria-label="Поделиться" onClick={share} className={pill}>
            <Share2 size={16} /> <span className="hidden sm:inline">Поделиться</span>
          </button>
          <button type="button" aria-pressed={fav} onClick={() => toggleFav(stay.id)} className={pill}>
            <HeartIcon filled={fav} size={17} />
            {fav ? "В избранном" : "В избранное"}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <span className="eyebrow">{TYPE_LABELS[stay.type]}</span>
        <h1 className="mt-4 mb-0 font-display text-[40px] leading-[1] font-medium tracking-[-.03em] md:text-[64px]">{stay.name}</h1>
        <div className="mt-3 flex items-center gap-1.5 text-[15px] text-moss">
          <MapPin size={16} /> {stay.loc}
        </div>
      </div>

      <div className="no-scrollbar -mx-[18px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[18px] md:mx-0 md:grid md:grid-cols-[2fr_1fr_1fr] md:grid-rows-[230px_230px] md:overflow-visible md:px-0 xl:grid-rows-[270px_270px]">
        {photos.map((src, i) => (
          <div
            key={i}
            className={`relative h-[320px] w-[85%] flex-none snap-center overflow-hidden rounded-card md:h-auto md:w-auto ${i === 0 ? "md:row-span-2 md:rounded-l-frame" : ""} ${
              i === 2 ? "md:rounded-tr-frame" : ""
            } ${i === 4 ? "md:rounded-br-frame" : ""}`}
          >
            <Photo bg={stay.bg} src={src} alt={`${stay.name}, фото ${i + 1}`} sizes={i === 0 ? "(max-width: 760px) 85vw, 50vw" : "(max-width: 760px) 85vw, 25vw"} priority={i === 0} />
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <div>
          <div className="flex items-center gap-4 rounded-card border border-line bg-white/60 p-4">
            <span className="grid size-14 flex-none place-items-center rounded-full bg-forest font-display text-xl text-gold">{stay.host[0]}</span>
            <div>
              <div className="text-xs font-semibold text-moss">Хозяин</div>
              <div className="font-display text-xl font-medium">{stay.host}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-3 rounded-[24px] border border-line bg-white/60 p-4 sm:block">
                <f.icon size={20} className="flex-none text-teal" />
                <div>
                  <div className="text-xs font-semibold text-moss sm:mt-3">{f.label}</div>
                  <div className="mt-0.5 font-semibold">{f.value}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="my-8 text-[17px] leading-[1.75]">{stay.desc}</p>

          <h2 className="m-0 mb-4 font-display text-[28px] font-medium">Что есть в жилье</h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
            {stay.amenities.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-[20px] bg-white/60 px-4 py-3.5 text-[15px] font-medium">
                <span className="grid size-7 flex-none place-items-center rounded-full bg-forest text-gold">
                  <Check size={15} />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-first lg:sticky lg:top-24 lg:order-none">
          <BookingCard stay={stay} />
        </div>
      </div>
    </section>
  );
}
