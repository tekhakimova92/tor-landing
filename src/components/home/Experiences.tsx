import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES } from "@/data/catalog";
import { fmt } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "./SectionHead";

export function Experiences() {
  return (
    <section id="exp" className="section pt-24 pb-6 md:pt-32">
      <SectionHead eyebrow="Впечатления" title="То, ради чего стоит ехать" text="Добавьте к поездке конную прогулку, мастер-класс или вечер у горячих источников." />
      <div className="no-scrollbar -mx-[18px] flex snap-x gap-4 overflow-x-auto px-[18px] pb-4 md:-mx-7 md:px-7 lg:mx-0 lg:px-0">
        {EXPERIENCES.map((e) => (
          <div key={e.name} className="group relative h-[340px] w-[250px] flex-none snap-start overflow-hidden rounded-card md:h-[400px] md:w-[300px]">
            <Photo
              bg={e.bg}
              src={e.image}
              alt={e.name}
              sizes="300px"
              className="transition-transform duration-[900ms] ease-soft group-hover:scale-[1.06]"
            />
            <div className="glass absolute right-3 bottom-3 left-3 flex items-center justify-between gap-3 rounded-[22px] p-3.5 pl-4 text-forest">
              <div>
                <div className="font-display text-lg leading-tight font-medium">{e.name}</div>
                <div className="mt-0.5 text-[13px] text-moss">от {fmt(e.price)} сом</div>
              </div>
              <span className="arrow-btn size-10 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
