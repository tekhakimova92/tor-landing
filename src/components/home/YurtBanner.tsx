"use client";

import { useStore } from "@/components/StoreProvider";
import { Photo } from "@/components/ui/Photo";

export function YurtBanner() {
  const { update, goTo } = useStore();
  return (
    <section
      id="yurts"
      className="relative mt-[72px] min-h-[560px] scroll-mt-20 overflow-hidden md:mx-3.5 md:min-h-[600px] md:rounded-[40px]"
    >
      <Photo bg="linear-gradient(120deg,#5B3A21,#B07A45 60%,#E8C27A)" alt="Интерьер юрты" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(30,22,12,.78)_0%,rgba(30,22,12,.3)_60%,rgba(30,22,12,0)_100%)]" />
      <div className="relative max-w-[760px] px-6 py-16 text-cream md:px-[72px] md:py-[110px]">
        <div className="kicker mb-4 text-gold">Жить в юрте</div>
        <h2 className="m-0 mb-5 font-serif text-[38px] leading-[1.04] font-normal md:text-[64px]">Почувствуй Кыргызстан по-настоящему</h2>
        <p className="m-0 mb-[30px] text-lg leading-relaxed">
          Проснись среди гор, выпей чай у костра и проведи ночь там, где веками останавливались путешественники.
        </p>
        <button
          type="button"
          onClick={() => {
            update({ cat: "yurt", onlyFav: false });
            goTo("stays");
          }}
          className="cursor-pointer rounded-full bg-gold px-[30px] py-4 font-bold text-forest hover:bg-gold-light"
        >
          Найти юрту
        </button>
      </div>
    </section>
  );
}
