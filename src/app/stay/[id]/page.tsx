import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STAYS, getStay } from "@/data/catalog";
import { StayDetail } from "@/components/stay/StayDetail";

export function generateStaticParams() {
  return STAYS.map((s) => ({ id: String(s.id) }));
}

export async function generateMetadata({ params }: PageProps<"/stay/[id]">): Promise<Metadata> {
  const stay = getStay(Number((await params).id));
  return stay ? { title: stay.name, description: stay.desc } : {};
}

export default async function StayPage({ params }: PageProps<"/stay/[id]">) {
  const stay = getStay(Number((await params).id));
  if (!stay) notFound();
  return <StayDetail stay={stay} />;
}
