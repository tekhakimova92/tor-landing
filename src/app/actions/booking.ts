"use server";

import { SERVICE_FEE, TYPE_LABELS, getStay } from "@/data/catalog";
import { fmt, fmtDate, nightsBetween, plural } from "@/lib/format";

export type BookingRequest = {
  stayId: number;
  from: string;
  to: string;
  guests: number;
  name: string;
  phone: string;
};

export type BookingResult = { ok: true } | { ok: false; error: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Заявка уходит в Telegram. Цену пересчитываем по каталогу, а не берём из браузера.
export async function sendBooking(req: BookingRequest): Promise<BookingResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("sendBooking: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");
    return { ok: false, error: "Заявки временно не принимаются. Попробуйте позже." };
  }

  const stay = getStay(Number(req.stayId));
  const name = String(req.name ?? "").trim().slice(0, 80);
  const phone = String(req.phone ?? "").trim().slice(0, 30);
  const guests = Math.floor(Number(req.guests));
  const nights = ISO_DATE.test(req.from) && ISO_DATE.test(req.to) ? nightsBetween(req.from, req.to) : 0;

  if (!stay || !name || phone.replace(/\D/g, "").length < 6 || nights < 1 || nights > 60 || !(guests >= 1 && guests <= stay.cap)) {
    return { ok: false, error: "Проверьте даты, число гостей и контакты." };
  }

  const subtotal = stay.price * nights;
  const total = subtotal + subtotal * SERVICE_FEE;
  const text = [
    "🏡 Новая заявка на бронь",
    "",
    `${stay.name} (${TYPE_LABELS[stay.type]}, ${stay.loc})`,
    `${fmtDate(req.from)} — ${fmtDate(req.to)}, ${nights} ${plural(nights, "ночь", "ночи", "ночей")}`,
    `Гостей: ${guests}`,
    `Сумма: ${fmt(total)} сом (с сервисным сбором)`,
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      console.error("sendBooking: Telegram ответил", res.status, await res.text());
      return { ok: false, error: "Не удалось отправить заявку. Попробуйте ещё раз." };
    }
  } catch (e) {
    console.error("sendBooking:", e);
    return { ok: false, error: "Не удалось отправить заявку. Попробуйте ещё раз." };
  }

  return { ok: true };
}
