# SilentSync — Product Requirements Document (PRD)

## Original problem statement
Build **SilentSync** — a production-grade, bare **React Native 0.87.0 (Android)**
app: auto-silences the phone inside geo-zones, restores sound on exit, and
supports time-bound safe live-location sharing. 4 fully themeable variants,
free (ad-supported) + premium (₹49/mo) tiers. Full spec in `SILENTSYNC_SPEC.md`
(cloned from GitHub `unknown-admin/Silent_Sync`).

## Environment constraint (important)
Generated in an Expo/Metro + FastAPI preview container that has **no Android
SDK / JDK / Gradle / device**. Therefore the bare-RN app was authored and
**verified only at the TypeScript + Jest level** (`tsc --noEmit` = 0 errors;
unit tests pass). It has **not been compiled/run on a device** — the user
builds & runs locally. Delivered as a standalone project at `/app/SilentSync`.

## Architecture / tasks done (2026-06)
- Foundation: package.json (all spec deps), tsconfig path aliases, babel
  (module-resolver + worklets-last, skipped in tests), metro, jest, eslint,
  prettier, `.env(.example)`, `.gitignore`.
- 4-theme system (Minimal Light / Pixel Blue / Soft Lavender / Holo Dark) with
  exact palettes, `useTheme()`, Zustand+MMKV persistence, per-theme owl mascot.
- Shared UI library (Text, Button, Input, Card, Switch, Slider, Badge, Avatar,
  Divider, Chip, Skeleton, Toast, Modal, BottomSheet, IconButton, FAB, Icon),
  layout (Screen/Header/Section/EmptyState), feedback
  (Loading/Error/Confirm/PermissionRequest), ads (AdWrapper/BannerAd).
- Feature-first modules with stores/services/schemas/hooks/screens:
  auth, zones, profiles, sharing, settings, premium.
- All 20 screens + splash (151 TS/TSX files). Navigation: Root(auth guard) →
  Auth stack / Main bottom-tabs → per-tab stacks; themed NavigationContainer.
- Firebase modular API (auth/firestore/messaging/analytics), maps, geocoding.
- Free-tier limits enforced (3 zones, 2 custom profiles, 15min/1recipient/3-day
  sharing); premium via RevenueCat + AdWrapper hides ads.
- Native Kotlin (11 files): RingerModeModule, DNDModule, GeofenceModule (+
  packages), LocationForegroundService, GeofenceBroadcastReceiver, BootReceiver,
  MainApplication/MainActivity; AndroidManifest with permissions +
  foregroundServiceType="location"; Gradle + res + firestore.rules.
- Verification: `tsc --noEmit` → 0 errors; Jest unit tests (validators, geo).

## Deliberate deviations
- Path alias `@types/` → `@app-types/` (TS reserves `@types/`; would not compile).
- Gradle in Groovy (not `.kts`) to match the proven RN 0.87 template.

## Core requirements (static)
Silent-zone geofencing + auto ringer control (native), profiles, safe live
sharing, email/Google/OTP auth, 4-theme appearance, settings suite, premium.

## Personas
Working professionals, students, parents (18–45) who forget to silence phones
and want safe, controlled location sharing.

## Backlog / remaining (P0→P2)
- **P0**: Compile & run on device; wire `google-services.json`; verify geofence
  ENTER/EXIT ringer changes + foreground-service survival + boot re-registration.
- **P1**: Wire zoneService/profileService to Firestore sync via TanStack Query
  mutations; phone OTP auth screen; scheduled profile switching (premium);
  WiFi/time-based triggers (premium); AdMob interstitial/rewarded frequency caps.
- **P2**: Cloud backup/export; Detox E2E; Crashlytics; i18n; per-zone custom
  exit modes; recipient contact picker for sharing.

## Next tasks
1. Local `yarn install` + `yarn android` on a device; fix any autolink issues.
2. Add Firebase config + Maps/AdMob/RevenueCat keys to `.env`; deploy
   `firestore.rules`.
3. QA geofencing end-to-end on a physical device.
