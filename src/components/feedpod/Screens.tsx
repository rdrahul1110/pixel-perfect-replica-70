import { useEffect, useState } from "react";
import {
  Bell, Zap, Train, Lock, Unlock, CheckCircle2, Footprints, Users, Timer, ShieldCheck,
  Shield, Snowflake, Lightbulb, VolumeX, Gauge, Star, Share2, Leaf, Wallet, Clock,
  Flame, Gift, MapPin, ChevronRight, X, BadgeCheck, MessageCircle, Linkedin, Twitter,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Avatar, GoldButton, LiveDot, PodGlyph, fmt, useCountdown } from "./shared";

export type Screen = "home" | "pass" | "ride" | "arrived" | "dashboard" | "profile";
type Go = (s: Screen) => void;

/* ---------- HOME ---------- */
const LOOP = "M60,140 C60,60 140,40 200,50 C280,60 320,100 310,150 C300,210 220,230 160,220 C90,212 60,190 60,140 Z";

export function Home({ go }: { go: Go }) {
  const s = useCountdown(75);
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Good Morning,</p>
          <h1 className="truncate text-2xl font-extrabold">Priya 👋</h1>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button className="glass relative grid h-10 w-10 place-items-center !rounded-full">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold" />
          </button>
          <Avatar initials="PS" size={40} />
        </div>
      </header>

      <div className="glass overflow-hidden p-0">
        <svg viewBox="0 0 370 260" className="block w-full">
          <rect width="370" height="260" className="fill-navy-deep" />
          {[40, 100, 170, 240].map((y) => (
            <line key={y} x1="0" x2="370" y1={y} y2={y} className="stroke-navy" strokeWidth="10" />
          ))}
          {[30, 130, 250, 340].map((x) => (
            <line key={x} y1="0" y2="260" x1={x} x2={x} className="stroke-navy" strokeWidth="10" />
          ))}
          <path d={LOOP} fill="none" className="stroke-gold" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
          <g transform="translate(60,140)">
            <circle r="7" className="fill-success" />
            <text x="12" y="4" className="fill-foreground text-[10px] font-semibold">Society Gate 2</text>
          </g>
          <g transform="translate(310,150)">
            <rect x="-9" y="-9" width="18" height="18" rx="4" className="fill-gold" />
            <text x="-4" y="4" className="fill-navy-deep text-[10px] font-extrabold">M</text>
            <text x="-90" y="26" className="fill-foreground text-[10px] font-semibold">Indiranagar Metro</text>
          </g>
          <g>
            <PodGlyph />
            <animateMotion dur="8s" repeatCount="indefinite" path={LOOP} rotate="0" />
          </g>
        </svg>
      </div>

      <div className="glass p-5 text-center">
        <p className="text-sm text-muted-foreground">Next Pod at Society Gate 2</p>
        <p key={s} className="my-1 animate-fade-in text-6xl font-extrabold tabular-nums text-gold">{fmt(s)}</p>
        <p className="mb-4 text-sm text-muted-foreground">2 seats available • 2.8 km to Metro</p>
        <GoldButton onClick={() => go("pass")}><Zap size={18} /> Get on Next Pod</GoldButton>
      </div>

      <button onClick={() => go("dashboard")} className="glass block w-full p-4 text-left">
        <div className="flex items-center gap-2 font-semibold"><LiveDot /> Pass Active</div>
        <p className="mt-1 text-sm">18 rides remaining this month</p>
        <div className="mt-3 h-2 rounded-full bg-glass"><div className="h-2 w-[40%] rounded-full bg-gold" /></div>
        <p className="mt-2 text-xs text-muted-foreground">12/30 used • Renews Dec 1 • ₹1,200/mo</p>
      </button>

      <div className="glass p-4">
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Today's Route</p>
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Home</span><ChevronRight size={14} className="text-gold" />
          <span>Metro <span className="text-muted-foreground">3m</span></span><ChevronRight size={14} className="text-gold" />
          <span>Office <span className="text-muted-foreground">22m</span></span>
        </div>
        <p className="mt-3 rounded-xl bg-navy-deep p-2.5 text-xs">🚇 Purple Line departs 8:14 AM — Pod syncs you in time ✅</p>
      </div>
    </div>
  );
}

