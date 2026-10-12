import { Hero } from "@/components/home/Hero";
import { Stays } from "@/components/home/Stays";
import { Regions } from "@/components/home/Regions";
import { YurtBanner } from "@/components/home/YurtBanner";
import { Hospitality } from "@/components/home/Hospitality";
import { Experiences } from "@/components/home/Experiences";

export default function Home() {
  return (
    <>
      <Hero />
      <Stays />
      <Regions />
      <YurtBanner />
      <Hospitality />
      <Experiences />
    </>
  );
}
