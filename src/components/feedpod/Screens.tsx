import { useEffect, useState } from "react";
import {
  Bell,
  Zap,
  Train,
  Lock,
  Unlock,
  CheckCircle2,
  Footprints,
  Users,
  Timer,
  ShieldCheck,
  Shield,
  Snowflake,
  Lightbulb,
  VolumeX,
  Gauge,
  Star,
  Share2,
  Leaf,
  Wallet,
  Clock,
  Flame,
  Gift,
  MapPin,
  ChevronRight,
  X,
  BadgeCheck,
  MessageCircle,
  Linkedin,
  Twitter,
  ArrowRight,
  Sparkles,
  Radio,
  Sliders,
  Check,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  Avatar,
  GoldButton,
  VoltButton,
  LiveDot,
  PodGlyph,
  fmt,
  useCountdown,
  MetroSyncBadge,
} from "./shared";

export type Screen = "home" | "pass" | "ride" | "arrived" | "dashboard" | "profile";
type Go = (s: Screen) => void;

/* =========================================================================
   SCREEN 1: HOME (COMMUTER DASHBOARD & RADAR HUD)
   ========================================================================= */
const LOOP =
  "M60,140 C60,60 140,40 200,50 C280,60 320,100 310,150 C300,210 220,230 160,220 C90,212 60,190 60,140 Z";