/* ---------- BOARDING PASS ---------- */
function QR() {
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < 441; i++) { seed = (seed * 9301 + 49297) % 233280; cells.push(seed / 233280 > 0.5); }
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    for (const [ox, oy] of [[0, 0], [14, 0], [0, 14]]) if (inBox(ox, oy)) {
      const dx = x - ox, dy = y - oy;
      return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
    }
    return -1;
  };
  return (
    <svg viewBox="0 0 21 21" className="h-full w-full" shapeRendering="crispEdges">
      {cells.map((c, i) => {
        const x = i % 21, y = Math.floor(i / 21), f = finder(x, y);
        const on = f === -1 ? c : f === 1;
        return on ? <rect key={i} x={x} y={y} width="1" height="1" className="fill-navy-deep" /> : null;
      })}
    </svg>
  );
}

export function BoardingPass({ go }: { go: Go }) {
  const s = useCountdown(80);
  const [unlocked, setUnlocked] = useState(false);
  return (
    <div className="space-y-4">
      <div className="glass overflow-hidden p-0">
        <div className="bg-gold p-5 text-navy-deep">
          <p className="text-xs font-semibold uppercase tracking-widest">Your Boarding Pass</p>
          <p className="mt-1 text-2xl font-extrabold">Pod #KA-05-EP-402</p>
          <p className="text-sm font-medium">Society Gate 2 → Indiranagar Metro</p>
        </div>
        <div className="p-5">
          <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-2xl bg-foreground p-4">
            <QR />
            <div className="shimmer pointer-events-none absolute -top-10 left-0 h-[150%] w-12 bg-foreground/60 blur-md" />
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">Tap phone to pod door NFC reader OR scan QR</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { i: <Timer size={18} />, t: fmt(s), l: "Pod arrives" },
          { i: <Footprints size={18} />, t: "30 m", l: "Walk to Gate 2" },
          { i: <Users size={18} />, t: "2", l: "Boarding with you" },
        ].map((d) => (
          <div key={d.l} className="glass !rounded-2xl p-3">
            <div className="flex justify-center text-gold">{d.i}</div>
            <p className="mt-1 font-bold tabular-nums">{d.t}</p>
            <p className="text-[10px] text-muted-foreground">{d.l}</p>
          </div>
        ))}
      </div>

      <div className="glass flex items-center gap-3 p-4">
        <div className="flex -space-x-2"><Avatar initials="AK" /><Avatar initials="RS" /></div>
        <p className="text-sm">Verified co-riders on this pod</p>
      </div>

      {unlocked ? (
        <button onClick={() => go("ride")} className="flex w-full animate-scale-in items-center justify-center gap-2 rounded-2xl bg-success py-4 font-bold text-navy-deep">
          <CheckCircle2 size={18} /> Door Unlocked — Step In!
        </button>
      ) : (
        <GoldButton onClick={() => setUnlocked(true)}><Unlock size={18} /> Tap to Unlock Pod Door</GoldButton>
      )}
      {unlocked && <p className="text-center text-xs text-muted-foreground">Tap again to start your ride</p>}
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock size={12} /> End-to-end verified • Live SOS Active
      </p>
    </div>
  );
}

/* ---------- IN-RIDE ---------- */
const LANE = "M30,200 C70,200 70,150 110,150 C150,150 140,90 190,90 C240,90 230,140 270,130 C300,122 300,60 330,50";

