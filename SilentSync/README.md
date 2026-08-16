# 🦉 SilentSync — "Smart Silence, Safe Sharing"

Production-grade **bare React Native 0.87.0 (Android)** app that auto-silences
your phone inside geo-zones and lets you share live location safely. Built to
the `SILENTSYNC_SPEC.md` architecture with a 4-theme system, feature-first
folders, Zustand + MMKV, TanStack Query, React Hook Form + Zod, Firebase
modular API, react-native-maps, AdMob, RevenueCat, and **custom Kotlin native
modules** for background geofencing + ringer control.

> ⚠️ **This project was generated in a preview environment that has no Android
> SDK / JDK / Gradle / device.** It is verified at the **TypeScript level
> (`tsc --noEmit` → 0 errors)** but has **not been compiled or run on a
> device**. Build & run it locally (steps below).

---

## ✅ What's implemented

- **4-theme system** (`Minimal Light`, `Pixel Blue`, `Soft Lavender`,
  `Holo Dark`) via `useTheme()` — colors, typography, radius, shadows, and the
  owl mascot per theme. Persisted with MMKV; applies instantly.
- **All 20 screens** (auth, home dashboard, add/edit zone with map, zone
  details, profiles, add/edit profile, location sharing + live view, full
  settings suite, appearance theme selector, subscription).
- **Feature-first architecture** — every feature has
  `screens/ components/ hooks/ services/ store/ schemas/`.
- **State**: Zustand v5 stores persisted through MMKV; TanStack Query client.
- **Forms**: React Hook Form + Zod schemas (login/signup/zone/profile).
- **Storage**: `react-native-mmkv` everywhere; `react-native-keychain` for
  auth tokens only. No AsyncStorage.
- **Firebase (modular API only)**: auth, firestore, messaging, analytics.
- **Free-tier limits** enforced: 3 zones, 2 custom profiles, 15-min /
  1-recipient / 3-per-day live sharing. Premium unlocks all + hides ads.
- **Native Kotlin modules**:
  `RingerModeModule`, `DNDModule`, `GeofenceModule`,
  `LocationForegroundService`, `GeofenceBroadcastReceiver`, `BootReceiver`,
  registered in `MainApplication.kt`, with a manifest declaring
  `foregroundServiceType="location"` and all required permissions.
- **Monetization**: `AdWrapper` (hides ads for premium), `BannerAd`,
  RevenueCat `iapService` + 3 plan cards + 7-day trial.
- **Path aliases**, TypeScript strict (no `any`), accessibility props +
  `testID`s throughout.

---

## 🔧 Prerequisites

- Node ≥ 18, JDK 17, Android Studio + SDK (compileSdk 36, minSdk 29)
- A physical Android device or emulator (geofencing/ringer need a real device)

## 🚀 Build & run locally

```bash
# 1. Install JS deps
yarn install         # or: npm install

# 2. Create your .env (already included as a template — fill real keys)
cp .env.example .env

# 3. Drop in Firebase config
#    android/app/google-services.json   (from Firebase console)

# 4. Run
yarn android         # debug build on device/emulator
```

### Quality gates
```bash
yarn typecheck       # tsc --noEmit  → currently 0 errors
yarn lint
yarn test            # Jest unit tests
```

### Release build
```bash
cd android && ./gradlew assembleRelease   # or bundleRelease for AAB
```

---

## 🔑 Environment variables (`.env`)

All secrets are read **only** through `src/config/env.ts` (never hardcoded).
Fill these in `.env` (see `.env.example`):
Firebase keys, `GOOGLE_MAPS_API_KEY`, `GOOGLE_WEB_CLIENT_ID`, AdMob unit IDs,
`REVENUECAT_API_KEY`. The Google Maps key is injected into the manifest via a
`manifestPlaceholder` in `android/app/build.gradle`.

Deploy Firestore rules from `firestore.rules`.

---

## ⚠️ Important integration notes / deviations

1. **Merging with your RN-init `android/` folder.** This repo ships the app
   source, native Kotlin modules, `AndroidManifest.xml`, `MainApplication.kt`,
   `MainActivity.kt`, Gradle files and `res/`. If your existing repo already
   has a working `android/` from `react-native init`, **keep its Gradle
   wrapper (`gradlew`, `gradle/`) and `debug.keystore`**, and merge these files
   in (the package is `com.silentsync.app`).
2. **Not compiled here.** No Android toolchain existed in the generation
   environment, so native compilation was not performed. Expect to run
   `yarn android` locally and resolve any device-specific autolinking the first
   time.
3. **`@types/` alias → `@app-types/`.** The spec's Rule 6 listed a `@types/`
   path alias, but TypeScript reserves `@types/` for `.d.ts` packages, which
   breaks compilation. The alias is implemented as **`@app-types/`** instead
   (all other aliases match the spec exactly). This is the one deliberate
   deviation, made so the project type-checks cleanly.
4. **Gradle files use Groovy** (`build.gradle`) rather than the spec's Kotlin
   DSL (`.kts`), to match the proven RN 0.87 template and reduce build risk.
5. **Permissions** are requested contextually with graceful
   denied/blocked handling (`src/shared/utils/permissionUtils.ts`).
6. **Geofencing / ringer control only work on a real device build** — not in
   any JS-only preview.

---

## 📁 Structure

```
src/
├── app/          App, Providers, ErrorBoundary
├── config/       env, firebase, maps, ads, iap, queryClient
├── theme/        4 themes, store (MMKV), ThemeContext + useTheme()
├── navigation/   Root/Auth/Main(tabs) + per-tab stacks
├── features/     auth, zones, profiles, sharing, settings, premium
└── shared/       components (ui/layout/feedback/ads), hooks, services,
                  utils, constants, types
android/app/src/main/java/com/silentsync/app/
├── modules/{ringer,dnd,geofence}
├── services/LocationForegroundService.kt
└── receivers/{GeofenceBroadcastReceiver,BootReceiver}.kt
```

Owl mascots live in `src/assets/images/` and are mapped per theme in
`src/assets/images/index.ts`.
