"use client";

import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_FEE, type Stay } from "@/data/catalog";
import { fmt, fmtDate, nightsBetween, plural } from "@/lib/format";
import { useStore } from "@/components/StoreProvider";
import { GuestsStepper } from "@/components/ui/GuestsStepper";

const primary =
  "box-border w-full cursor-pointer rounded-full bg-forest p-4 text-center font-bold text-cream hover:bg-teal disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-forest";
const input = "box-border w-full rounded-2xl border border-sage bg-cream px-4 py-3.5 text-[15px] outline-none focus:border-teal";

export function BookingCard({ stay }: { stay: Stay }) {
  const { from, to, guests, update } = useStore();
  const router = useRouter();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Страница остаётся в памяти после ухода (Activity), поэтому при скрытии возвращаемся к первому шагу.
  useLayoutEffect(() => () => setStep(0), []);

  const nights = nightsBetween(from, to);
  const subtotal = stay.price * nights;
  const fee = subtotal * SERVICE_FEE;
  const total = subtotal + fee;
  const guestsOver = guests > stay.cap;
  const canBook = nights > 0 && !guestsOver;
  const canConfirm = name.trim().length > 0 && phone.replace(/\D/g, "").length >= 6;

  return (
    <aside className="top-24 rounded-[30px] border border-sand bg-white p-[26px] shadow-[0_18px_50px_rgba(31,58,46,.16)] lg:sticky">
      {step === 0 && (
        <>
          <div className="text-[15px]">
            <b className="font-serif text-[32px] font-medium">{fmt(stay.price)} сом</b> <span className="text-moss">за ночь</span>
          </div>
          <div className="mt-[18px] grid grid-cols-2 overflow-hidden rounded-[18px] border border-sage">
            <label className="flex flex-col gap-0.5 border-r border-sage px-3.5 py-2.5">
              <span className="field-label text-[10px]">Заезд</span>
              <input
                type="date"
                value={from}
                max={to || undefined}
                onChange={(e) => update({ from: e.target.value })}
                className="min-w-0 border-0 bg-transparent text-sm font-semibold text-forest outline-none"
              />
            </label>
            <label className="flex flex-col gap-0.5 px-3.5 py-2.5">
              <span className="field-label text-[10px]">Выезд</span>
              <input
                type="date"
                value={to}
                min={from || undefined}
                onChange={(e) => update({ to: e.target.value })}
                className="min-w-0 border-0 bg-transparent text-sm font-semibold text-forest outline-none"
              />
            </label>
            <div className="col-span-2 flex items-center justify-between border-t border-sage px-3.5 py-2.5">
              <span className="text-sm font-semibold">Гости: {guests}</span>
              <GuestsStepper size={28} />
            </div>
          </div>
          {guestsOver && <div className="mt-2.5 text-[13px] text-danger">Максимум гостей: {stay.cap}</div>}
          {nights > 0 && (
            <div className="mt-5 flex flex-col gap-2.5 text-[15px]">
              <div className="flex justify-between">
                <span>
                  {fmt(stay.price)} × {nights} {plural(nights, "ночь", "ночи", "ночей")}
                </span>
                <span>{fmt(subtotal)} сом</span>
              </div>
              <div className="flex justify-between">
                <span>Сервисный сбор</span>
                <span>{fmt(fee)} сом</span>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-[17px] font-bold">
                <span>Итого</span>
                <span>{fmt(total)} сом</span>
              </div>
            </div>
          )}
          <button type="button" disabled={!canBook} onClick={() => setStep(1)} className={`${primary} mt-5`}>
            Забронировать
          </button>
          <div className="mt-2.5 text-center text-xs text-moss">Пока вы ничего не платите</div>
        </>
      )}

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canConfirm) setStep(2);
          }}
        >
          <div className="text-xs font-bold tracking-[.14em] text-teal uppercase">Шаг 2 из 3</div>
          <div className="mt-1.5 mb-4 font-serif text-[28px]">Ваши данные</div>
          <div className="mb-4 text-sm text-moss">
            {fmtDate(from)} — {fmtDate(to)} · {guests} {plural(guests, "гость", "гостя", "гостей")} · {fmt(total)} сом
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" autoComplete="name" className={`${input} mb-2.5`} />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Телефон"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={input}
          />
          <button type="submit" disabled={!canConfirm} className={`${primary} mt-[18px]`}>
            Подтвердить бронь
          </button>
          <button type="button" onClick={() => setStep(0)} className="mx-auto mt-3 block cursor-pointer text-sm font-semibold text-teal">
            Назад
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="py-3 text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-teal text-[30px] text-cream">✓</div>
          <div className="font-serif text-[30px] leading-[1.1]">Вас ждут, {name.trim()}</div>
          <p className="mt-3 mb-5 text-[15px] leading-relaxed text-moss">
            Бронь «{stay.name}» на {nights} {plural(nights, "ночь", "ночи", "ночей")} отправлена хозяину. Он свяжется с вами по номеру {phone}.
          </p>
          <button
            type="button"
            onClick={() => {
              setName("");
              setPhone("");
              router.push("/");
              window.scrollTo({ top: 0 });
            }}
            className="cursor-pointer rounded-full border border-forest px-[26px] py-3.5 font-bold hover:bg-sand"
          >
            Смотреть другое жильё
          </button>
        </div>
      )}
    </aside>
  );
}
