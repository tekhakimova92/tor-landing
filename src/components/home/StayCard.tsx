import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { TYPE_LABELS, type Stay } from "@/data/catalog";
import { fmt, fmtRating } from "@/lib/format";
import { FavButton } from "@/components/ui/FavButton";
import { Photo } from "@/components/ui/Photo";

export function StayCard({ stay }: { stay: Stay }) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-card shadow-soft">
      <Photo
        bg={stay.bg}
        src={stay.image}
        alt={stay.name}
        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
        className="transition-transform duration-[900ms] ease-soft group-hover:scale-[1.06]"
      />
      <span className="glass absolute top-3.5 left-3.5 rounded-full px-3.5 py-2 text-xs font-bold text-forest">{TYPE_LABELS[stay.type]}</span>
      <FavButton id={stay.id} className="glass absolute top-3.5 right-3.5 z-10" />

      <div className="glass absolute right-3 bottom-3 left-3 rounded-[24px] p-4 text-forest">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="m-0 font-display text-[21px] leading-tight font-medium">
              <Link href={`/stay/${stay.id}`} className="text-forest no-underline after:absolute after:inset-0 hover:text-forest">
                {stay.name}
              </Link>
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[13px] text-moss">
              <MapPin size={13} className="flex-none" />
              <span className="truncate">{stay.loc}</span>
            </div>
          </div>
          <span className="arrow-btn size-10 group-hover:rotate-45 group-hover:bg-teal">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-forest/10 pt-3 text-sm">
          <span>
            <b className="text-base">{fmt(stay.price)} сом</b> <span className="text-moss">/ ночь</span>
          </span>
          <span className="flex items-center gap-1 font-bold">
            <Star size={14} fill="var(--color-gold)" color="var(--color-gold)" /> {fmtRating(stay.rating)}
            <span className="font-medium text-moss">({stay.reviews})</span>
          </span>
        </div>
      </div>
    </article>
  );
}
