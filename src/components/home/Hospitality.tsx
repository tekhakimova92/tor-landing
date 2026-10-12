import { HandHeart, Landmark, ShieldCheck, Soup, Sun, Users } from "lucide-react";
import { STAYS } from "@/data/catalog";
import { fmtRating } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";

const avgRating = STAYS.reduce((sum, s) => sum + s.rating, 0) / STAYS.length;

const values = [
  { icon: Users, label: "Настоящие хозяева" },
  { icon: Soup, label: "Домашняя кухня" },
  { icon: Landmark, label: "Традиции" },
  { icon: Sun, label: "Тепло" },
  { icon: ShieldCheck, label: "Безопасность" },
  { icon: HandHeart, label: "Местный колорит" },
];

export function Hospitality() {
  return (
    <section className="section grid grid-cols-1 items-stretch gap-4 pt-24 pb-6 md:pt-32 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative min-h-[380px] overflow-hidden rounded-card md:min-h-[560px]">
        <Photo bg="linear-gradient(160deg,#EADFC8,#A9BBA0)" src="/images/hosts.jpg" alt="Хозяева встречают гостей" sizes="(max-width: 1000px) 100vw, 50vw" />
        <div className="glass absolute bottom-4 left-4 flex items-center gap-3 rounded-full py-2 pr-5 pl-2 text-forest">
          <span className="grid size-10 place-items-center rounded-full bg-forest font-display text-gold">★</span>
          <span className="text-sm">
            <b>{fmtRating(avgRating)} из 5</b> — средняя оценка жилья
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-8 rounded-card bg-forest p-7 text-cream md:p-10">
        <div>
          <span className="eyebrow border-cream/20 text-cream/80">Кыргызское гостеприимство</span>
          <h2 className="h-section mt-5 text-cream">Здесь вас встречают не как туриста, а как гостя.</h2>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0">
          {values.map((v) => (
            <li key={v.label} className="flex items-center gap-3 rounded-[20px] bg-cream/8 p-3.5 text-[15px] font-semibold">
              <v.icon size={18} className="flex-none text-gold" />
              {v.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
