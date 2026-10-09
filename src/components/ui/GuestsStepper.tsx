"use client";

import { MAX_GUESTS } from "@/data/catalog";
import { useStore } from "@/components/StoreProvider";

const btn =
  "grid cursor-pointer place-items-center rounded-full border border-sage leading-none hover:bg-sand disabled:cursor-default disabled:opacity-40";

// Кнопки −/+ для числа гостей; showValue ставит значение между ними.
export function GuestsStepper({ showValue = false, size = 26 }: { showValue?: boolean; size?: number }) {
  const { guests, update } = useStore();
  const style = { width: size, height: size };
  return (
    <span className={`flex items-center ${showValue ? "gap-3.5" : "gap-2.5"}`}>
      <button type="button" aria-label="Меньше гостей" className={btn} style={style} disabled={guests <= 1} onClick={() => update({ guests: guests - 1 })}>
        −
      </button>
      {showValue && <span className="min-w-4 text-center text-base font-semibold">{guests}</span>}
      <button type="button" aria-label="Больше гостей" className={btn} style={style} disabled={guests >= MAX_GUESTS} onClick={() => update({ guests: guests + 1 })}>
        +
      </button>
    </span>
  );
}
