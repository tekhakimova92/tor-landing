"use client";

import { useStore } from "@/components/StoreProvider";
import { HeartIcon } from "./HeartIcon";

export function FavButton({ id, className = "" }: { id: number; className?: string }) {
  const { favs, toggleFav } = useStore();
  const fav = favs.includes(id);
  return (
    <button
      type="button"
      aria-label={fav ? "Убрать из избранного" : "В избранное"}
      aria-pressed={fav}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFav(id);
      }}
      className={`grid size-10 cursor-pointer place-items-center rounded-full transition-transform duration-200 hover:scale-110 ${className}`}
    >
      <HeartIcon filled={fav} size={19} />
    </button>
  );
}
