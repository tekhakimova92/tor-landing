import { PRESETS, formatHistory, parsePeriod, periodRange, presetPeriod, type BookingRow, type Period } from "@/lib/history";
import { tg } from "@/lib/telegram";

const LIMIT = 300;

const MENU = {
  inline_keyboard: [
    PRESETS.slice(0, 3).map((p) => ({ text: p.label, callback_data: `h:${p.key}` })),
    PRESETS.slice(3).map((p) => ({ text: p.label, callback_data: `h:${p.key}` })),
    [{ text: "Свой период", callback_data: "h:custom" }],
  ],
};

const CUSTOM_HINT = "Пришлите даты сообщением, например:\n01.10.2026 — 14.10.2026\n\nМожно одну дату (05.10) или без года (1.10-14.10).";

type Update = {
  message?: { chat: { id: number }; text?: string };
  callback_query?: { id: string; data?: string; message?: { chat: { id: number } } };
};

// Вебхук Telegram-бота: история заявок за выбранный период. Отвечает только в чате владельца.
export async function POST(req: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return new Response("forbidden", { status: 403 });
  }

  const update = (await req.json().catch(() => null)) as Update | null;
  try {
    if (update) await handle(update);
  } catch (e) {
    console.error("telegram webhook:", e);
  }
  // Telegram повторяет запрос, пока не получит 200, поэтому отвечаем «ok» даже при ошибке.
  return new Response("ok");
}

async function handle(update: Update) {
  const owner = process.env.TELEGRAM_CHAT_ID;

  const cq = update.callback_query;
  if (cq) {
    await tg("answerCallbackQuery", { callback_query_id: cq.id });
    const chatId = cq.message?.chat.id;
    if (!chatId || String(chatId) !== owner) return;
    const key = cq.data?.replace(/^h:/, "") ?? "";
    if (key === "custom") return void (await tg("sendMessage", { chat_id: chatId, text: CUSTOM_HINT }));
    const period = presetPeriod(key);
    if (period) await sendHistory(chatId, period);
    return;
  }

  const msg = update.message;
  if (!msg?.text || String(msg.chat.id) !== owner) return;
  const text = msg.text.trim();

  if (/^\/(start|history|menu)(@\w+)?\b/i.test(text) || /^истори/i.test(text)) {
    await tg("sendMessage", { chat_id: msg.chat.id, text: "За какой период показать заявки?", reply_markup: MENU });
    return;
  }

  const parsed = parsePeriod(text);
  if (parsed && "error" in parsed) {
    await tg("sendMessage", { chat_id: msg.chat.id, text: `${parsed.error}\n\n${CUSTOM_HINT}` });
  } else if (parsed) {
    await sendHistory(msg.chat.id, parsed);
  } else {
    await tg("sendMessage", { chat_id: msg.chat.id, text: "Чтобы посмотреть заявки, выберите период:", reply_markup: MENU });
  }
}

async function sendHistory(chatId: number, period: Period) {
  const rows = await fetchBookings(period);
  if (!rows) {
    await tg("sendMessage", { chat_id: chatId, text: "Не удалось получить заявки из базы. Попробуйте позже." });
    return;
  }
  const chunks = formatHistory(rows.slice(0, LIMIT), period, rows.length > LIMIT);
  for (const [i, text] of chunks.entries()) {
    await tg("sendMessage", { chat_id: chatId, text, ...(i === chunks.length - 1 ? { reply_markup: MENU } : {}) });
  }
}

async function fetchBookings(period: Period): Promise<BookingRow[] | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error("fetchBookings: SUPABASE_URL или SUPABASE_SECRET_KEY не заданы");
    return null;
  }
  const { gte, lt } = periodRange(period);
  const query = new URLSearchParams({ select: "*", order: "created_at.asc", limit: String(LIMIT + 1) });
  query.append("created_at", `gte.${gte}`);
  query.append("created_at", `lt.${lt}`);
  try {
    const res = await fetch(`${url}/rest/v1/bookings?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("fetchBookings: Supabase ответил", res.status, await res.text());
      return null;
    }
    return (await res.json()) as BookingRow[];
  } catch (e) {
    console.error("fetchBookings:", e);
    return null;
  }
}
