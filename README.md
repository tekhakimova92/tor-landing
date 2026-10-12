# TÖR — бронирование жилья по Кыргызстану

Лендинг сервиса бронирования юрт, гостевых домов, отелей и домов по всему Кыргызстану.

Сайт: https://tor-landing.vercel.app — обновляется автоматически при каждом пуше в `main` (Vercel).

## Стек

- [Next.js 16](https://nextjs.org) (App Router, Cache Components)
- React 19, TypeScript
- Tailwind CSS 4
- Шрифты: Manrope (текст) и Jost (заголовки), обе с кириллицей
- Иконки: [lucide-react](https://lucide.dev)

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # продакшн-сборка
npm run lint
```

## Структура

```
src/
  app/                  маршруты: главная, /stay/[id], 404
  components/
    home/               секции главной страницы (Hero, Stays, Regions, ...)
    stay/               страница объекта и форма брони
    ui/                 мелкие общие компоненты
    StoreProvider.tsx   общее состояние поиска, фильтров и избранного
  data/catalog.ts       демо-данные: жильё, регионы, категории, впечатления
  lib/                  форматирование, избранное (localStorage)
```

## Фото

Фото лежат в `public/images` (с [Unsplash](https://unsplash.com/license), авторы перечислены в `public/images/CREDITS.md`).
Это временные иллюстрации: чтобы поставить реальные фото объекта, замените файл с тем же именем
или поменяйте путь в `src/data/catalog.ts`. Если файла нет, на его месте показывается градиент.

## Статус

Демо-версия: данные статичные, бронь никуда не отправляется, «Войти» и «Разместить жильё» — заглушки.