export function InRide({ go }: { go: Go }) {
  const [share, setShare] = useState(true);
  const [ctrl, setCtrl] = useState<Record<string, boolean>>({ ac: true, light: true, quiet: false });
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-navy-deep">
        <p className="p-3 text-sm font-semibold text-gold">🚇 Purple Line departs in 6 mins — You'll make it ✅</p>
        <div className="h-1 bg-glass"><div className="h-1 bg-gold" style={{ animation: "buffer 20s linear forwards" }} /></div>
      </div>

      <div className="glass relative overflow-hidden p-0">
        <svg viewBox="0 0 360 240" className="block w-full">
          <rect width="360" height="240" className="fill-navy-deep" />
          {[60, 120, 180].map((y) => <line key={y} x1="0" x2="360" y1={y} y2={y + 20} className="stroke-navy" strokeWidth="6" />)}
          {[80, 160, 240, 310].map((x) => <line key={x} y1="0" y2="240" x1={x} x2={x - 20} className="stroke-navy" strokeWidth="6" />)}
          <path d={LANE} fill="none" className="stroke-gold" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
          <g transform="translate(330,50)">
            <circle r="12" className="fill-gold" />
            <text x="-5" y="4" className="fill-navy-deep text-[12px] font-extrabold">M</text>
          </g>
          <g><PodGlyph /><animateMotion dur="10s" repeatCount="indefinite" path={LANE} /></g>
        </svg>
        <div className="absolute bottom-3 left-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy-deep">Arriving in 3 mins</div>
      </div>

      <div className="glass p-4">
        <div className="flex items-center gap-2 text-sm font-semibold"><LiveDot /> Currently Riding • Pod #KA-05-EP-402</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div><Gauge size={16} className="mx-auto text-gold" /><p className="font-bold">28 km/h</p><p className="text-[10px] text-muted-foreground">Speed</p></div>
          <div><MapPin size={16} className="mx-auto text-gold" /><p className="font-bold">1.4 km</p><p className="text-[10px] text-muted-foreground">Left</p></div>
          <div><Star size={16} className="mx-auto text-gold" /><p className="font-bold">4.9</p><p className="text-[10px] text-muted-foreground">Suresh K.</p></div>
        </div>
      </div>

      <div className="glass p-4">
        <p className="mb-3 inline-block rounded-full bg-navy-deep px-3 py-1 text-xs">🧑 Riding with 2 verified commuters</p>
        <div className="flex gap-4">
          {[["AK", "Amit K."], ["RS", "Ritu S."]].map(([i, n]) => (
            <div key={n} className="flex items-center gap-2">
              <Avatar initials={i} size={32} />
              <span className="text-sm">{n}</span><BadgeCheck size={16} className="text-success" />
            </div>
          ))}
        </div>
      </div>

      <div className="glass flex items-center gap-4 p-4">
        <button className="sos-pulse grid h-16 w-16 shrink-0 place-items-center rounded-full bg-danger font-bold">
          <Shield size={20} /><span className="-mt-1 text-[10px]">SOS</span>
        </button>
        <div className="flex flex-1 items-center justify-between">
          <span className="text-sm">Share live location</span>
          <button onClick={() => setShare(!share)} className={`h-6 w-11 rounded-full p-0.5 transition ${share ? "bg-success" : "bg-glass"}`}>
            <span className={`block h-5 w-5 rounded-full bg-foreground transition ${share ? "translate-x-5" : ""}`} />
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        {[["ac", <Snowflake size={14} />, "22°C"], ["light", <Lightbulb size={14} />, "Auto Light"], ["quiet", <VolumeX size={14} />, "Quiet"]].map(([k, ic, l]) => (
          <button key={k as string} onClick={() => setCtrl({ ...ctrl, [k as string]: !ctrl[k as string] })}
            className={`flex flex-1 items-center justify-center gap-1 rounded-full py-2 text-xs font-semibold transition ${ctrl[k as string] ? "bg-gold text-navy-deep" : "glass"}`}>
            {ic}{l}
          </button>
        ))}
      </div>

      <GoldButton onClick={() => go("arrived")}><Train size={18} /> Simulate Arrival</GoldButton>
    </div>
  );
}

