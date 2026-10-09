import React, { useEffect, useState } from "react";
import { Train, ShieldCheck, Zap } from "lucide-react";

export function useCountdown(start: number, reset = 90) {
  const [s, setS] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v <= 0 ? reset : v - 1)), 1000);
    return () => clearInterval(t);
  }, [reset]);
  return s;
}

export const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function Avatar({
  initials,
  size = 38,
  verified = false,
}: {
  initials: string;
  size?: number;
  verified?: boolean;
}) {
  return (
    <div className="relative shrink-0 inline-block">
      <div
        className="grid place-items-center rounded-full font-bold text-navy-deep shadow-md transition-transform"
        style={{
          width: size,
          height: size,
          fontSize: Math.max(10, size * 0.38),
          background: "linear-gradient(135deg, #ffe066 0%, #ffca28 50%, #f59e0b 100%)",
          boxShadow: "0 0 14px rgba(255, 208, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          border: "1.5px solid rgba(255, 255, 255, 0.25)",
        }}
      >
        {initials}
      </div>
      {verified && (
        <span
          className="absolute -bottom-0.5 -right-0.5 grid place-items-center rounded-full bg-success text-navy-deep ring-2 ring-navy-deep shadow-sm"
          style={{ width: Math.max(13, size * 0.38), height: Math.max(13, size * 0.38) }}
        >
          <ShieldCheck size={Math.max(9, size * 0.28)} strokeWidth={3} />
        </span>
      )}
    </div>
  );
}

export function LiveDot({ color = "success" }: { color?: "success" | "gold" | "danger" | "purple" }) {
  const colorMap = {
    success: "bg-success shadow-[0_0_8px_#00f59b]",
    gold: "bg-gold shadow-[0_0_8px_#ffd200]",
    danger: "bg-danger shadow-[0_0_8px_#ef4444]",
    purple: "bg-metro shadow-[0_0_8px_#a855f7]",
  };

  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
      <span className={`pulse-dot absolute inline-flex h-full w-full rounded-full opacity-75 ${colorMap[color]}`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colorMap[color]}`} />
    </span>
  );
}

export function PodGlyph() {
  return (
    <g>
      {/* Outer ambient glow */}
      <circle r="13" fill="rgba(255, 208, 0, 0.15)" />
      {/* Aerodynamic pod body */}
      <rect x="-8.5" y="-5.5" width="17" height="11" rx="4.5" fill="#ffd000" stroke="#fff" strokeWidth="0.8" />
      {/* Panoramic tinted glass canopy */}
      <rect x="-5.5" y="-3.5" width="11" height="7" rx="2.5" fill="#0b111e" />
      {/* Top LiDAR sensor dome */}
      <circle cx="0" cy="-5.5" r="1.4" fill="#00f59b" />
      {/* Headlight beam indicator */}
      <rect x="7" y="-2" width="2.5" height="4" rx="1" fill="#fff" opacity="0.9" />
      {/* Wheels */}
      <circle cx="-5" cy="5.2" r="1.5" fill="#070b12" stroke="#ffd000" strokeWidth="0.5" />
      <circle cx="5" cy="5.2" r="1.5" fill="#070b12" stroke="#ffd000" strokeWidth="0.5" />
    </g>
  );
}

export function GoldButton({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-4 font-bold text-navy-deep transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${className}`}
      style={{
        background: "linear-gradient(135deg, #ffe066 0%, #ffd200 45%, #f59e0b 100%)",
        boxShadow: "0 8px 24px -4px rgba(255, 208, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
      }}
    >
      <div className="shimmer pointer-events-none absolute -top-8 left-0 h-[220%] w-14 bg-white/40 blur-sm" />
      {children}
    </button>
  );
}

export function VoltButton({
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
      className={`group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-4 font-bold text-navy-deep transition-all duration-200 active:scale-[0.98] ${className}`}
      style={{
        background: "linear-gradient(135deg, #5effb7 0%, #00f59b 45%, #059669 100%)",
        boxShadow: "0 8px 24px -4px rgba(0, 245, 155, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
      }}
    >
      <div className="shimmer pointer-events-none absolute -top-8 left-0 h-[220%] w-14 bg-white/40 blur-sm" />
      {children}
    </button>
  );
}

export function MetroSyncBadge({
  departsIn = "05:40",
  podEta = "02:40",
  bufferMins = 3,
}: {
  departsIn?: string;
  podEta?: string;
  bufferMins?: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-[#170e2b] via-[#120d24] to-[#0d1322] p-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600 font-extrabold text-[11px] text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            M
          </span>
          <div className="leading-tight">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
              Purple Line Sync
            </span>
            <p className="text-xs font-semibold text-white/90">Indiranagar Metro • Platform 2</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2.5 py-0.5 text-[10px] font-bold text-success ring-1 ring-success/30">
          <Zap size={11} className="fill-success" /> +{bufferMins}m Buffer
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-white/5 pt-2 text-xs">
        <div className="rounded-xl bg-white/[0.03] p-2 text-center">
          <span className="text-[10px] uppercase text-muted-foreground">Train Departure</span>
          <p className="font-extrabold tabular-nums text-purple-400 text-sm">{departsIn}</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-2 text-center">
          <span className="text-[10px] uppercase text-muted-foreground">Pod Arrival ETA</span>
          <p className="font-extrabold tabular-nums text-gold text-sm">{podEta}</p>
        </div>
      </div>
    </div>
  );
}
