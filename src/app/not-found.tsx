import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section pt-40 pb-20 text-center">
      <h1 className="m-0 font-display text-[44px] font-medium tracking-[-.03em] md:text-[64px]">Такого места нет</h1>
      <p className="mt-3 mb-8 text-moss">Возможно, жильё сняли с публикации или ссылка неточная.</p>
      <Link href="/" className="inline-block rounded-full bg-forest px-6 py-3.5 font-bold text-cream no-underline hover:bg-teal hover:text-cream">
        На главную
      </Link>
    </section>
  );
}
