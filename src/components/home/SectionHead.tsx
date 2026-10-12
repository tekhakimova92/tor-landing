export function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 md:mb-10">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h-section mt-4">{title}</h2>
      </div>
      {text && <p className="m-0 max-w-[420px] text-[15px] leading-relaxed text-moss">{text}</p>}
    </div>
  );
}
