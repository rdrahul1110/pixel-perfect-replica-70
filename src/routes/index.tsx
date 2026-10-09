import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home as HomeIcon,
  Map,
  Car,
  CreditCard,
  User,
  Wifi,
  BatteryCharging,
  Radio,
  Sparkles,
} from "lucide-react";
import {
  Arrived,
  BoardingPass,
  Dashboard,
  Home,
  InRide,
  Profile,
  type Screen,
} from "@/components/feedpod/Screens";
import { LiveDot } from "@/components/feedpod/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ola FeedPod 2035 — Autonomous Micro-Transit Loops" },
      {
        name: "description",
        content:
          "Autonomous on-demand electric pods connecting society gates to Namma Metro every 90 seconds. MoveOS 4.2.",
      },
      { property: "og:title", content: "Ola FeedPod — Electric Micro-Transit Loops" },
      {
        property: "og:description",
        content:
          "Autonomous electric pods looping society gate to metro every 90s. Powered by Ola MoveOS 4.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

const TABS: { id: Screen; label: string; icon: typeof HomeIcon; also?: Screen[] }[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "pass", label: "Routes", icon: Map },
  { id: "ride", label: "My Rides", icon: Car, also: ["arrived"] },
  { id: "dashboard", label: "Pass", icon: CreditCard },
  { id: "profile", label: "Profile", icon: User },
];

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const go = (s: Screen) => setScreen(s);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#05070c] px-2 py-4 sm:px-6 sm:py-8 font-sans text-foreground selection:bg-gold selection:text-navy-deep">
      {/* Ambient Cyber Lighting Gradients in Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-3xl" />
        {/* Subtle grid pattern in desktop background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top Desktop Fleet Telemetry Bar */}
      <div className="pointer-events-none fixed top-4 left-6 hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-success shadow-[0_0_8px_#00f59b]" />
        <span className="text-[11px] font-semibold tracking-wider uppercase text-white/70">
          Ola Fleet Autonomous OS 4.2 • Bengaluru Live
        </span>
      </div>

      {/* Titanium Mobile Frame */}
      <div className="relative flex h-[100dvh] w-full max-w-[400px] flex-col overflow-hidden bg-[#090d16] shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:h-[852px] sm:rounded-[50px] sm:border-[9px] sm:border-[#1e2433] sm:ring-1 sm:ring-white/15">
        
        {/* iOS Dynamic Island & Status Bar */}
        <header className="relative shrink-0 px-6 pt-3 pb-1 select-none z-30">
          {/* Hardware Notch / Dynamic Island */}
          <div className="mx-auto flex h-[29px] w-[130px] items-center justify-between rounded-full bg-black px-3 shadow-inner ring-1 ring-white/10 transition-all hover:w-[190px] group cursor-pointer"
               onClick={() => go(screen === "ride" ? "pass" : "ride")}>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_6px_#00f59b] animate-pulse" />
              <span className="text-[10px] font-bold text-amber-400 group-hover:hidden">POD #402</span>
              <span className="hidden text-[10px] font-bold text-amber-400 group-hover:inline">GATE 2 ARRIVAL</span>
            </div>
            <div className="flex items-center gap-1">
              <Radio size={11} className="text-emerald-400 animate-pulse" />
              <span className="text-[10px] font-extrabold text-white">45s</span>
            </div>
          </div>

          {/* Time & Telemetry Status Bar */}
          <div className="mt-1 flex items-center justify-between text-[11px] font-semibold text-white/75">
            <span className="tracking-tight font-bold">8:06 AM</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/50 tracking-widest font-mono">5G</span>
              <Wifi size={12} strokeWidth={2.5} />
              <div className="flex items-center gap-0.5 text-emerald-400">
                <BatteryCharging size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-bold">98%</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable View Container */}
        <main
          key={screen}
          className="screen-in relative flex-1 overflow-y-auto px-4 pt-2 pb-6 scrollbar-none"
        >
          {screen === "home" && <Home go={go} />}
          {screen === "pass" && <BoardingPass go={go} />}
          {screen === "ride" && <InRide go={go} />}
          {screen === "arrived" && <Arrived go={go} />}
          {screen === "dashboard" && <Dashboard />}
          {screen === "profile" && <Profile go={go} />}
        </main>

        {/* Frosted Glass Floating Dock Navigation */}
        <nav className="relative z-30 shrink-0 border-t border-white/10 bg-[#070b14]/90 px-2 py-2 backdrop-blur-2xl">
          <div className="grid grid-cols-5 gap-1">
            {TABS.map((t) => {
              const active = screen === t.id || t.also?.includes(screen);
              return (
                <button
                  key={t.id}
                  onClick={() => go(t.id)}
                  className={`group relative flex flex-col items-center justify-center gap-1 rounded-2xl py-1.5 transition-all duration-200 active:scale-95 ${
                    active ? "text-amber-400" : "text-white/45 hover:text-white/80"
                  }`}
                >
                  {active && (
                    <span className="absolute -top-1.5 h-1 w-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_8px_#ffd200]" />
                  )}
                  <t.icon
                    size={20}
                    strokeWidth={active ? 2.5 : 1.9}
                    className={`transition-transform duration-200 ${
                      active ? "scale-110 drop-shadow-[0_0_8px_rgba(255,210,0,0.5)]" : ""
                    }`}
                  />
                  <span
                    className={`text-[10px] tracking-wide transition-all ${
                      active ? "font-bold text-amber-400" : "font-medium"
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
          {/* iOS Home Indicator Bar */}
          <div className="mx-auto mt-2 h-1 w-32 rounded-full bg-white/20" />
        </nav>
      </div>
    </div>
  );
}
