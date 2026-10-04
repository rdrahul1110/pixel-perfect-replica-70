import { useEffect, useState } from "react";

export function useCountdown(start: number, reset = 90) {
  const [s, setS] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v <= 0 ? reset : v - 1)), 1000);
    return () => clearInterval(t);
  }, [reset]);
  return s;
}

export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function Avatar({ initials, size = 36 }: { initials: string; size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full bg-gold font-bold text-navy-deep ring-2 ring-navy"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

export function LiveDot() {
  return <span className="pulse-dot inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-success" />;
}

export function PodGlyph() {
  return (
    <g>
      <circle r="11" className="fill-gold" />
      <rect x="-6" y="-4" width="12" height="7" rx="2.5" className="fill-navy-deep" />
      <circle cx="-3.5" cy="4.5" r="1.6" className="fill-navy-deep" />
      <circle cx="3.5" cy="4.5" r="1.6" className="fill-navy-deep" />
    </g>
  );
}

export function GoldButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-4 font-bold text-navy-deep transition active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}
