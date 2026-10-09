"use client";

import { usePathname, useRouter } from "next/navigation";
import { useStore } from "./StoreProvider";

export function useNavActions() {
  const { update, goTo, favs, onlyFav } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const home = () => {
    if (pathname !== "/") router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const regions = () => goTo("regions");
  const stays = () => {
    update({ onlyFav: false });
    goTo("stays");
  };
  const yurts = () => {
    update({ cat: "yurt", onlyFav: false });
    goTo("stays");
  };
  const experiences = () => goTo("exp");
  const favorites = () => {
    update({ onlyFav: true, cat: "all", type: "all", region: "Весь Кыргызстан" });
    goTo("stays");
  };

  return { home, regions, stays, yurts, experiences, favorites, favCount: favs.length, onlyFav, isHome: pathname === "/" };
}
