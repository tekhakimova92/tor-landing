-- Заявки на бронь с сайта
create table if not exists public.bookings (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  stay_id    integer not null,
  stay_name  text not null,
  check_in   date not null,
  check_out  date not null,
  nights     integer not null check (nights > 0),
  guests     integer not null check (guests > 0),
  total      numeric(12, 2) not null,
  name       text not null,
  phone      text not null,
  status     text not null default 'new' check (status in ('new', 'confirmed', 'cancelled'))
);

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

-- Политик нет: с таблицей работает только сервер сайта по секретному ключу,
-- из браузера по публичному ключу её не прочитать и не изменить.
alter table public.bookings enable row level security;
