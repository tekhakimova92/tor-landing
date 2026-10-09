"use client";

import { TYPE_LABELS, type Stay } from "@/data/catalog";
import { fmtRating, plural } from "@/lib/format";
import { useStore } from "@/components/StoreProvider";
import { HeartIcon } from "@/components/ui/HeartIcon";
import { Photo } from "@/components/ui/Photo";
import { BookingCard } from "./BookingCard";

export function StayDetail({ stay }: { stay: Stay }) {
  const { favs, toggleFav, goTo } = useStore();
  const fav = favs.includes(stay.id);
  const gallery = [stay.image, ...(stay.gallery ?? [])];

  return (
    <section className="mx-auto box-border max-w-[1280px] px-[18px] pt-24 pb-6 md:px-7 lg:px-12">
      <button type="button" onClick={() => goTo("stays")} className="mb-[18px] inline-block cursor-pointer text-sm font-semibold text-teal hover:underline">
        ← Назад к жилью
      </button>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 font-serif text-[36px] leading-[1.05] font-normal md:text-[52px]">{stay.name}</h1>
          <div className="mt-2 text-[15px] text-moss">
            <span className="text-gold">★</span> <b className="text-forest">{fmtRating(stay.rating)}</b> · {stay.reviews}{" "}
            {plural(stay.reviews, "отзыв", "отзыва", "отзывов")} · {stay.loc}
          </div>
        </div>
        <button
          type="button"
          aria-pressed={fav}
          onClick={() => toggleFav(stay.id)}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-sage px-5 py-[11px] text-sm font-semibold hover:bg-sand"
        >
          <HeartIcon filled={fav} size={18} />
          {fav ? "В избранном" : "В избранное"}
        </button>
      </div>

      <div className="grid grid-cols-1 grid-rows-[280px] gap-3 overflow-hidden rounded-[30px] xl:grid-cols-[2fr_1fr_1fr] xl:grid-rows-[240px_240px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`relative ${i === 0 ? "xl:row-span-2" : "hidden xl:block"}`}>
            <Photo bg={stay.bg} src={gallery[i]} alt={`${stay.name}, фото ${i + 1}`} sizes={i === 0 ? "(max-width: 1100px) 100vw, 50vw" : "25vw"} priority={i === 0} />
          </div>
        ))}
      </div>

      <div className="mt-9 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="mb-1.5 font-serif text-[28px]">
            {TYPE_LABELS[stay.type]}, хозяин {stay.host}
          </div>
          <div className="border-b border-line pb-6 text-[15px] text-moss">
            До {stay.cap} {plural(stay.cap, "гостя", "гостей", "гостей")} · {stay.beds}
          </div>
          <p className="my-6 border-b border-line pb-6 text-[17px] leading-[1.7]">{stay.desc}</p>
          <h3 className="m-0 mb-4 font-serif text-[26px] font-medium">Что есть в жилье</h3>
          <ul className="m-0 mb-3 grid list-none grid-cols-2 gap-x-5 gap-y-3 p-0">
            {stay.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2.5 text-[15px]">
                <span className="size-2 flex-none rounded-full bg-gold" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <BookingCard stay={stay} />
      </div>
    </section>
  );
}
