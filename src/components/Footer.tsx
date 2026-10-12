export function Footer() {
  const cols = [
    { title: "Гостям", links: ["Как это работает", "Помощь", "Отмена брони"] },
    { title: "Хозяевам", links: ["Разместить жильё", "Правила", "Поддержка"] },
  ];
  return (
    <footer className="mx-2.5 mt-24 mb-2.5 overflow-hidden rounded-[36px] bg-forest px-6 pt-12 pb-6 text-sand md:mx-3 md:mt-32 md:mb-3 md:rounded-frame md:px-12">
      <div className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-10">
        <p className="m-0 max-w-[340px] text-[15px] leading-relaxed">Жильё и впечатления по всему Кыргызстану. Место, где тебя ждут.</p>
        <div className="flex flex-wrap gap-14 text-sm">
          {cols.map((c) => (
            <div key={c.title}>
              <div className="mb-3 font-bold text-gold">{c.title}</div>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sand/85">
                {c.links.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1360px] font-display text-[26vw] leading-[.8] font-semibold tracking-[-.04em] text-cream/10 select-none md:text-[19vw] xl:text-[260px]">
        TÖR
      </div>
      <div className="mx-auto mt-6 flex max-w-[1360px] justify-between border-t border-sand/20 pt-5 text-[13px] text-sand/70">
        <span>© 2026 TÖR</span>
        <span>Кыргызстан</span>
      </div>
    </footer>
  );
}