export function Home({ go }: { go: Go }) {
  const s = useCountdown(75);

  return (
    <div className="space-y-4">
      {/* Top Greeting Header */}
      <header className="flex items-center justify-between pt-1">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wide">
            <Sparkles size={12} className="fill-amber-400" />
            <span>MOVEOS 4.2 ACTIVE</span>
          </div>
          <h1 className="truncate text-2xl font-black tracking-tight text-white">
            Good Morning, Priya 👋
          </h1>
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin size={11} className="text-emerald-400" />
            <span>Green Glen Layout • Society Gate 2</span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <button className="relative grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/80 backdrop-blur-md transition-all hover:bg-white/10 active:scale-95">
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#ffd200]" />
          </button>
          <div onClick={() => go("profile")} className="cursor-pointer">
            <Avatar initials="PS" size={42} verified={true} />
          </div>
        </div>
      </header>

      {/* Autonomous Feeder Radar Map HUD */}
      <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0a0f1d] shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
        {/* Top Radar Status Pill */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1 backdrop-blur-md text-[10px] font-bold text-white/90">
          <LiveDot color="success" />
          <span>AUTONOMOUS FEEDER LOOP</span>
          <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[9px] text-amber-300">90s Frequency</span>
        </div>

        {/* SVG Navigation Map */}
        <svg viewBox="0 0 370 240" className="block w-full">
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0a0f1d" stopOpacity="1" />
            </radialGradient>
            <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffd200" floodOpacity="0.8" />
            </filter>
            <filter id="glowMetro" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#a855f7" floodOpacity="0.8" />
            </filter>
          </defs>

          <rect width="370" height="240" fill="url(#mapGlow)" />

          {/* Grid lines representing tech layout */}
          {[40, 95, 150, 205].map((y) => (
            <line key={y} x1="0" x2="370" y1={y} y2={y} stroke="#172033" strokeWidth="1.5" strokeDasharray="3 6" />
          ))}
          {[40, 120, 200, 280, 340].map((x) => (
            <line key={x} y1="0" y2="240" x1={x} x2={x} stroke="#172033" strokeWidth="1.5" strokeDasharray="3 6" />
          ))}

          {/* Radar ripple rings at Society Gate */}
          <circle cx="60" cy="140" r="14" fill="none" stroke="#00f59b" strokeWidth="1.5" opacity="0.6" className="radar-ripple" />
          <circle cx="60" cy="140" r="24" fill="none" stroke="#00f59b" strokeWidth="1" opacity="0.3" className="radar-ripple" style={{ animationDelay: "1s" }} />

          {/* Feeder Loop Pathway */}
          <path d={LOOP} fill="none" stroke="#25334d" strokeWidth="6" strokeLinecap="round" />
          <path d={LOOP} fill="none" stroke="#ffd200" strokeWidth="2.5" strokeDasharray="4 8" strokeLinecap="round" filter="url(#glowGold)" />

          {/* Society Gate 2 Stop */}
          <g transform="translate(60,140)">
            <circle r="8" fill="#00f59b" />
            <circle r="4" fill="#070b12" />
            <rect x="12" y="-10" width="85" height="20" rx="6" fill="#070b12" stroke="#00f59b" strokeWidth="1" />
            <text x="18" y="4" fill="#ffffff" fontSize="9" fontWeight="700">Society Gate 2</text>
          </g>

          {/* Indiranagar Metro Purple Line Stop */}
          <g transform="translate(305,150)">
            <circle r="12" fill="#a855f7" filter="url(#glowMetro)" />
            <text x="-4.5" y="4.5" fill="#ffffff" fontSize="11" fontWeight="900">M</text>
            <rect x="-105" y="16" width="112" height="20" rx="6" fill="#070b12" stroke="#a855f7" strokeWidth="1" />
            <text x="-100" y="30" fill="#ffffff" fontSize="8.5" fontWeight="700">Indiranagar Metro (P2)</text>
          </g>

          {/* Moving Ola Autonomous Pod */}
          <g>
            <PodGlyph />
            <animateMotion dur="8.5s" repeatCount="indefinite" path={LOOP} rotate="auto" />
          </g>
        </svg>

        {/* Bottom map overlay telemetry */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#0d1424]/90 px-4 py-2 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Radio size={12} className="animate-pulse" /> 8 Pods Live in Feeder Lane
          </span>
          <span className="text-white/60 font-mono">Speed Avg: 28 km/h</span>
        </div>
      </div>

      {/* Hero Next Pod Countdown Card */}
      <div className="relative overflow-hidden rounded-[26px] border border-amber-500/30 bg-gradient-to-br from-[#1c1608] via-[#12111c] to-[#0a0f1d] p-5 shadow-[0_16px_40px_rgba(255,208,0,0.12)]">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/15 blur-2xl" />

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
            <Zap size={12} className="fill-amber-400" /> Next Pod Approaching
          </span>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            2 Seats Available
          </span>
        </div>

        <div className="my-3 text-center">
          <p className="text-xs uppercase tracking-wider text-white/50 font-medium">Boarding at Society Gate 2 in</p>
          <div className="my-1 flex items-baseline justify-center gap-2">
            <span
              key={s}
              className="text-6xl font-black tracking-tight tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_0_20px_rgba(255,210,0,0.4)]"
            >
              {fmt(s)}
            </span>
            <span className="text-sm font-bold text-amber-400/80">mins</span>
          </div>
          <p className="text-xs text-white/70">
            Pod #KA-05-EP-402 • 2.8 km dedicated feeder corridor
          </p>
        </div>

        <GoldButton onClick={() => go("pass")}>
          <Zap size={18} className="fill-navy-deep" /> Get on Next Pod (Gate 2)
        </GoldButton>
      </div>

      {/* Multimodal Metro Sync Card */}
      <div className="glass p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Train size={14} /> Metro Multimodal Sync
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-extrabold text-emerald-400 ring-1 ring-emerald-500/30">
            Safe 3m Buffer ✅
          </span>
        </div>

        {/* Visual Trip Timeline */}
        <div className="my-2.5 flex items-center justify-between text-xs font-semibold">
          <div className="text-center">
            <p className="text-white">Society Gate</p>
            <p className="text-[10px] text-amber-400 font-mono">08:06 AM</p>
          </div>
          <div className="flex flex-1 items-center px-2">
            <div className="h-[2px] w-full bg-gradient-to-r from-amber-400 to-purple-400" />
            <ChevronRight size={14} className="text-purple-400 -ml-1.5" />
          </div>
          <div className="text-center">
            <p className="text-white">Metro Gate 2</p>
            <p className="text-[10px] text-emerald-400 font-mono">08:11 AM (5m)</p>
          </div>
          <div className="flex flex-1 items-center px-2">
            <div className="h-[2px] w-full bg-gradient-to-r from-purple-400 to-emerald-400" />
            <ChevronRight size={14} className="text-emerald-400 -ml-1.5" />
          </div>
          <div className="text-center">
            <p className="text-white">Purple Line</p>
            <p className="text-[10px] text-purple-400 font-mono">08:14 AM</p>
          </div>
        </div>

        <div className="rounded-xl border border-purple-500/20 bg-purple-950/30 p-2.5 text-xs text-purple-200">
          🚇 Purple Line departs Platform 2 at 8:14 AM. Your pod arrives 3 mins early so you won't rush.
        </div>
      </div>

      {/* Active Monthly Commute Pass Preview */}
      <button
        onClick={() => go("dashboard")}
        className="glass-card group block w-full p-4 text-left transition-all hover:border-amber-400/40 active:scale-[0.99]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <LiveDot color="success" /> Ola FeedPod Monthly Pass
          </div>
          <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
            View Details <ChevronRight size={12} />
          </span>
        </div>

        <div className="mt-2.5 flex items-baseline justify-between">
          <p className="text-xl font-black text-white">
            18 <span className="text-xs font-normal text-white/60">rides left of 30</span>
          </p>
          <span className="text-xs font-semibold text-emerald-400">₹1,847 Saved vs Cab</span>
        </div>

        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_8px_#ffd200]"
            style={{ width: "60%" }}
          />
        </div>

        <p className="mt-2 text-[11px] text-white/50">
          12 used this month • Auto-renews Dec 1 • ₹1,200/mo (₹40/ride)
        </p>
      </button>
    </div>
  );
}

/* =========================================================================
   SCREEN 2: BOARDING PASS & NFC DOOR UNLOCK
   ========================================================================= */
function QR() {
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < 441; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.5);
  }
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) =>
      x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    for (const [ox, oy] of [
      [0, 0],
      [14, 0],
      [0, 14],
    ] as [number, number][]) {
      if (inBox(ox, oy)) {
        const dx = x - ox,
          dy = y - oy;
        return dx === 0 ||
          dx === 6 ||
          dy === 0 ||
          dy === 6 ||
          (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4)
          ? 1
          : 0;
      }
    }
    return -1;
  };

  return (
    <svg viewBox="0 0 21 21" className="h-full w-full" shapeRendering="crispEdges">
      {cells.map((c, i) => {
        const x = i % 21,
          y = Math.floor(i / 21),
          f = finder(x, y);
        const on = f === -1 ? c : f === 1;
        return on ? (
          <rect key={i} x={x} y={y} width="1" height="1" fill="#080c14" />
        ) : null;
      })}
    </svg>
  );
}

