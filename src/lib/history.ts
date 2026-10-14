import { fmt, fmtDate, plural } from "@/lib/format";

// Кыргызстан живёт по UTC+6 круглый год, поэтому сутки считаем по Бишкеку.
const OFFSET_MS = 6 * 3600e3;
const MAX_DAYS = 366;

type Day = { y: number; m: number; d: number };
export type Period = { from: Day; to: Day };

export type BookingRow = {
  id: number;
  created_at: string;
  stay_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests: number;
  total: number;
  name: string;
  phone: string;
  status: "new" | "confirmed" | "cancelled";
};

const STATUS: Record<BookingRow["status"], string> = { new: "новая", confirmed: "подтверждена", cancelled: "отменена" };

const pad = (n: number) => String(n).padStart(2, "0");
const toUtc = (day: Day) => Date.UTC(day.y, day.m - 1, day.d) - OFFSET_MS;

function dayOf(ms: number): Day {
  const t = new Date(ms + OFFSET_MS);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

const addDays = (day: Day, n: number) => dayOf(toUtc(day) + n * 864e5);
const fmtDay = (day: Day) => `${pad(day.d)}.${pad(day.m)}.${day.y}`;
const daysBetween = (a: Day, b: Day) => Math.round((toUtc(b) - toUtc(a)) / 864e5);

export const PRESETS = [
  { key: "today", label: "Сегодня" },
  { key: "7", label: "7 дней" },
  { key: "30", label: "30 дней" },
  { key: "month", label: "Этот месяц" },
  { key: "prev", label: "Прошлый месяц" },
] as const;

export function presetPeriod(key: string, now = Date.now()): Period | null {
  const today = dayOf(now);
  switch (key) {
    case "today":
      return { from: today, to: today };
    case "7":
      return { from: addDays(today, -6), to: today };
    case "30":
      return { from: addDays(today, -29), to: today };
    case "month":
      return { from: { ...today, d: 1 }, to: today };
    case "prev": {
      const lastOfPrev = addDays({ ...today, d: 1 }, -1);
      return { from: { ...lastOfPrev, d: 1 }, to: lastOfPrev };
    }
  }
  return null;
}

// Свой период: «01.10.2026 — 14.10.2026», «1.10-14.10», «05.10.26». Год по умолчанию — текущий.
export function parsePeriod(text: string, now = Date.now()): Period | { error: string } | null {
  const year = dayOf(now).y;
  const days: Day[] = [];
  for (const [, d, m, y] of text.matchAll(/(\d{1,2})\.(\d{1,2})(?:\.(\d{4}|\d{2}))?(?!\d)/g)) {
    const day = { y: y ? (y.length === 2 ? 2000 + Number(y) : Number(y)) : year, m: Number(m), d: Number(d) };
    const check = dayOf(toUtc(day));
    if (check.y !== day.y || check.m !== day.m || check.d !== day.d) return { error: `Такой даты нет: ${d}.${m}${y ? "." + y : ""}` };
    days.push(day);
  }
  if (days.length === 0) return null;
  let [from, to] = [days[0], days[1] ?? days[0]];
  if (toUtc(to) < toUtc(from)) [from, to] = [to, from];
  if (daysBetween(from, to) >= MAX_DAYS) return { error: "Период слишком длинный: максимум год." };
  return { from, to };
}

// Границы периода в UTC для запроса к базе: [начало первого дня, начало дня после последнего).
export const periodRange = (p: Period) => ({
  gte: new Date(toUtc(p.from)).toISOString(),
  lt: new Date(toUtc(addDays(p.to, 1))).toISOString(),
});

export const periodLabel = (p: Period) =>
  daysBetween(p.from, p.to) === 0 ? fmtDay(p.from) : `${fmtDay(p.from)} — ${fmtDay(p.to)}`;

function formatRow(b: BookingRow) {
  const created = dayOf(Date.parse(b.created_at));
  const time = new Date(Date.parse(b.created_at) + OFFSET_MS);
  return [
    `№${b.id} · ${pad(created.d)}.${pad(created.m)}, ${pad(time.getUTCHours())}:${pad(time.getUTCMinutes())} · ${STATUS[b.status] ?? b.status}`,
    b.stay_name,
    `${fmtDate(b.check_in)} — ${fmtDate(b.check_out)}, ${b.nights} ${plural(b.nights, "ночь", "ночи", "ночей")} · ${b.guests} ${plural(b.guests, "гость", "гостя", "гостей")}`,
    `${fmt(Number(b.total))} сом`,
    `${b.name} · ${b.phone}`,
  ].join("\n");
}

// Текст ответа, разбитый на сообщения до ~3500 символов (лимит Telegram — 4096).
export function formatHistory(rows: BookingRow[], p: Period, truncated: boolean): string[] {
  const title = `📋 Заявки за ${periodLabel(p)}`;
  if (rows.length === 0) return [`${title}\n\nЗаявок нет.`];

  const active = rows.filter((b) => b.status !== "cancelled");
  const sum = active.reduce((s, b) => s + Number(b.total), 0);
  const cancelled = rows.length - active.length;
  const summary = [
    title,
    `Всего: ${rows.length} ${plural(rows.length, "заявка", "заявки", "заявок")}${cancelled ? `, из них отменено: ${cancelled}` : ""}`,
    `Сумма${cancelled ? " без отменённых" : ""}: ${fmt(sum)} сом`,
    truncated ? `Показаны первые ${rows.length}, выберите период короче.` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const chunks = [summary];
  let cur = "";
  for (const row of rows.map(formatRow)) {
    if (cur && cur.length + row.length + 2 > 3500) {
      chunks.push(cur);
      cur = "";
    }
    cur += (cur ? "\n\n" : "") + row;
  }
  chunks.push(cur);
  return chunks;
}
