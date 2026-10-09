export const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const fmtRating = (r: number) => r.toFixed(2).replace(/0$/, "").replace(".", ",");

export function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

const dateFmt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" });

export const fmtDate = (iso: string) => (iso ? dateFmt.format(new Date(iso + "T00:00:00")) : "—");

export function isoDate(daysFromToday: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function nightsBetween(from: string, to: string) {
  if (!from || !to) return 0;
  const n = Math.round((new Date(to).getTime() - new Date(from).getTime()) / 864e5);
  return Number.isFinite(n) && n > 0 ? n : 0;
}
