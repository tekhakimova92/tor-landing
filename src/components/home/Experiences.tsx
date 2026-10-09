import { EXPERIENCES } from "@/data/catalog";
import { fmt } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";

export function Experiences() {
  return (
    <section id="exp" className="section pt-20 pb-6">
      <h2 className="m-0 mb-2 font-serif text-[34px] leading-[1.05] font-normal md:text-[52px]">Впечатления</h2>
      <p className="mt-0 mb-7 text-base text-moss">Добавьте к поездке то, ради чего стоит ехать.</p>
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-3.5">
        {EXPERIENCES.map((e) => (
          <div key={e.name} className="flex w-[220px] flex-none flex-col gap-3 transition-transform duration-[250ms] hover:-translate-y-1 md:w-[260px]">
            <div className="relative h-[240px] overflow-hidden rounded-3xl md:h-[300px]">
              <Photo bg={e.bg} src={e.image} alt={e.name} sizes="260px" />
            </div>
            <div className="font-serif text-[22px] leading-[1.1]">{e.name}</div>
            <div className="-mt-1.5 text-sm text-moss">от {fmt(e.price)} сом</div>
          </div>
        ))}
      </div>
    </section>
  );
}