export function BoardingPass({ go }: { go: Go }) {
  const s = useCountdown(80);
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="space-y-4">
      {/* Apple CarKey Style Digital Pass Card */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-b from-[#141b2c] via-[#0c121f] to-[#070b12] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Metallic Gold Top Foil */}
        <div
          className="p-5 text-navy-deep relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #ffe066 0%, #ffd200 50%, #f59e0b 100%)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.7)",
          }}
        >
          <div className="shimmer pointer-events-none absolute -top-8 left-0 h-[240%] w-16 bg-white/40 blur-sm" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-navy-deep/80">
              OLA DIGITAL KEY • MOVEOS 4
            </span>
            <span className="flex items-center gap-1 rounded-full bg-navy-deep/15 px-2 py-0.5 text-[10px] font-bold text-navy-deep">
              <Radio size={10} /> NFC READY
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-navy-deep">
            Pod #KA-05-EP-402
          </h2>
          <p className="text-xs font-semibold text-navy-deep/90">
            Society Gate 2 ➔ Indiranagar Metro (Purple Line)
          </p>
        </div>

        {/* QR & Contactless Reader Code */}
        <div className="p-5">
          <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <QR />
            {/* Animated Laser Scanline */}
            <div className="laser-scan pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#00f59b]" />
          </div>

          <p className="mt-3.5 text-center text-xs font-medium text-white/70">
            Hold phone against the door handle NFC reader or scan QR
          </p>
        </div>
      </div>

      {/* 3-Col Commuter Telemetry */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { i: <Timer size={18} />, t: fmt(s), l: "Pod Arrives", color: "text-amber-400" },
          { i: <Footprints size={18} />, t: "30 m", l: "Walk to Gate", color: "text-emerald-400" },
          { i: <Users size={18} />, t: "2 verified", l: "Boarding", color: "text-purple-400" },
        ].map((d) => (
          <div
            key={d.l}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md"
          >
            <div className={`flex justify-center ${d.color}`}>{d.i}</div>
            <p className="mt-1 font-black text-sm tabular-nums text-white">{d.t}</p>
            <p className="text-[10px] text-muted-foreground">{d.l}</p>
          </div>
        ))}
      </div>

      {/* Verified Co-Riders Strip */}
      <div className="glass flex items-center justify-between p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <Avatar initials="AK" size={32} verified={true} />
            <Avatar initials="RS" size={32} verified={true} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Amit K. & Ritu S.</p>
            <p className="text-[10px] text-white/50">Green Glen Layout Verified Commuters</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
          <ShieldCheck size={14} /> 100% Safe
        </span>
      </div>

      {/* Interactive NFC Door Unlock CTA */}
      {unlocked ? (
        <div className="space-y-2">
          <VoltButton onClick={() => go("ride")}>
            <CheckCircle2 size={20} className="fill-navy-deep" /> Door Unlocked — Step In! (KA-05-EP-402)
          </VoltButton>
          <p className="text-center text-xs font-medium text-emerald-400 animate-pulse">
            Doors open for 45s • Tap button to enter in-ride cabin mode
          </p>
        </div>
      ) : (
        <GoldButton onClick={() => setUnlocked(true)}>
          <Unlock size={18} className="fill-navy-deep" /> Tap to Unlock Pod Door (NFC)
        </GoldButton>
      )}

      {/* Hardware Safety Verification Badge */}
      <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Lock size={12} className="text-amber-400" />
        <span>MoveOS 4 Autonomous Safety • 24/7 CCTV & Live Ola SOS</span>
      </div>
    </div>
  );
}

