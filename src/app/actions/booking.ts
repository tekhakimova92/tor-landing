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

// Заявка сохраняется в Supabase и уходит в Telegram. Цену пересчитываем по каталогу, а не берём из браузера.
export async function sendBooking(req: BookingRequest): Promise<BookingResult> {
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

  const [saved, notified] = await Promise.all([
    saveBooking({
      stay_id: stay.id,
      stay_name: stay.name,
      check_in: req.from,
      check_out: req.to,
      nights,
      guests,
      total,
      name,
      phone,
    }),
    notifyTelegram(text),
  ]);

  // Заявка принята, если её получил хотя бы один канал.
  if (!saved && !notified) {
    return { ok: false, error: "Не удалось отправить заявку. Попробуйте ещё раз." };
  }
  return { ok: true };
}

async function saveBooking(row: Record<string, string | number>): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error("saveBooking: SUPABASE_URL или SUPABASE_SECRET_KEY не заданы");
    return false;
  }
  try {
    const res = await fetch(`${url}/rest/v1/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}`, Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error("saveBooking: Supabase ответил", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("saveBooking:", e);
    return false;
  }
}

async function notifyTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("notifyTelegram: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      console.error("notifyTelegram: Telegram ответил", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("notifyTelegram:", e);
    return false;
  }
}
