// Вызов метода Telegram Bot API. Возвращает false, если бот не настроен или Telegram ответил ошибкой.
export async function tg(method: string, body: Record<string, unknown>): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error(`tg ${method}: TELEGRAM_BOT_TOKEN не задан`);
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`tg ${method}: Telegram ответил`, res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error(`tg ${method}:`, e);
    return false;
  }
}