/* =========================================================================
   SCREEN 3: IN-RIDE (CABIN HUD & METRO SYNC COUNTDOWN TIMER)
   ========================================================================= */
const LANE =
  "M30,200 C70,200 70,150 110,150 C150,150 140,90 190,90 C240,90 230,140 270,130 C300,122 300,60 330,50";

export function InRide({ go }: { go: Go }) {
  const [share, setShare] = useState(true);
  const [ctrl, setCtrl] = useState<Record<string, boolean>>({
    ac: true,
    light: true,
    quiet: false,
  });
  const [temp, setTemp] = useState(22);
  const metroCountdown = useCountdown(340); // 5m 40s live train countdown!

  return (
    <div className="space-y-4">
      {/* CRITICAL REQUESTED FEATURE: Real-Time Metro Platform Countdown Banner */}
      <div className="relative overflow-hidden rounded-[26px] border border-purple-500/30 bg-gradient-to-br from-[#200f38] via-[#120a22] to-[#0a0f1d] p-4 shadow-[0_12px_36px_rgba(168,85,247,0.2)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 font-black text-xs text-white shadow-[0_0_12px_rgba(168,85,247,0.8)]">
              M
            </span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-purple-300">
                NAMMA METRO PURPLE LINE
              </p>
              <p className="text-xs font-semibold text-white/90">Platform 2 • To MG Road / Majestic</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-black text-emerald-300 border border-emerald-500/30">
            Safe 3m Buffer ✅
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
          <div className="rounded-xl bg-black/40 p-2.5 text-center border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
              Train Departs In
            </span>
            <p className="text-2xl font-black tabular-nums text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              {fmt(metroCountdown)}
            </p>
          </div>
          <div className="rounded-xl bg-black/40 p-2.5 text-center border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Pod ETA to Metro
            </span>
            <p className="text-2xl font-black tabular-nums text-amber-400 drop-shadow-[0_0_10px_rgba(255,210,0,0.5)]">
              02:40
            </p>
          </div>
        </div>

        {/* Live Synchronized Buffer Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-white/60 mb-1">
            <span>Sync Buffer: Pod arrives 8:11 AM</span>
            <span>Train leaves 8:14 AM</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400"
              style={{ width: "70%" }}
            />
          </div>
        </div>
      </div>

      {/* Autonomous Green Corridor Route HUD */}
      <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#090d18] shadow-lg">
        <svg viewBox="0 0 360 210" className="block w-full">
          <defs>
            <filter id="laneGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffd200" floodOpacity="0.8" />
            </filter>
          </defs>

          <rect width="360" height="210" fill="#090d18" />

          {/* Dedicated lane boundaries */}
          {[50, 110, 170].map((y) => (
            <line key={y} x1="0" x2="360" y1={y} y2={y + 15} stroke="#151e30" strokeWidth="4" />
          ))}
          {[70, 150, 230, 310].map((x) => (
            <line key={x} y1="0" y2="210" x1={x} x2={x - 15} stroke="#151e30" strokeWidth="4" />
          ))}

          {/* Glowing Green Corridor Feeder Lane */}
          <path d={LANE} fill="none" stroke="#1f2d47" strokeWidth="8" strokeLinecap="round" />
          <path
            d={LANE}
            fill="none"
            stroke="#ffd200"
            strokeWidth="3"
            strokeDasharray="4 8"
            strokeLinecap="round"
            filter="url(#laneGlow)"
          />

          {/* Metro Destination Target */}
          <g transform="translate(330,50)">
            <circle r="14" fill="#a855f7" />
            <text x="-5.5" y="4.5" fill="#ffffff" fontSize="12" fontWeight="900">
              M
            </text>
          </g>

          {/* Moving Pod with headlights */}
          <g>
            <PodGlyph />
            <animateMotion dur="9s" repeatCount="indefinite" path={LANE} rotate="auto" />
          </g>
        </svg>

        {/* Live HUD Floating Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 backdrop-blur-md text-[11px] font-bold text-white">
          <LiveDot color="success" />
          <span>AUTONOMOUS GREEN CORRIDOR</span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-navy-deep shadow-lg">
          <Zap size={13} className="fill-navy-deep" /> Arriving in 2m 40s
        </div>
      </div>

      {/* Pod Telemetry Cockpit Strip */}
      <div className="glass p-3.5">
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span className="flex items-center gap-1.5">
            <LiveDot color="success" /> Pod #KA-05-EP-402
          </span>
          <span className="text-white/50 font-normal">Ola MoveOS 4.2</span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/[0.03] p-2">
            <Gauge size={16} className="mx-auto text-amber-400" />
            <p className="mt-1 font-black text-sm text-white">28 km/h</p>
            <p className="text-[10px] text-muted-foreground">Speed</p>
          </div>
          <div className="rounded-xl bg-white/[0.03] p-2">
            <MapPin size={16} className="mx-auto text-emerald-400" />
            <p className="mt-1 font-black text-sm text-white">1.4 km</p>
            <p className="text-[10px] text-muted-foreground">Distance Left</p>
          </div>
          <div className="rounded-xl bg-white/[0.03] p-2">
            <Star size={16} className="mx-auto text-amber-400 fill-amber-400" />
            <p className="mt-1 font-black text-sm text-white">4.9 ★</p>
            <p className="text-[10px] text-muted-foreground">Suresh K. (Host)</p>
          </div>
        </div>
      </div>

      {/* Verified Co-Riders in Pod */}
      <div className="glass p-3.5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-white/50">
          Co-Riders in Pod Cabin (2 / 4)
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar initials="AK" size={34} verified={true} />
            <div>
              <p className="text-xs font-bold text-white">Amit K.</p>
              <p className="text-[10px] text-muted-foreground">Google • Metro Route</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar initials="RS" size={34} verified={true} />
            <div>
              <p className="text-xs font-bold text-white">Ritu S.</p>
              <p className="text-[10px] text-muted-foreground">Infosys • Metro Route</p>
            </div>
          </div>
        </div>
      </div>

      {/* MoveOS Cabin Comfort Dials */}
      <div className="glass p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sliders size={14} className="text-amber-400" /> MoveOS Cabin Comfort
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">HEPA Air: PM2.5 = 12 (Pure)</span>
        </div>

        <div className="flex gap-2">
          {[
            { k: "ac", ic: <Snowflake size={14} />, l: `${temp}°C AC` },
            { k: "light", ic: <Lightbulb size={14} />, l: "Ambient Warm" },
            { k: "quiet", ic: <VolumeX size={14} />, l: "Quiet Cabin" },
          ].map(({ k, ic, l }) => (
            <button
              key={k}
              onClick={() => setCtrl({ ...ctrl, [k]: !ctrl[k] })}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all active:scale-95 ${
                ctrl[k]
                  ? "bg-amber-400 text-navy-deep shadow-[0_0_12px_rgba(255,210,0,0.3)]"
                  : "border border-white/10 bg-white/[0.04] text-white/80"
              }`}
            >
              {ic}
              <span>{l}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ola Guardian SOS & Live Location Sharing */}
      <div className="glass flex items-center gap-3.5 p-3.5">
        <button
          onClick={() => alert("Ola Guardian 24/7 Safety Team Alerted. Emergency response dispatched.")}
          className="sos-pulse grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-danger font-black text-white shadow-[0_0_16px_rgba(239,68,68,0.6)] active:scale-95"
        >
          <Shield size={20} />
          <span className="-mt-1 text-[10px] font-black">SOS</span>
        </button>

        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-xs font-bold text-white">Share Live Location</p>
            <p className="text-[10px] text-muted-foreground">Emergency contacts & family tracking</p>
          </div>
          <button
            onClick={() => setShare(!share)}
            className={`h-6 w-11 rounded-full p-0.5 transition-colors ${
              share ? "bg-emerald-500" : "bg-white/15"
            }`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-white transition-transform shadow-md ${
                share ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Arrival Simulation Button */}
      <GoldButton onClick={() => go("arrived")}>
        <Train size={18} className="fill-navy-deep" /> Simulate Pod Arrival at Metro Gate 2
      </GoldButton>
    </div>
  );
}

/* =========================================================================
   SCREEN 4: ARRIVED (COMMUTE IMPACT & METRO PLATFORM TRANSFER)
   ========================================================================= */
function Confetti() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  const colors = ["bg-amber-400", "bg-emerald-400", "bg-purple-400", "bg-white"];
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {Array.from({ length: 45 }).map((_, i) => (
        <span
          key={i}
          className={`absolute top-0 h-2.5 w-1.5 rounded-sm ${colors[i % 4]}`}
          style={{
            left: `${(i * 37) % 100}%`,
            animation: `confetti ${1.4 + (i % 5) * 0.2}s ${(i % 7) * 0.08}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

export function Arrived({ go }: { go: Go }) {
  const [rating, setRating] = useState(0);
  const [sheet, setSheet] = useState(false);

  return (
    <div className="space-y-4">
      <Confetti />

      {/* Celebration Header */}
      <div className="pt-2 text-center">
        <div className="relative mx-auto mb-2 grid h-20 w-20 place-items-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
          <svg viewBox="0 0 52 52" className="h-16 w-16">
            <circle
              cx="26"
              cy="26"
              r="24"
              className="fill-emerald-500/20 stroke-emerald-400"
              strokeWidth="2.5"
            />
            <path
              d="M15 27 l7 7 l15 -15"
              fill="none"
              className="draw stroke-emerald-400"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-white tracking-tight">Arrived! 🎉</h1>
        <p className="text-xs font-medium text-muted-foreground mt-0.5">
          Indiranagar Metro Gate 2 • 8:11 AM
        </p>
        <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-0.5 text-xs font-bold text-emerald-400">
          <Zap size={12} className="fill-emerald-400" /> You arrived 3 mins before Purple Line departure!
        </div>
      </div>

      {/* Primary Multimodal Action CTA */}
      <VoltButton onClick={() => alert("Navigating to Indiranagar Metro Gate 2 Escalator / Platform 2")}>
        <Train size={18} className="fill-navy-deep" /> Proceed to Metro Platform 2 (3m Buffer)
      </VoltButton>

      {/* Today's Commute Impact Bento Grid */}
      <div className="glass p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-extrabold text-sm text-white">Today's Commute Impact</p>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">FeedPod vs Cab</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { ic: <Wallet size={18} />, v: "₹18", l: "Pass Fare Deducted", hi: false },
            { ic: <Wallet size={18} />, v: "₹112 saved", l: "vs. Solo Cab Fare", hi: true },
            { ic: <Clock size={18} />, v: "14 mins", l: "saved vs. Silk Board traffic", hi: false },
            { ic: <Leaf size={18} />, v: "1.2 kg CO₂", l: "clean energy offset", hi: true },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl p-3 border ${
                item.hi
                  ? "border-emerald-500/30 bg-emerald-950/20"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className={item.hi ? "text-emerald-400" : "text-amber-400"}>
                {item.ic}
              </div>
              <p
                className={`mt-1 text-lg font-black ${
                  item.hi ? "text-emerald-300" : "text-white"
                }`}
              >
                {item.v}
              </p>
              <p className="text-[10px] text-muted-foreground">{item.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Share My Impact Button */}
      <button
        onClick={() => setSheet(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-amber-400/80 py-3.5 font-bold text-amber-400 backdrop-blur-md transition-all hover:bg-amber-400/10 active:scale-[0.98]"
      >
        <Share2 size={18} /> Share My Commute Impact
      </button>

      {/* Evening Return Commute Pre-Booking */}
      <div className="glass p-4 border-amber-500/20">
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm text-white">Evening Return: Society Gate 2</p>
          <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
            6:32 PM Slot
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Reserve your return pod seat from Metro Gate 2 to home.
        </p>
        <button
          onClick={() => alert("Evening Pod Reserved: Indiranagar Metro Gate 2 -> Society Gate 2 (6:32 PM)")}
          className="mt-3 w-full rounded-xl bg-amber-400 py-2.5 text-xs font-black text-navy-deep transition-all hover:bg-amber-300 active:scale-98"
        >
          Reserve Evening Return Seat
        </button>
      </div>

      {/* Commute Feedback Rating */}
      <div className="glass p-4 text-center">
        <p className="font-semibold text-xs text-white">How was your autonomous ride?</p>
        <div className="mt-2.5 flex justify-center gap-2.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setRating(n)}
              className="transition-transform hover:scale-125 active:scale-95"
            >
              <Star
                size={28}
                className={
                  n <= rating
                    ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_#ffd200]"
                    : "text-white/20"
                }
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="mt-2 text-xs font-semibold text-emerald-400 animate-fade-in">
            Thanks! Rated Suresh K. 5★ • Clean & On-Time Cabin
          </p>
        )}
      </div>

      <button
        onClick={() => go("home")}
        className="w-full text-center text-xs font-semibold text-white/50 hover:text-white underline pb-2"
      >
        Back to Home Feed
      </button>

      {/* Share Impact Bottom Sheet */}
      {sheet && (
        <div
          className="absolute inset-0 z-40 flex items-end bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSheet(false)}
        >
          <div
            className="w-full rounded-t-[32px] border-t border-white/20 bg-[#0d1424] p-5 shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-black text-white text-base">Share Your Commute Brag</p>
                <p className="text-[11px] text-muted-foreground">Saved ₹112 & 1.2 kg CO₂ today</p>
              </div>
              <button
                onClick={() => setSheet(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { ic: <MessageCircle size={22} />, l: "WhatsApp" },
                { ic: <Twitter size={22} />, l: "X / Twitter" },
                { ic: <Linkedin size={22} />, l: "LinkedIn" },
              ].map(({ ic, l }) => (
                <button
                  key={l}
                  onClick={() => {
                    alert(`Shared impact to ${l}!`);
                    setSheet(false);
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-xs font-bold text-white transition-all hover:bg-white/10 active:scale-95"
                >
                  <div className="text-amber-400">{ic}</div>
                  <span>{l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   SCREEN 5: DASHBOARD (PASS & MONTHLY ANALYTICS)
   ========================================================================= */
const SAVINGS = Array.from({ length: 22 }, (_, i) => ({
  d: `Oct ${i + 1}`,
  v: 60 + ((i * 47) % 85),
}));

function Ring({ used, total }: { used: number; total: number }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setP(used / total), 100);
    return () => clearTimeout(t);
  }, [used, total]);
  const c = 2 * Math.PI * 40;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#ffd200"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - p)}
        style={{
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          filter: "drop-shadow(0 0 6px rgba(255, 210, 0, 0.6))",
        }}
      />
    </svg>
  );
}

export function Dashboard() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const rode = [1, 1, 1, 1, 1, 0, 1];

  return (
    <div className="space-y-4">
      <header className="pt-1">
        <h1 className="text-2xl font-black text-white tracking-tight">My Commute Pass</h1>
        <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
          <LiveDot color="success" /> Active until Dec 1 • Auto-Renew ON
        </div>
      </header>

      {/* Holographic Black Titanium Pass Card */}
      <div className="relative overflow-hidden rounded-[28px] border border-amber-500/30 bg-gradient-to-br from-[#1b1e2a] via-[#0f1422] to-[#070b14] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
            OLA FEEDPOD MONTHLY PASS
          </p>
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[9px] font-bold text-white/70">
            RFID #8841-B
          </span>
        </div>

        <p className="mt-1 text-lg font-black text-white">Priya Sharma</p>
        <p className="text-[11px] text-white/50">Green Glen Layout ➔ Indiranagar Metro Loop</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-4xl font-black text-white tracking-tight">18</p>
            <p className="text-xs text-muted-foreground">remaining of 30 rides</p>
          </div>
          <div className="relative grid place-items-center">
            <Ring used={12} total={30} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-black text-white">12</span>
              <span className="text-[9px] uppercase text-white/60">Used</span>
            </div>
          </div>
        </div>

        <GoldButton className="mt-4 !py-3">Renew Pass — ₹1,200</GoldButton>
      </div>

      {/* Daily Savings Analytics Chart */}
      <div className="glass p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-extrabold text-white">Daily Commute Savings vs Cab</p>
            <p className="text-[10px] text-muted-foreground">Based on ₹130 avg auto/cab surge</p>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-black text-emerald-300 ring-1 ring-emerald-500/30">
            ₹1,847 saved 🎉
          </span>
        </div>

        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SAVINGS} margin={{ left: -24, right: 0, top: 10 }}>
              <XAxis
                dataKey="d"
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                interval={6}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 150]}
                ticks={[0, 50, 100, 150]}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d1424",
                  borderColor: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  fontSize: "11px",
                  color: "#fff",
                }}
                formatter={(val) => [`₹${val}`, "Saved"]}
              />
              <Bar dataKey="v" fill="#ffd200" radius={[4, 4, 0, 0]} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Commute Milestones Bento Grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { ic: <Leaf size={18} />, v: "26.4 kg", l: "CO₂ Offset" },
          { ic: <Clock size={18} />, v: "308 min", l: "Time Saved" },
          { ic: <Flame size={18} />, v: "22 days", l: "Streak 🔥" },
        ].map((item) => (
          <div key={item.l} className="glass p-3 !rounded-2xl">
            <div className="flex justify-center text-amber-400">{item.ic}</div>
            <p className="mt-1 font-black text-sm text-white">{item.v}</p>
            <p className="text-[10px] text-muted-foreground">{item.l}</p>
          </div>
        ))}
      </div>

      {/* Commute Streak Tracker */}
      <div className="glass p-4">
        <div className="flex justify-between">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                  rode[i]
                    ? "bg-amber-400 text-navy-deep shadow-[0_0_8px_#ffd200]"
                    : "border-2 border-white/20 text-white/40"
                }`}
              >
                {rode[i] ? <Check size={14} strokeWidth={3} /> : d}
              </span>
              <span className="text-[10px] text-white/50">{d}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs font-bold text-amber-300">
          22 day commute streak 🔥 — Don't break it tomorrow!
        </p>
      </div>

      {/* Neighbor Referral Card */}
      <div className="glass flex items-center gap-3 p-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-400/20 text-amber-400">
          <Gift size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white">
            Gift 3 free pods to your Green Glen neighbor
          </p>
          <p className="text-[10px] text-muted-foreground">Both get ₹150 pass credit</p>
        </div>
      </div>

      <GoldButton onClick={() => alert("Copied referral link: ola.app/feedpod/priya-sharma")}>
        <Share2 size={18} className="fill-navy-deep" /> Share Referral Code
      </GoldButton>
    </div>
  );
}

/* =========================================================================
   SCREEN 6: PROFILE
   ========================================================================= */
export function Profile({ go }: { go: Go }) {
  return (
    <div className="space-y-4">
      {/* User Identity Card */}
      <div className="glass flex items-center gap-4 p-5">
        <Avatar initials="PS" size={60} verified={true} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-black text-white">Priya Sharma</h2>
            <BadgeCheck size={18} className="text-emerald-400" />
          </div>
          <p className="text-xs text-muted-foreground">Resident • Green Glen Layout, Bellandur</p>
          <span className="mt-1 inline-block rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/20">
            FeedPod Prime Member #4029
          </span>
        </div>
      </div>

      {/* Commuter Specifications */}
      <div className="glass divide-y divide-white/10 p-0 overflow-hidden">
        {[
          ["Home Stop", "Society Gate 2, Green Glen Layout"],
          ["Transit Hub", "Indiranagar Metro, Purple Line Platform 2"],
          ["Monthly Plan", "30 rides / ₹1,200 per month (₹40/ride)"],
          ["Safety Protocol", "Live SOS + 100% Verified Co-Riders Only"],
          ["MoveOS Cabin Prefs", "22°C Climate • Ambient Warm • Quiet Mode"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between items-center gap-3 p-4 text-xs">
            <span className="text-white/50 font-medium">{k}</span>
            <span className="text-right font-bold text-white">{v}</span>
          </div>
        ))}
      </div>

      {/* Ride History Link */}
      <button
        onClick={() => go("arrived")}
        className="glass flex w-full items-center justify-between p-4 text-xs font-bold text-white transition-all hover:border-amber-400/30 active:scale-98"
      >
        <span className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-400" /> View Last Ride Summary & Impact
        </span>
        <ChevronRight size={16} className="text-white/40" />
      </button>

      {/* Emergency Contact */}
      <div className="glass flex items-center justify-between p-4">
        <div>
          <p className="text-xs font-bold text-white">Guardian Safety Contact</p>
          <p className="text-[10px] text-muted-foreground">+91 98860 ••••• (Rohan S.)</p>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
          Linked
        </span>
      </div>
    </div>
  );
}
