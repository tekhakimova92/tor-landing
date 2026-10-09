export function HeartIcon({ filled, size = 20 }: { filled: boolean; size?: number }) {
  const color = filled ? "var(--color-rose)" : "var(--color-forest)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" aria-hidden>
      <path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2 0 3.6 1.1 5.4 3.1 1.8-2 3.4-3.1 5.4-3.1 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}
