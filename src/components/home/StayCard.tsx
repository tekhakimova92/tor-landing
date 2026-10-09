import Link from "next/link";
import { TYPE_LABELS, type Stay } from "@/data/catalog";
import { fmt, fmtRating } from "@/lib/format";
import { FavButton } from "@/components/ui/FavButton";
import { Photo } from "@/components/ui/Photo";

export function StayCard({ stay }: { stay: Stay }) {
  return (
    <article className="group relative flex flex-col gap-3">
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-[26px] shadow-[0_8px_28px_rgba(31,58,46,.12)]">
        <Photo
          bg={stay.bg}
          src={stay.image}
          alt={stay.name}
          sizes="(max-width: 760px) 100vw, 33vw"
          className="transition-transform duration-[600ms] ease-soft group-hover:scale-[1.06]"
        />
        <span className="absolute bottom-3.5 left-3.5 rounded-full bg-cream/85 px-3 py-1.5 text-xs font-bold text-teal backdrop-blur-md">
          {TYPE_LABELS[stay.type]}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="m-0 font-serif text-2xl leading-[1.15] font-medium">
          <Link href={`/stay/${stay.id}`} className="text-forest no-underline after:absolute after:inset-0 hover:text-forest">
            {stay.name}
          </Link>
        </h3>
        <span className="text-sm font-bold whitespace-nowrap">
          <span className="text-gold">★</span> {fmtRating(stay.rating)} <span className="font-medium text-moss">({stay.reviews})</span>
        </span>
      </div>
      <div className="-mt-1.5 text-sm text-moss">{stay.loc}</div>
      <div className="-mt-1.5 text-[15px]">
        <b className="text-[17px]">{fmt(stay.price)} сом</b> <span className="text-moss">за ночь</span>
      </div>
      <FavButton id={stay.id} className="absolute top-3.5 right-3.5 z-10" />
    </article>
  );
}
