import Image from "next/image";

type Props = {
  bg: string;
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

// Фото на градиентной подложке: пока src не задан, видна только подложка.
export function Photo({ bg, src, alt, className = "", sizes = "100vw", priority }: Props) {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ background: bg }}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />}
    </div>
  );
}