/* ---------- ARRIVAL ---------- */
function Confetti() {
  const [show, setShow] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShow(false), 2600); return () => clearTimeout(t); }, []);
  if (!show) return null;
  const colors = ["bg-gold", "bg-success", "bg-foreground", "bg-danger"];
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <span key={i} className={`absolute top-0 h-2.5 w-1.5 rounded-sm ${colors[i % 4]}`}
          style={{ left: `${(i * 37) % 100}%`, animation: `confetti ${1.4 + (i % 5) * 0.2}s ${(i % 7) * 0.08}s ease-in forwards` }} />
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
      <div className="pt-2 text-center">
        <svg viewBox="0 0 52 52" className="mx-auto h-20 w-20">
          <circle cx="26" cy="26" r="24" className="fill-success/20 stroke-success" strokeWidth="2" />
          <path d="M15 27 l7 7 l15 -15" fill="none" className="draw stroke-success" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="mt-2 text-3xl font-extrabold">Arrived! 🎉</h1>
        <p className="text-sm text-muted-foreground">Indiranagar Metro Gate 2 • 8:11 AM</p>
        <p className="mt-1 text-sm font-semibold text-success">You made it 3 mins early</p>
      </div>

      <div className="glass p-4">
        <p className="mb-3 font-bold">Today's Commute Impact</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            [<Wallet size={18} />, "₹18", "Fare used from pass", false],
            [<Wallet size={18} />, "₹112 saved", "vs. cab fare", true],
            [<Clock size={18} />, "14 mins", "saved vs. shared auto", false],
            [<Leaf size={18} />, "1.2 kg CO₂", "offset today", false],
          ].map(([ic, v, l, hi], i) => (
            <div key={i} className="rounded-2xl bg-navy-deep p-3">
              <div className={hi ? "text-success" : "text-gold"}>{ic}</div>
              <p className={`mt-1 text-lg font-extrabold ${hi ? "text-success" : ""}`}>{v}</p>
              <p className="text-[11px] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setSheet(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gold py-3.5 font-bold text-gold">
        <Share2 size={18} /> Share My Impact
      </button>

      <div className="glass p-4">
        <p className="font-bold">Evening Return: Society Gate 2</p>
        <p className="text-sm text-muted-foreground">Next pod at 6:32 PM • Pre-book your seat</p>
        <button className="mt-3 rounded-full bg-gold px-4 py-2 text-sm font-bold text-navy-deep">Reserve Evening Ride</button>
      </div>

      <div className="glass p-4 text-center">
        <p className="font-semibold">How was your ride?</p>
        <div className="mt-2 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)}>
              <Star size={30} className={n <= rating ? "fill-gold text-gold" : "text-muted-foreground"} />
            </button>
          ))}
        </div>
        {rating > 0 && <p className="mt-2 text-xs text-success">Thanks for rating Suresh K.!</p>}
      </div>

      <button onClick={() => go("home")} className="w-full text-center text-sm text-muted-foreground underline">Back to Home</button>

      {sheet && (
        <div className="absolute inset-0 z-30 flex items-end bg-navy-deep/70" onClick={() => setSheet(false)}>
          <div className="w-full animate-slide-in-right rounded-t-3xl bg-navy-deep p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between"><p className="font-bold">Share your impact</p><button onClick={() => setSheet(false)}><X size={18} /></button></div>
            <div className="grid grid-cols-3 gap-3">
              {[[<MessageCircle />, "WhatsApp"], [<Twitter />, "X"], [<Linkedin />, "LinkedIn"]].map(([ic, l]) => (
                <button key={l as string} onClick={() => setSheet(false)} className="glass flex flex-col items-center gap-1 p-4 text-xs">{ic}{l}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- DASHBOARD ---------- */
const SAVINGS = Array.from({ length: 22 }, (_, i) => ({ d: `Oct ${i + 1}`, v: 60 + ((i * 47) % 85) }));

function Ring({ used, total }: { used: number; total: number }) {
  const [p, setP] = useState(0);
  useEffect(() => { const t = setTimeout(() => setP(used / total), 100); return () => clearTimeout(t); }, [used, total]);
  const c = 2 * Math.PI * 40;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
      <circle cx="50" cy="50" r="40" fill="none" className="stroke-glass" strokeWidth="9" />
      <circle cx="50" cy="50" r="40" fill="none" className="stroke-gold" strokeWidth="9" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - p)} style={{ transition: "stroke-dashoffset 1.2s ease-out" }} />
    </svg>
  );
}

export function Dashboard() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const rode = [1, 1, 1, 1, 1, 0, 1];
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-extrabold">My Commute Pass</h1>
        <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-glass px-3 py-1 text-xs"><LiveDot /> Active until Dec 1</p>
      </header>

      <div className="rounded-3xl bg-gradient-to-br from-navy to-navy-deep p-5 shadow-2xl ring-1 ring-foreground/10">
        <p className="text-xs uppercase tracking-widest text-gold">Ola FeedPod Monthly Pass</p>
        <p className="text-lg font-bold">Priya Sharma</p>
        <div className="mt-2 flex items-center justify-between">
          <div><p className="text-4xl font-extrabold">18</p><p className="text-sm text-muted-foreground">remaining of 30</p></div>
          <div className="relative"><Ring used={12} total={30} /><span className="absolute inset-0 grid place-items-center text-sm font-bold">12 used</span></div>
        </div>
        <GoldButton className="mt-3 !py-3">Renew — ₹1,200</GoldButton>
      </div>

      <div className="glass p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-sm font-bold">Daily Savings vs Cab</p>
          <span className="rounded-full bg-success/20 px-2 py-0.5 text-[11px] font-bold text-success">₹1,847 saved 🎉</span>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SAVINGS} margin={{ left: -24, right: 0, top: 5 }}>
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }} interval={6} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 150]} ticks={[0, 50, 100, 150]} tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
              <Bar dataKey="v" fill="var(--color-gold)" radius={[3, 3, 0, 0]} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[[<Leaf size={18} />, "26.4 kg", "CO₂ offset"], [<Clock size={18} />, "308 min", "saved"], [<Flame size={18} />, "22 days", "streak"]].map(([ic, v, l]) => (
          <div key={l as string} className="glass !rounded-2xl p-3"><div className="flex justify-center text-gold">{ic}</div><p className="mt-1 font-bold">{v}</p><p className="text-[10px] text-muted-foreground">{l}</p></div>
        ))}
      </div>

      <div className="glass p-4">
        <div className="flex justify-between">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className={`h-8 w-8 rounded-full ${rode[i] ? "bg-gold" : "border-2 border-muted-foreground/40"}`} />
              <span className="text-[10px] text-muted-foreground">{d}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm font-semibold">22 day streak 🔥 — Don't break it!</p>
      </div>

      <div className="glass flex items-center gap-3 p-4">
        <Gift className="shrink-0 text-gold" />
        <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Invite a neighbor, both get 3 free rides</p></div>
      </div>
      <GoldButton><Share2 size={18} /> Share Referral Code</GoldButton>
    </div>
  );
}

/* ---------- PROFILE ---------- */
export function Profile({ go }: { go: Go }) {
  return (
    <div className="space-y-4">
      <div className="glass flex items-center gap-4 p-5">
        <Avatar initials="PS" size={64} />
        <div className="min-w-0"><p className="text-xl font-extrabold">Priya Sharma</p><p className="text-sm text-muted-foreground">27 • Bengaluru</p></div>
      </div>
      <div className="glass divide-y divide-foreground/10 p-0">
        {[["Home stop", "Society Gate 2, Green Glen Layout"], ["Destination", "Indiranagar Metro, Purple Line"], ["Pass", "30 rides / ₹1,200 per month"], ["Safety", "Live SOS + verified co-riders"]].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 p-4 text-sm"><span className="text-muted-foreground">{k}</span><span className="text-right font-medium">{v}</span></div>
        ))}
      </div>
      <button onClick={() => go("arrived")} className="glass flex w-full items-center justify-between p-4 text-sm font-semibold">
        <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-success" /> Last ride summary</span><ChevronRight size={16} />
      </button>
    </div>
  );
}
