import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Home as HomeIcon, Map, Car, CreditCard, User } from "lucide-react";
import { Arrived, BoardingPass, Dashboard, Home, InRide, Profile, type Screen } from "@/components/feedpod/Screens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ola FeedPod — Electric Micro-Transit Loops" },
      { name: "description", content: "Hop on electric pods that loop from your society gate to the metro every 90 seconds. One monthly pass." },
      { property: "og:title", content: "Ola FeedPod — Electric Micro-Transit Loops" },
      { property: "og:description", content: "Hop on electric pods that loop from your society gate to the metro every 90 seconds." },
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
    <div className="flex min-h-screen justify-center bg-shell sm:py-6">
      <div className="relative flex h-[100dvh] w-full max-w-[390px] flex-col overflow-hidden bg-navy font-sans text-foreground sm:h-[844px] sm:rounded-[44px] sm:ring-8 sm:ring-black/60">
        <main key={screen} className="screen-in relative flex-1 overflow-y-auto px-4 pb-6 pt-6">
          {screen === "home" && <Home go={go} />}
          {screen === "pass" && <BoardingPass go={go} />}
          {screen === "ride" && <InRide go={go} />}
          {screen === "arrived" && <Arrived go={go} />}
          {screen === "dashboard" && <Dashboard />}
          {screen === "profile" && <Profile go={go} />}
        </main>
        <nav className="grid shrink-0 grid-cols-5 border-t border-foreground/10 bg-navy-deep/90 pb-3 pt-2 backdrop-blur">
          {TABS.map((t) => {
            const active = screen === t.id || t.also?.includes(screen);
            return (
              <button key={t.id} onClick={() => go(t.id)} className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition ${active ? "text-gold" : "text-muted-foreground"}`}>
                <t.icon size={20} strokeWidth={active ? 2.5 : 2} />
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
