import { HOSPITALITY_VALUES } from "@/data/catalog";
import { Photo } from "@/components/ui/Photo";

export function Hospitality() {
  return (
    <section className="section grid grid-cols-1 items-center gap-8 pt-20 pb-6 md:gap-[72px] lg:grid-cols-[1fr_1.1fr]">
      <div className="relative h-[340px] overflow-hidden rounded-[36px] md:h-[520px]">
        <Photo bg="linear-gradient(160deg,#EADFC8,#A9BBA0)" alt="Семья хозяев гостевого дома" sizes="(max-width: 1000px) 100vw, 50vw" />
      </div>
      <div>
        <div className="kicker mb-3.5 font-bold text-teal">Кыргызское гостеприимство</div>
        <h2 className="m-0 mb-7 font-serif text-[34px] leading-[1.05] font-normal md:text-[52px]">Здесь вас встречают не как туриста, а как гостя.</h2>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-3.5 p-0">
          {HOSPITALITY_VALUES.map((v) => (
            <li key={v} className="flex items-center gap-3 border-t border-line py-3.5 text-[15px] font-semibold">
              <span className="grid size-[22px] flex-none place-items-center rounded-full bg-teal text-xs text-cream">✓</span>
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
