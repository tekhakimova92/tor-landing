export function Footer() {
  return (
    <footer className="mt-[72px] bg-forest px-[18px] pt-12 pb-10 text-sand md:px-7 lg:px-12">
      <div className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-8">
        <div>
          <div className="font-serif text-[40px] text-cream">TÖR</div>
          <p className="mt-2 max-w-[300px] text-sm leading-relaxed">Жильё и впечатления по всему Кыргызстану. Место, где тебя ждут.</p>
        </div>
        <div className="flex flex-wrap gap-14 text-sm leading-8">
          <div>
            <b className="text-gold">Гостям</b>
            <br />
            Как это работает
            <br />
            Помощь
            <br />
            Отмена брони
          </div>
          <div>
            <b className="text-gold">Хозяевам</b>
            <br />
            Разместить жильё
            <br />
            Правила
            <br />
            Поддержка
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1360px] border-t border-sand/25 pt-5 text-[13px]">© 2026 TÖR</div>
    </footer>
  );
}
