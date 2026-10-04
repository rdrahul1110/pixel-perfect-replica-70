# Ola FeedPod — Mobile Prototype

A clickable, front-end-only prototype of the 2035 electric micro-transit pass app. Follows the uploaded brief exactly: navy and gold colors, frosted-glass cards, phone frame centered on a dark grey page, five-tab bottom bar.

## Screens
1. **Home (Live Loop)**: greeting, illustrated loop map with the pod circling every 8 seconds, live countdown (starts at 75s, resets to 90s), "Get on Next Pod" button, pass status with progress bar, today's route with metro sync note.
2. **Boarding Pass**: pod number, QR code with a shimmer sweep, live details row with a running countdown, co-rider avatars, "Unlock Pod Door" button that turns green after a tap, security note.
3. **In-Ride Metro Sync**: Purple Line banner with a progress bar, winding lane map with the pod moving toward the metro marker, ride info, co-riders, a pulsing SOS button with a location-sharing toggle, cabin control pills.
4. **Arrival Summary**: confetti burst, checkmark that draws itself, 2x2 impact tiles, share sheet (WhatsApp, X, LinkedIn), evening ride suggestion, tappable star rating.
5. **Monthly Pass Dashboard**: pass card with animated ring (18 of 30 left), renew button, 22-day savings bar chart with bars that grow in, impact stats, 7-day streak row, referral card.

## Navigation
- Bottom tabs: Home, Routes (Boarding Pass), My Rides (In-Ride), Pass (Dashboard), Profile (simple profile with Priya's details plus a link to the Arrival summary).
- Flow buttons: Get on Next Pod leads to Boarding Pass. Door Unlocked leads to In-Ride. "Arrive" on In-Ride leads to Arrival. Fade and slide transitions between screens.
- No search bar, driver matching, or booking flow.

## Technical details
- Single route at `/` with screen state (a tab-switched prototype); head metadata set for the app.
- Colors added to `src/styles.css` as tokens (navy, deep navy, gold, success, danger, glass). Inter loaded via a `<link>` tag.
- Components in `src/components/feedpod/` (one per screen, plus PhoneFrame, BottomNav, LoopMap, RideMap, Confetti).
- Pod movement uses SVG `animateMotion` along the route paths. Countdowns use a shared `useCountdown` hook.
- Lucide icons. Recharts for the bar chart (install). Confetti uses CSS particles, so no extra library is needed.
- The QR code is a CSS/SVG pattern.
