# 📱 SILENTSYNC — Comprehensive Development Specification

## Smart Silence, Safe Sharing

### 🦉 AI-Ready Build Document for Cursor AI / Emergent Development

**Version 2.0 — Production-Grade · Bare React Native 0.87.0**

---

## 📑 Table of Contents

1. [Project Identity & Vision](#1-project-identity--vision)
2. [Technology Stack — Final Selections](#2-technology-stack--final-selections)
3. [Environment & Configuration](#3-environment--configuration)
4. [Project Architecture & Folder Structure](#4-project-architecture--folder-structure)
5. [Theme System — 4 Theme Variants](#5-theme-system--4-theme-variants)
6. [Functional Requirements (Complete)](#6-functional-requirements-complete)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Database Schema & Type Definitions](#8-database-schema--type-definitions)
9. [Screen Specifications](#9-screen-specifications)
10. [User Stories](#10-user-stories)
11. [API & Service Integration](#11-api--service-integration)
12. [Security Architecture](#12-security-architecture)
13. [Monetization Strategy](#13-monetization-strategy)
14. [Testing Strategy](#14-testing-strategy)
15. [Deployment & CI/CD](#15-deployment--cicd)
16. [Risk Analysis](#16-risk-analysis)
17. [Timeline & Milestones](#17-timeline--milestones)
18. [Budget Estimation](#18-budget-estimation)
19. [Success Metrics & KPIs](#19-success-metrics--kpis)
20. [Cursor AI Implementation Guide](#20-cursor-ai-implementation-guide)
21. [Appendix](#21-appendix)

---

## 1. Project Identity & Vision

### 1.1 App Identity

| Field | Value |
|-------|-------|
| **App Name** | SilentSync |
| **Tagline** | "Smart Silence, Safe Sharing" |
| **Package ID** | `com.silentsync.app` |
| **Mascot** | Owl perched on a location pin (represents wisdom, silence, and location awareness) |
| **Primary Platform** | Android (API 29+, Android 10+) |
| **Future Platform** | iOS (Phase 2) |

### 1.2 Mascot / Brand Identity — 4 Theme Variants

The SilentSync owl mascot has four distinct visual treatments that correspond directly to the app's four selectable themes:

| Theme Name | Mascot Style | Description |
|------------|-------------|-------------|
| **Minimal Light** | Line-art owl on white background | Clean black outlines, no fill — minimal, professional, light mode aesthetic |
| **Pixel Blue** | 8-bit pixel-art owl in blue tones | Retro pixel style with navy/steel blue palette — playful, nostalgic |
| **Soft Lavender** | Plush/felt textured owl in soft purple | Soft lavender/violet with cyan eyes — warm, approachable, muted |
| **Holo Dark** | Iridescent metallic owl on dark background | Chrome purple-blue holographic finish — futuristic, premium dark mode |

> These four styles map to the four UI themes the user can select in Settings. Each theme transforms the entire app's color palette, typography weight, icon style, and component appearance.

### 1.3 Vision Statement

To create the most reliable and user-friendly location-based phone automation app that seamlessly integrates into users' daily lives, reducing phone-related disruptions while enhancing personal safety through location sharing.

### 1.4 Core Value Proposition

| Problem | Solution |
|---------|----------|
| Forgetting to silence phone in meetings, classes, theaters | Automated location-based silent mode activation |
| Manual, unreliable location sharing | Secure, controlled live location sharing with trusted contacts |
| Inconvenient switching between sound profiles | Automated profile switching based on geofence triggers |
| Emergency location sharing is slow and separate from daily apps | Integrated emergency sharing within the same daily-use app |

### 1.5 Business Model

- **Free Tier:** Ad-supported (Google AdMob), limited features
- **Premium Tier:** ₹49/month subscription, unlimited features, ad-free

---

## 2. Technology Stack — Final Selections

### 2.1 Core Framework

| Technology | Selection | Version | Rationale |
|------------|-----------|---------|-----------|
| **Framework** | React Native (Bare Workflow) | **0.87.0** | Latest stable, New Architecture enabled by default, Fabric renderer, TurboModules, React 19 support |
| **React** | React | **19.1.x** | Compatible with RN 0.87, concurrent features, improved suspense |
| **Language** | TypeScript | 5.7+ | Type safety, better DX, industry standard |
| **Minimum Android SDK** | API 29 (Android 10) | — | Modern APIs, scoped storage, background location restrictions handled properly |
| **Target Android SDK** | API 36 (Android 16) | — | Latest Google Play requirements (2026) |
| **Java/Kotlin** | Kotlin preferred for native modules | 2.0+ | Modern Android development standard |
| **JDK** | JDK 17 | — | Required by RN 0.87 and modern Android Gradle Plugin |

### 2.2 State Management

| Technology | Selection | Rationale |
|------------|-----------|-----------|
| **Global State** | **Zustand** v5 | Minimal boilerplate, TypeScript-first, performant, middleware support (persist, devtools), simpler than Redux Toolkit |
| **Server State / Async** | **TanStack Query (React Query)** v5 | Caching, background refetching, optimistic updates for Firebase data |
| **Form State** | **React Hook Form** v7 + **Zod** v4 | Performant forms, schema-based validation with Zod (TypeScript-native) |

### 2.3 Local Storage

| Technology | Selection | Rationale |
|------------|-----------|-----------|
| **Key-Value Storage** | **react-native-mmkv** v3 | 30x faster than AsyncStorage, synchronous reads, encryption support, direct C++ JSI bridge |
| **Structured Local DB** | **WatermelonDB** v0.28 (if needed for offline-first complex queries) OR **Firestore offline persistence** (built-in) | WatermelonDB for complex local queries; Firestore offline mode for simple sync |
| **Secure Storage** | **react-native-keychain** v10 | For storing auth tokens, sensitive credentials using Android Keystore |

> **Decision:** Use MMKV as the primary local storage for all preferences, cached data, and Zustand persistence. Use Firestore's built-in offline persistence for synced data. Use react-native-keychain for auth tokens exclusively.

### 2.4 Navigation

| Technology | Selection | Version | Rationale |
|------------|-----------|---------|-----------|
| **Navigation** | **React Navigation** | v7 | Latest stable, static API, deep linking, TypeScript support |
| **Bottom Tabs** | `@react-navigation/bottom-tabs` | v7 | Standard tab navigation |
| **Native Stack** | `@react-navigation/native-stack` | v7 | Native performance for screen transitions |

### 2.5 UI & Styling

| Technology | Selection | Rationale |
|------------|-----------|-----------|
| **Component Library** | **Custom Components** with `StyleSheet` + theme system | Full control over 4-theme integration, no library conflicts |
| **Styling Engine** | **NativeWind** v4.1+ (TailwindCSS for RN) | Utility-first, rapid UI development, works alongside custom theme |
| **Icons** | **@react-native-vector-icons/material-design-icons** + **lucide-react-native** | Comprehensive icon sets, tree-shakeable |
| **Animations** | **React Native Reanimated** v4 | 60fps UI animations, gesture handling, new CSS-like API |
| **Gestures** | **React Native Gesture Handler** v2.20+ | Native gesture system, swipe actions |
| **Maps** | **react-native-maps** v1.20+ | Google Maps integration, New Architecture support |
| **SVG** | **react-native-svg** v15+ | For custom owl mascot rendering, custom icons |
| **Linear Gradient** | **react-native-linear-gradient** v2.8+ | For theme gradients, cards |

### 2.6 Backend & Services

| Service | Selection | Purpose |
|---------|-----------|---------|
| **Authentication** | **Firebase Auth** v22+ (`@react-native-firebase/auth`) | Email/Password, Google Sign-In, Phone OTP |
| **Database** | **Firebase Firestore** v22+ (`@react-native-firebase/firestore`) | Cloud NoSQL database, real-time sync, offline persistence |
| **Cloud Storage** | **Firebase Storage** v22+ (`@react-native-firebase/storage`) | User profile images, backup data |
| **Push Notifications** | **Firebase Cloud Messaging (FCM)** v22+ (`@react-native-firebase/messaging`) | Remote push notifications |
| **Local Notifications** | **Notifee** v9+ (`@notifee/react-native`) | Rich local notifications, channels, foreground service notifications |
| **Analytics** | **Firebase Analytics** v22+ | User behavior tracking, event logging |
| **Crash Reporting** | **Firebase Crashlytics** v22+ | Real-time crash reporting |
| **Remote Config** | **Firebase Remote Config** v22+ | Feature flags, A/B testing |

> **Note:** `@react-native-firebase` v22+ uses the modular API (v9 web-style syntax) which is required for compatibility with the latest Firebase JS SDK and React Native 0.87.

### 2.7 Native Modules & Features

| Feature | Library | Purpose |
|---------|---------|---------|
| **Geolocation** | `react-native-geolocation-service` v5.3+ | High-accuracy GPS location |
| **Background Location** | Custom native module (Kotlin) using Android FusedLocationProvider + Geofencing API | Reliable background geofencing |
| **Foreground Service** | `@notifee/react-native` (Foreground Service) + custom Kotlin | Persistent background service for location monitoring |
| **Ringer Mode Control** | Custom native module (Kotlin) using `AudioManager` | Control device silent/vibrate/normal modes |
| **DND Access** | Custom native module (Kotlin) using `NotificationManager.INTERRUPTION_FILTER` | Full Do Not Disturb control |
| **Permissions** | `react-native-permissions` v5+ | Runtime permission management |
| **Device Info** | `react-native-device-info` v14+ | Device model, OS version for analytics |
| **Network State** | `@react-native-community/netinfo` v11+ | Online/offline detection |
| **Share** | React Native built-in `Share` API | Share location via external apps |
| **Contacts** | `react-native-contacts` v8+ | Access phone contacts for sharing |
| **Google Sign-In** | `@react-native-google-signin/google-signin` v14+ | OAuth2.0 Google authentication |
| **In-App Purchases** | `react-native-purchases` (RevenueCat) v9+ | Google Play Billing, subscription management |
| **Ads** | `react-native-google-mobile-ads` v15+ | AdMob banner, interstitial, rewarded ads |
| **Splash Screen** | `react-native-bootsplash` v6+ | Native splash screen |
| **Boot Receiver** | Custom Kotlin BroadcastReceiver | Re-register geofences on device reboot |
| **WorkManager** | Custom Kotlin integration | Periodic background tasks (sync, backup) |

### 2.8 Development & Quality Tools

| Tool | Purpose |
|------|---------|
| **ESLint** v9 + **@typescript-eslint** v8 | Code linting |
| **Prettier** v3.4+ | Code formatting |
| **Husky** v9 + **lint-staged** v15 | Pre-commit hooks |
| **commitlint** v19 | Conventional commit messages |
| **TypeScript** v5.7+ | Static type checking |
| **Jest** v29 | Unit testing |
| **React Native Testing Library** v13+ | Component testing |
| **Detox** v20+ | E2E testing |
| **Flipper** / **React Native DevTools** | Development debugging (RN 0.87 uses new DevTools) |
| **Reactotron** v5+ | State inspection, API monitoring |

---

## 3. Environment & Configuration

### 3.1 Environment Variables

**ALL API keys, URLs, and sensitive configuration MUST live in `.env` files.** No hardcoded secrets anywhere in source code.

**Library:** `react-native-config` v1.5+

**File Structure:**

```
SilentSync/
├── .env                    # Default / Development environment
├── .env.staging            # Staging environment
├── .env.production         # Production environment
├── .env.example            # Template for team (committed to git)
└── .gitignore              # .env, .env.staging, .env.production MUST be listed
```

### 3.2 `.env.example` (Committed to Git)

```bash
# ============================================
# SILENTSYNC ENVIRONMENT CONFIGURATION
# ============================================
# Copy this file to .env, .env.staging, or .env.production
# and fill in your actual values.
# NEVER commit actual .env files to version control.
# ============================================

# --- App Configuration ---
APP_NAME=SilentSync
APP_BUNDLE_ID=com.silentsync.app
APP_ENV=development  # development | staging | production

# --- Firebase Configuration ---
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:android:abc123def456
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# --- Google Maps ---
GOOGLE_MAPS_API_KEY=AIzaSy_your_google_maps_key_here

# --- Google Sign-In ---
GOOGLE_WEB_CLIENT_ID=123456789012-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com

# --- AdMob ---
ADMOB_APP_ID=ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX
ADMOB_BANNER_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
ADMOB_INTERSTITIAL_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
ADMOB_REWARDED_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX

# --- Revenue Cat (if using for IAP) ---
REVENUECAT_API_KEY=your_revenuecat_public_api_key

# --- Sentry (Error Tracking - Optional, alongside Crashlytics) ---
SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx@sentry.io/xxxxxxx

# --- API Configuration ---
API_BASE_URL=https://api.silentsync.com
API_TIMEOUT=30000

# --- Feature Flags (defaults, overridden by Firebase Remote Config) ---
FEATURE_LIVE_SHARING=true
FEATURE_PREMIUM_ENABLED=true
FEATURE_ADS_ENABLED=true

# --- Build Configuration ---
VERSION_CODE=1
VERSION_NAME=1.0.0
```

### 3.3 `.gitignore` (Essential Entries)

```gitignore
# Environment files (NEVER commit actual secrets)
.env
.env.staging
.env.production
.env.local

# React Native
node_modules/
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*

# Android
android/app/build/
android/build/
android/.gradle/
android/.kotlin/
local.properties
*.keystore
!debug.keystore
google-services.json  # Managed via CI/CD secrets

# iOS (future)
ios/Pods/
ios/build/

# Misc
.DS_Store
*.log
npm-debug.*
yarn-debug.*
yarn-error.*

# IDE
.idea/
.vscode/settings.json
*.swp
*.swo

# Testing
coverage/

# Bundle
*.jsbundle

# React Native 0.87 specific
.xcode.env.local
```

### 3.4 Accessing Environment Variables in Code

```typescript
// src/config/env.ts
import Config from 'react-native-config';

interface AppConfig {
  // App
  APP_NAME: string;
  APP_ENV: 'development' | 'staging' | 'production';

  // Firebase
  FIREBASE_API_KEY: string;
  FIREBASE_PROJECT_ID: string;

  // Google Maps
  GOOGLE_MAPS_API_KEY: string;

  // Google Sign-In
  GOOGLE_WEB_CLIENT_ID: string;

  // AdMob
  ADMOB_APP_ID: string;
  ADMOB_BANNER_ID: string;
  ADMOB_INTERSTITIAL_ID: string;
  ADMOB_REWARDED_ID: string;

  // RevenueCat
  REVENUECAT_API_KEY: string;

  // API
  API_BASE_URL: string;
  API_TIMEOUT: string;

  // Feature Flags
  FEATURE_LIVE_SHARING: string;
  FEATURE_PREMIUM_ENABLED: string;
  FEATURE_ADS_ENABLED: string;
}

const env: AppConfig = {
  APP_NAME: Config.APP_NAME ?? 'SilentSync',
  APP_ENV: (Config.APP_ENV as AppConfig['APP_ENV']) ?? 'development',

  FIREBASE_API_KEY: Config.FIREBASE_API_KEY ?? '',
  FIREBASE_PROJECT_ID: Config.FIREBASE_PROJECT_ID ?? '',

  GOOGLE_MAPS_API_KEY: Config.GOOGLE_MAPS_API_KEY ?? '',
  GOOGLE_WEB_CLIENT_ID: Config.GOOGLE_WEB_CLIENT_ID ?? '',

  ADMOB_APP_ID: Config.ADMOB_APP_ID ?? '',
  ADMOB_BANNER_ID: Config.ADMOB_BANNER_ID ?? '',
  ADMOB_INTERSTITIAL_ID: Config.ADMOB_INTERSTITIAL_ID ?? '',
  ADMOB_REWARDED_ID: Config.ADMOB_REWARDED_ID ?? '',

  REVENUECAT_API_KEY: Config.REVENUECAT_API_KEY ?? '',

  API_BASE_URL: Config.API_BASE_URL ?? 'https://api.silentsync.com',
  API_TIMEOUT: Config.API_TIMEOUT ?? '30000',

  FEATURE_LIVE_SHARING: Config.FEATURE_LIVE_SHARING ?? 'true',
  FEATURE_PREMIUM_ENABLED: Config.FEATURE_PREMIUM_ENABLED ?? 'true',
  FEATURE_ADS_ENABLED: Config.FEATURE_ADS_ENABLED ?? 'true',
};

export default env;

// Helpers
export const isDev = env.APP_ENV === 'development';
export const isProduction = env.APP_ENV === 'production';
export const isFeatureEnabled = (flag: string): boolean => flag === 'true';
```

---

## 4. Project Architecture & Folder Structure

### 4.1 Architecture Pattern

**Feature-First Modular Architecture** with clean separation of concerns:

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                         │
│  Screens · Components · Navigation · Hooks (UI)                 │
├─────────────────────────────────────────────────────────────────┤
│                      APPLICATION LAYER                          │
│  Zustand Stores · TanStack Queries · Use Cases                  │
├─────────────────────────────────────────────────────────────────┤
│                       DOMAIN LAYER                              │
│  Types · Interfaces · Constants · Validation Schemas            │
├─────────────────────────────────────────────────────────────────┤
│                     INFRASTRUCTURE LAYER                        │
│  Firebase Services · Native Modules · Storage · API Clients     │
├─────────────────────────────────────────────────────────────────┤
│                      PLATFORM LAYER                             │
│  Android Native Code (Kotlin) · Foreground Services             │
│  BroadcastReceivers · WorkManager Tasks                         │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Complete Folder Structure

```
SilentSync/
│
├── .env.example                       # Environment template (committed)
├── .env                               # Local dev secrets (NOT committed)
├── .env.staging                       # Staging secrets (NOT committed)
├── .env.production                    # Production secrets (NOT committed)
├── .gitignore
├── .eslintrc.js                       # ESLint configuration
├── .prettierrc.js                     # Prettier configuration
├── babel.config.js                    # Babel config (with NativeWind, Reanimated plugins)
├── tailwind.config.js                 # NativeWind / Tailwind configuration
├── nativewind-env.d.ts                # NativeWind TypeScript declarations
├── metro.config.js                    # Metro bundler configuration
├── react-native.config.js            # RN CLI configuration
├── tsconfig.json                      # TypeScript configuration with path aliases
├── jest.config.ts                     # Jest test configuration
├── package.json
├── Gemfile                            # Ruby dependencies (Fastlane)
├── README.md
│
├── android/                           # Android native project
│   ├── app/
│   │   ├── build.gradle.kts          # App-level Gradle (Kotlin DSL)
│   │   ├── proguard-rules.pro
│   │   ├── google-services.json      # Firebase config (NOT in git, injected via CI/CD)
│   │   └── src/
│   │       └── main/
│   │           ├── AndroidManifest.xml
│   │           ├── java/com/silentsync/app/
│   │           │   ├── MainActivity.kt
│   │           │   ├── MainApplication.kt
│   │           │   │
│   │           │   ├── modules/                    # Custom Native Modules
│   │           │   │   ├── ringer/
│   │           │   │   │   ├── RingerModeModule.kt     # AudioManager control
│   │           │   │   │   └── RingerModePackage.kt
│   │           │   │   ├── dnd/
│   │           │   │   │   ├── DNDModule.kt             # Do Not Disturb control
│   │           │   │   │   └── DNDPackage.kt
│   │           │   │   └── geofence/
│   │           │   │       ├── GeofenceModule.kt         # Geofence registration
│   │           │   │       └── GeofencePackage.kt
│   │           │   │
│   │           │   ├── services/                   # Background Services
│   │           │   │   ├── LocationForegroundService.kt  # Persistent location monitoring
│   │           │   │   └── LiveSharingService.kt         # Live location sharing updates
│   │           │   │
│   │           │   └── receivers/                  # Broadcast Receivers
│   │           │       ├── GeofenceBroadcastReceiver.kt  # Geofence ENTER/EXIT events
│   │           │       ├── BootReceiver.kt               # Re-register geofences on boot
│   │           │       └── WorkManagerInitializer.kt     # Periodic sync tasks
│   │           │
│   │           └── res/                            # Android resources
│   │               ├── drawable/
│   │               ├── mipmap-*/                    # App icons (all densities)
│   │               ├── values/
│   │               │   ├── strings.xml
│   │               │   ├── colors.xml
│   │               │   └── styles.xml
│   │               └── xml/
│   │                   └── network_security_config.xml
│   │
│   ├── build.gradle.kts              # Project-level Gradle
│   ├── gradle.properties
│   └── settings.gradle.kts
│
├── src/                               # ========== SOURCE CODE ==========
│   │
│   ├── app/                           # App entry point & providers
│   │   ├── App.tsx                    # Root component with providers
│   │   ├── Providers.tsx             # All context/provider wrappers
│   │   └── ErrorBoundary.tsx         # Global error boundary
│   │
│   ├── config/                        # App configuration
│   │   ├── env.ts                    # Environment variable access (from .env)
│   │   ├── firebase.ts               # Firebase initialization
│   │   ├── maps.ts                   # Google Maps config
│   │   ├── ads.ts                    # AdMob configuration
│   │   ├── iap.ts                    # In-App Purchase config
│   │   └── queryClient.ts           # TanStack Query client setup
│   │
│   ├── theme/                         # ========== 4-THEME SYSTEM ==========
│   │   ├── index.ts                  # Theme exports & provider
│   │   ├── ThemeContext.tsx           # Theme React Context + hook
│   │   ├── themeStore.ts             # Zustand store for theme selection (persisted via MMKV)
│   │   ├── colors.ts                 # Color palettes for all 4 themes
│   │   ├── typography.ts             # Font styles per theme
│   │   ├── spacing.ts               # Spacing scale (consistent)
│   │   ├── borderRadius.ts          # Border radius tokens
│   │   ├── shadows.ts               # Shadow definitions per theme
│   │   ├── componentStyles.ts       # Pre-built component style variants
│   │   └── themes/                   # Individual theme definitions
│   │       ├── minimalLight.ts       # Theme 1: Minimal Light (line-art owl)
│   │       ├── pixelBlue.ts          # Theme 2: Pixel Blue (8-bit owl)
│   │       ├── softLavender.ts       # Theme 3: Soft Lavender (plush owl)
│   │       └── holoDark.ts           # Theme 4: Holo Dark (metallic owl)
│   │
│   ├── navigation/                    # Navigation setup
│   │   ├── index.tsx                 # Navigation container & linking
│   │   ├── RootNavigator.tsx         # Auth check → Auth or Main navigator
│   │   ├── AuthNavigator.tsx         # Login, Signup, ForgotPassword, Onboarding
│   │   ├── MainNavigator.tsx         # Bottom tabs + nested stacks
│   │   ├── HomeStack.tsx             # Home → ZoneDetails → AddEditZone
│   │   ├── SharingStack.tsx          # LocationSharing → ShareDetails
│   │   ├── ProfileStack.tsx          # Profiles → AddEditProfile
│   │   ├── SettingsStack.tsx         # Settings → Subscription → About → Help
│   │   └── types.ts                  # Navigation type definitions
│   │
│   ├── features/                      # ========== FEATURE MODULES ==========
│   │   │
│   │   ├── auth/                      # Authentication feature
│   │   │   ├── screens/
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── SignupScreen.tsx
│   │   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   │   └── OnboardingScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── SocialLoginButtons.tsx
│   │   │   │   ├── AuthForm.tsx
│   │   │   │   └── OTPInput.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useOnboarding.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts       # Firebase Auth wrapper
│   │   │   ├── store/
│   │   │   │   └── authStore.ts         # Zustand auth state
│   │   │   ├── schemas/
│   │   │   │   └── authSchemas.ts       # Zod validation for login/signup forms
│   │   │   └── types.ts
│   │   │
│   │   ├── zones/                     # Zone Management feature
│   │   │   ├── screens/
│   │   │   │   ├── HomeScreen.tsx        # Dashboard with zone list
│   │   │   │   ├── AddEditZoneScreen.tsx  # Map + form for zone creation/editing
│   │   │   │   └── ZoneDetailsScreen.tsx  # Full zone info & actions
│   │   │   ├── components/
│   │   │   │   ├── ZoneCard.tsx
│   │   │   │   ├── ZoneList.tsx
│   │   │   │   ├── ZoneMapView.tsx       # Interactive map for zone selection
│   │   │   │   ├── RadiusSlider.tsx
│   │   │   │   ├── SoundModeSelector.tsx
│   │   │   │   ├── ZoneStatusBadge.tsx
│   │   │   │   ├── CurrentStatusCard.tsx  # Shows current sound mode / active zone
│   │   │   │   └── QuickActionFAB.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useZones.ts           # TanStack Query hooks for zone CRUD
│   │   │   │   ├── useZoneForm.ts
│   │   │   │   └── useZoneStatus.ts
│   │   │   ├── services/
│   │   │   │   └── zoneService.ts        # Firestore zone CRUD operations
│   │   │   ├── store/
│   │   │   │   └── zoneStore.ts          # Zustand for local zone state / UI state
│   │   │   ├── schemas/
│   │   │   │   └── zoneSchemas.ts        # Zod validation for zone forms
│   │   │   └── types.ts
│   │   │
│   │   ├── profiles/                  # Profile Management feature
│   │   │   ├── screens/
│   │   │   │   ├── ProfilesScreen.tsx
│   │   │   │   └── AddEditProfileScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── ProfileCard.tsx
│   │   │   │   ├── ProfileList.tsx
│   │   │   │   ├── IconPicker.tsx
│   │   │   │   └── ColorPicker.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useProfiles.ts
│   │   │   ├── services/
│   │   │   │   └── profileService.ts
│   │   │   ├── store/
│   │   │   │   └── profileStore.ts
│   │   │   ├── schemas/
│   │   │   │   └── profileSchemas.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── sharing/                   # Location Sharing feature
│   │   │   ├── screens/
│   │   │   │   ├── LocationSharingScreen.tsx
│   │   │   │   └── LiveShareViewScreen.tsx   # View for recipients (web link or in-app)
│   │   │   ├── components/
│   │   │   │   ├── ShareMethodSelector.tsx
│   │   │   │   ├── DurationPicker.tsx
│   │   │   │   ├── RecipientSelector.tsx
│   │   │   │   ├── ActiveShareCard.tsx
│   │   │   │   └── ShareStatusBanner.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useLocationSharing.ts
│   │   │   │   └── useLiveLocation.ts
│   │   │   ├── services/
│   │   │   │   └── sharingService.ts
│   │   │   ├── store/
│   │   │   │   └── sharingStore.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── settings/                  # Settings & Preferences feature
│   │   │   ├── screens/
│   │   │   │   ├── SettingsScreen.tsx
│   │   │   │   ├── AppearanceSettingsScreen.tsx  # 4-theme selector here
│   │   │   │   ├── NotificationSettingsScreen.tsx
│   │   │   │   ├── LocationSettingsScreen.tsx
│   │   │   │   ├── DataSettingsScreen.tsx
│   │   │   │   ├── AccountScreen.tsx
│   │   │   │   ├── AboutScreen.tsx
│   │   │   │   └── HelpSupportScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── SettingsGroup.tsx
│   │   │   │   ├── SettingsItem.tsx
│   │   │   │   ├── ThemeCard.tsx           # Visual theme preview card
│   │   │   │   └── ThemeSelector.tsx       # Grid of 4 theme options
│   │   │   ├── hooks/
│   │   │   │   └── useSettings.ts
│   │   │   ├── services/
│   │   │   │   └── settingsService.ts
│   │   │   └── store/
│   │   │       └── settingsStore.ts
│   │   │
│   │   └── premium/                   # Premium / Subscription feature
│   │       ├── screens/
│   │       │   └── SubscriptionScreen.tsx
│   │       ├── components/
│   │       │   ├── PlanCard.tsx
│   │       │   ├── FeatureComparisonTable.tsx
│   │       │   └── PaywallModal.tsx
│   │       ├── hooks/
│   │       │   └── usePremium.ts
│   │       ├── services/
│   │       │   └── iapService.ts         # Google Play Billing / RevenueCat
│   │       ├── store/
│   │       │   └── premiumStore.ts
│   │       └── types.ts
│   │
│   ├── shared/                        # ========== SHARED / COMMON ==========
│   │   │
│   │   ├── components/                # Reusable UI components
│   │   │   ├── ui/                    # Atomic UI primitives
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Text.tsx            # Themed text component
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── BottomSheet.tsx
│   │   │   │   ├── Switch.tsx
│   │   │   │   ├── Slider.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Avatar.tsx
│   │   │   │   ├── Divider.tsx
│   │   │   │   ├── Chip.tsx
│   │   │   │   ├── Skeleton.tsx         # Loading placeholder
│   │   │   │   ├── Toast.tsx
│   │   │   │   └── IconButton.tsx
│   │   │   │
│   │   │   ├── layout/               # Layout components
│   │   │   │   ├── Screen.tsx          # Safe area + scroll wrapper
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Section.tsx
│   │   │   │   └── EmptyState.tsx
│   │   │   │
│   │   │   ├── feedback/             # Feedback components
│   │   │   │   ├── LoadingScreen.tsx
│   │   │   │   ├── ErrorScreen.tsx
│   │   │   │   ├── PermissionRequest.tsx
│   │   │   │   └── ConfirmDialog.tsx
│   │   │   │
│   │   │   └── ads/                  # Ad components
│   │   │       ├── BannerAd.tsx
│   │   │       └── AdWrapper.tsx       # Conditionally shows/hides ads for premium
│   │   │
│   │   ├── hooks/                     # Shared custom hooks
│   │   │   ├── useLocation.ts
│   │   │   ├── usePermissions.ts
│   │   │   ├── useGeofence.ts
│   │   │   ├── useNetwork.ts
│   │   │   ├── useAppState.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useInterval.ts
│   │   │   └── useKeyboard.ts
│   │   │
│   │   ├── services/                  # Shared infrastructure services
│   │   │   ├── location/
│   │   │   │   ├── locationService.ts       # GPS location fetching
│   │   │   │   ├── geofenceService.ts       # Geofence registration/management
│   │   │   │   └── geocodingService.ts      # Reverse geocoding
│   │   │   ├── sound/
│   │   │   │   └── soundManager.ts          # Native ringer mode control bridge
│   │   │   ├── notification/
│   │   │   │   ├── notificationService.ts   # Local notifications via Notifee
│   │   │   │   └── fcmService.ts            # Remote push notifications
│   │   │   ├── storage/
│   │   │   │   ├── mmkvStorage.ts           # MMKV instance & helpers
│   │   │   │   └── secureStorage.ts         # Keychain wrapper
│   │   │   ├── analytics/
│   │   │   │   └── analyticsService.ts      # Firebase Analytics wrapper
│   │   │   └── background/
│   │   │       └── backgroundService.ts     # Background task management
│   │   │
│   │   ├── utils/                     # Pure utility functions
│   │   │   ├── helpers.ts
│   │   │   ├── formatters.ts           # Date, distance, address formatting
│   │   │   ├── validators.ts
│   │   │   ├── geoUtils.ts             # Distance calculation, coordinate helpers
│   │   │   ├── permissionUtils.ts
│   │   │   └── platform.ts             # Platform-specific utilities
│   │   │
│   │   ├── constants/                 # App-wide constants
│   │   │   ├── index.ts
│   │   │   ├── screenNames.ts
│   │   │   ├── storageKeys.ts          # MMKV key constants
│   │   │   ├── limits.ts              # Free/Premium limits
│   │   │   └── defaults.ts            # Default values
│   │   │
│   │   └── types/                     # Shared TypeScript types
│   │       ├── zone.types.ts
│   │       ├── profile.types.ts
│   │       ├── user.types.ts
│   │       ├── sharing.types.ts
│   │       ├── theme.types.ts
│   │       ├── navigation.types.ts
│   │       └── common.types.ts
│   │
│   └── assets/                        # Static assets
│       ├── images/
│       │   ├── owl-minimal-light.svg   # Theme 1 mascot
│       │   ├── owl-pixel-blue.png      # Theme 2 mascot
│       │   ├── owl-soft-lavender.png   # Theme 3 mascot
│       │   ├── owl-holo-dark.png       # Theme 4 mascot
│       │   ├── onboarding/
│       │   │   ├── onboarding-1.svg
│       │   │   ├── onboarding-2.svg
│       │   │   └── onboarding-3.svg
│       │   └── empty-states/
│       │       ├── no-zones.svg
│       │       └── no-shares.svg
│       ├── fonts/
│       │   ├── Inter-Regular.ttf
│       │   ├── Inter-Medium.ttf
│       │   ├── Inter-SemiBold.ttf
│       │   ├── Inter-Bold.ttf
│       │   ├── JetBrainsMono-Regular.ttf  # For Pixel theme
│       │   └── Quicksand-Medium.ttf       # For Soft Lavender theme
│       ├── icons/
│       │   └── app-icon.png
│       └── lottie/                    # Lottie animations (optional)
│           ├── location-pulse.json
│           └── success-check.json
│
├── __tests__/                         # Test files (mirrors src/ structure)
│   ├── features/
│   │   ├── auth/
│   │   ├── zones/
│   │   └── ...
│   ├── shared/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── setup.ts                       # Test setup & mocks
│
├── e2e/                               # Detox E2E tests
│   ├── auth.test.ts
│   ├── zones.test.ts
│   ├── sharing.test.ts
│   └── jest.config.ts
│
├── scripts/                           # Build & utility scripts
│   ├── generate-env.sh               # Generate .env from CI/CD secrets
│   ├── bump-version.sh               # Version bumping
│   └── clean.sh                      # Clean build artifacts
│
├── docs/                              # Documentation
│   ├── ARCHITECTURE.md
│   ├── THEME_SYSTEM.md
│   ├── NATIVE_MODULES.md
│   └── DEPLOYMENT.md
│
└── fastlane/                          # Fastlane deployment config
    ├── Fastfile
    ├── Appfile
    └── Matchfile
```

### 4.3 TypeScript Path Aliases (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es2023"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@config/*": ["src/config/*"],
      "@theme/*": ["src/theme/*"],
      "@navigation/*": ["src/navigation/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"],
      "@assets/*": ["src/assets/*"],
      "@types/*": ["src/shared/types/*"],
      "@hooks/*": ["src/shared/hooks/*"],
      "@services/*": ["src/shared/services/*"],
      "@utils/*": ["src/shared/utils/*"],
      "@constants/*": ["src/shared/constants/*"],
      "@components/*": ["src/shared/components/*"]
    }
  },
  "extends": "@react-native/typescript-config/tsconfig.json",
  "include": ["src/**/*", "nativewind-env.d.ts"],
  "exclude": ["node_modules", "babel.config.js", "metro.config.js", "jest.config.ts"]
}
```

**Corresponding `babel.config.js` for path resolution:**

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@app': './src/app',
          '@config': './src/config',
          '@theme': './src/theme',
          '@navigation': './src/navigation',
          '@features': './src/features',
          '@shared': './src/shared',
          '@assets': './src/assets',
          '@types': './src/shared/types',
          '@hooks': './src/shared/hooks',
          '@services': './src/shared/services',
          '@utils': './src/shared/utils',
          '@constants': './src/shared/constants',
          '@components': './src/shared/components',
        },
      },
    ],
    'react-native-worklets/plugin', // Reanimated v4 uses worklets plugin (MUST be last)
  ],
};
```

> **Important Note for RN 0.87 + Reanimated 4:** Reanimated v4 has moved its worklets plugin to a separate package `react-native-worklets/plugin`. Ensure this is installed alongside `react-native-reanimated`.

---

## 5. Theme System — 4 Theme Variants

### 5.1 Theme Architecture

The app supports 4 user-selectable themes, persisted via MMKV through Zustand. Each theme changes:

- Color palette (backgrounds, surfaces, primary/accent, text)
- Typography (font family, weights)
- Component styles (border radius, shadows, icon style)
- Mascot image (owl variant)
- Map style (standard vs. dark)

### 5.2 Theme Definitions

#### Theme 1: Minimal Light 🦉 (Line-art Owl)

```typescript
// src/theme/themes/minimalLight.ts
import { ThemeDefinition } from '@types/theme.types';

export const minimalLight: ThemeDefinition = {
  id: 'minimal-light',
  name: 'Minimal Light',
  description: 'Clean and professional',
  mascotImage: require('@assets/images/owl-minimal-light.svg'),
  isDark: false,

  colors: {
    // Backgrounds
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceVariant: '#F0F1F3',
    card: '#FFFFFF',

    // Primary
    primary: '#1A1A2E',
    primaryLight: '#16213E',
    primaryDark: '#0F0F1A',
    onPrimary: '#FFFFFF',

    // Accent
    accent: '#E94560',
    accentLight: '#FF6B6B',
    onAccent: '#FFFFFF',

    // Text
    textPrimary: '#1A1A2E',
    textSecondary: '#6C757D',
    textTertiary: '#ADB5BD',
    textInverse: '#FFFFFF',

    // Borders & Dividers
    border: '#E9ECEF',
    divider: '#DEE2E6',

    // Status
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',

    // Silent Mode Indicators
    silentMode: '#6C63FF',
    vibrateMode: '#FF9F43',
    normalMode: '#2ED573',

    // Map
    mapZoneCircle: 'rgba(108, 99, 255, 0.15)',
    mapZoneStroke: '#6C63FF',

    // Misc
    overlay: 'rgba(0, 0, 0, 0.5)',
    skeleton: '#E9ECEF',
    ripple: 'rgba(26, 26, 46, 0.1)',
  },

  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    sizes: {
      xs: 10,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    full: 9999,
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
    },
  },

  componentDefaults: {
    buttonBorderRadius: 8,
    cardBorderRadius: 12,
    inputBorderRadius: 8,
    iconSize: 24,
    avatarSize: 40,
  },
};
```

#### Theme 2: Pixel Blue 🦉 (8-bit Pixel-art Owl)

```typescript
// src/theme/themes/pixelBlue.ts
import { ThemeDefinition } from '@types/theme.types';

export const pixelBlue: ThemeDefinition = {
  id: 'pixel-blue',
  name: 'Pixel Blue',
  description: 'Retro gaming vibes',
  mascotImage: require('@assets/images/owl-pixel-blue.png'),
  isDark: false,

  colors: {
    background: '#E8F0FE',
    surface: '#D4E4FC',
    surfaceVariant: '#C0D4F0',
    card: '#FFFFFF',

    primary: '#1A3A5C',
    primaryLight: '#2B5F8E',
    primaryDark: '#0D2137',
    onPrimary: '#FFFFFF',

    accent: '#4A90D9',
    accentLight: '#6BB5FF',
    onAccent: '#FFFFFF',

    textPrimary: '#1A3A5C',
    textSecondary: '#4A6FA5',
    textTertiary: '#8AAED4',
    textInverse: '#FFFFFF',

    border: '#B8D4F0',
    divider: '#A8C8E8',

    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',

    silentMode: '#3F51B5',
    vibrateMode: '#FF5722',
    normalMode: '#4CAF50',

    mapZoneCircle: 'rgba(74, 144, 217, 0.2)',
    mapZoneStroke: '#4A90D9',

    overlay: 'rgba(26, 58, 92, 0.6)',
    skeleton: '#C0D4F0',
    ripple: 'rgba(74, 144, 217, 0.15)',
  },

  typography: {
    fontFamily: {
      regular: 'JetBrainsMono-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    sizes: {
      xs: 10,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 28,
      '4xl': 34,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.7,
    },
  },

  spacing: {
    xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, '2xl': 32, '3xl': 40, '4xl': 48,
  },

  borderRadius: {
    none: 0, sm: 2, md: 4, lg: 6, xl: 8, '2xl': 10, full: 9999,
  },

  shadows: {
    sm: { shadowColor: '#1A3A5C', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 2 },
    md: { shadowColor: '#1A3A5C', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 4 },
    lg: { shadowColor: '#1A3A5C', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 7 },
  },

  componentDefaults: {
    buttonBorderRadius: 4,
    cardBorderRadius: 6,
    inputBorderRadius: 4,
    iconSize: 24,
    avatarSize: 40,
  },
};
```

#### Theme 3: Soft Lavender 🦉 (Plush/Felt Owl)

```typescript
// src/theme/themes/softLavender.ts
import { ThemeDefinition } from '@types/theme.types';

export const softLavender: ThemeDefinition = {
  id: 'soft-lavender',
  name: 'Soft Lavender',
  description: 'Warm and soothing',
  mascotImage: require('@assets/images/owl-soft-lavender.png'),
  isDark: false,

  colors: {
    background: '#F5F0FF',
    surface: '#EDE5FF',
    surfaceVariant: '#E0D4F5',
    card: '#FFFFFF',

    primary: '#7C4DFF',
    primaryLight: '#B47CFF',
    primaryDark: '#5A1FCC',
    onPrimary: '#FFFFFF',

    accent: '#00BCD4',
    accentLight: '#4DD0E1',
    onAccent: '#FFFFFF',

    textPrimary: '#3D2C6E',
    textSecondary: '#7E6BAD',
    textTertiary: '#B8A9D4',
    textInverse: '#FFFFFF',

    border: '#D4C5F0',
    divider: '#C9B8E8',

    success: '#66BB6A',
    warning: '#FFCA28',
    error: '#EF5350',
    info: '#42A5F5',

    silentMode: '#9C27B0',
    vibrateMode: '#FF7043',
    normalMode: '#66BB6A',

    mapZoneCircle: 'rgba(124, 77, 255, 0.15)',
    mapZoneStroke: '#7C4DFF',

    overlay: 'rgba(61, 44, 110, 0.5)',
    skeleton: '#E0D4F5',
    ripple: 'rgba(124, 77, 255, 0.1)',
  },

  typography: {
    fontFamily: {
      regular: 'Quicksand-Medium',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    sizes: {
      xs: 10, sm: 12, base: 14, md: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36,
    },
    lineHeights: { tight: 1.2, normal: 1.5, relaxed: 1.8 },
  },

  spacing: {
    xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, '2xl': 32, '3xl': 40, '4xl': 48,
  },

  borderRadius: {
    none: 0, sm: 8, md: 12, lg: 16, xl: 20, '2xl': 24, full: 9999,
  },

  shadows: {
    sm: { shadowColor: '#7C4DFF', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
    md: { shadowColor: '#7C4DFF', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
    lg: { shadowColor: '#7C4DFF', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 6 },
  },

  componentDefaults: {
    buttonBorderRadius: 16,
    cardBorderRadius: 20,
    inputBorderRadius: 12,
    iconSize: 24,
    avatarSize: 44,
  },
};
```

#### Theme 4: Holo Dark 🦉 (Iridescent Metallic Owl)

```typescript
// src/theme/themes/holoDark.ts
import { ThemeDefinition } from '@types/theme.types';

export const holoDark: ThemeDefinition = {
  id: 'holo-dark',
  name: 'Holo Dark',
  description: 'Futuristic & premium',
  mascotImage: require('@assets/images/owl-holo-dark.png'),
  isDark: true,

  colors: {
    background: '#0A0A1A',
    surface: '#141428',
    surfaceVariant: '#1E1E3A',
    card: '#1A1A35',

    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDark: '#6D28D9',
    onPrimary: '#FFFFFF',

    accent: '#06B6D4',
    accentLight: '#22D3EE',
    onAccent: '#0A0A1A',

    textPrimary: '#E8E0F0',
    textSecondary: '#A09AB8',
    textTertiary: '#6B6580',
    textInverse: '#0A0A1A',

    border: '#2D2D50',
    divider: '#252545',

    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    silentMode: '#8B5CF6',
    vibrateMode: '#F97316',
    normalMode: '#10B981',

    mapZoneCircle: 'rgba(139, 92, 246, 0.25)',
    mapZoneStroke: '#8B5CF6',

    overlay: 'rgba(0, 0, 0, 0.7)',
    skeleton: '#1E1E3A',
    ripple: 'rgba(139, 92, 246, 0.15)',
  },

  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    sizes: {
      xs: 10, sm: 12, base: 14, md: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36,
    },
    lineHeights: { tight: 1.2, normal: 1.5, relaxed: 1.75 },
  },

  spacing: {
    xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, '2xl': 32, '3xl': 40, '4xl': 48,
  },

  borderRadius: {
    none: 0, sm: 6, md: 10, lg: 14, xl: 18, '2xl': 22, full: 9999,
  },

  shadows: {
    sm: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
    md: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    lg: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  },

  componentDefaults: {
    buttonBorderRadius: 12,
    cardBorderRadius: 14,
    inputBorderRadius: 10,
    iconSize: 24,
    avatarSize: 40,
  },
};
```

### 5.3 Theme Types

```typescript
// src/shared/types/theme.types.ts
import { ImageSourcePropType } from 'react-native';

export type ThemeId = 'minimal-light' | 'pixel-blue' | 'soft-lavender' | 'holo-dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceVariant: string;
  card: string;

  primary: string;
  primaryLight: string;
  primaryDark: string;
  onPrimary: string;

  accent: string;
  accentLight: string;
  onAccent: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  border: string;
  divider: string;

  success: string;
  warning: string;
  error: string;
  info: string;

  silentMode: string;
  vibrateMode: string;
  normalMode: string;

  mapZoneCircle: string;
  mapZoneStroke: string;

  overlay: string;
  skeleton: string;
  ripple: string;
}

export interface ThemeTypography {
  fontFamily: {
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  sizes: {
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface ThemeBorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  full: number;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeShadows {
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
}

export interface ComponentDefaults {
  buttonBorderRadius: number;
  cardBorderRadius: number;
  inputBorderRadius: number;
  iconSize: number;
  avatarSize: number;
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description: string;
  mascotImage: ImageSourcePropType;
  isDark: boolean;

  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  componentDefaults: ComponentDefaults;
}
```

### 5.4 Theme Store (Zustand + MMKV Persistence)

```typescript
// src/theme/themeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { ThemeId, ThemeDefinition } from '@types/theme.types';
import { minimalLight } from './themes/minimalLight';
import { pixelBlue } from './themes/pixelBlue';
import { softLavender } from './themes/softLavender';
import { holoDark } from './themes/holoDark';

// MMKV instance for theme storage
const themeStorage = new MMKV({ id: 'theme-storage' });

// Zustand storage adapter for MMKV
const zustandMMKVStorage: StateStorage = {
  getItem: (name: string) => {
    const value = themeStorage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    themeStorage.set(name, value);
  },
  removeItem: (name: string) => {
    themeStorage.delete(name);
  },
};

// Theme registry
export const THEMES: Record<ThemeId, ThemeDefinition> = {
  'minimal-light': minimalLight,
  'pixel-blue': pixelBlue,
  'soft-lavender': softLavender,
  'holo-dark': holoDark,
};

export const THEME_LIST: ThemeDefinition[] = Object.values(THEMES);

interface ThemeState {
  themeId: ThemeId;
  theme: ThemeDefinition;
  setTheme: (id: ThemeId) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeId: 'minimal-light',
      theme: minimalLight,
      setTheme: (id: ThemeId) =>
        set({
          themeId: id,
          theme: THEMES[id],
        }),
    }),
    {
      name: 'silentsync-theme',
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: (state) => ({ themeId: state.themeId }), // Only persist the theme ID
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Rebuild the full theme from the persisted ID
          state.theme = THEMES[state.themeId] ?? minimalLight;
        }
      },
    }
  )
);
```

### 5.5 Theme Hook

```typescript
// src/theme/ThemeContext.tsx
import React, { createContext, useContext } from 'react';
import { useThemeStore } from './themeStore';
import { ThemeDefinition, ThemeId } from '@types/theme.types';

interface ThemeContextValue {
  theme: ThemeDefinition;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  isDark: boolean;
  colors: ThemeDefinition['colors'];
  typography: ThemeDefinition['typography'];
  spacing: ThemeDefinition['spacing'];
  borderRadius: ThemeDefinition['borderRadius'];
  shadows: ThemeDefinition['shadows'];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, themeId, setTheme } = useThemeStore();

  const value: ThemeContextValue = {
    theme,
    themeId,
    setTheme,
    isDark: theme.isDark,
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### 5.6 Theme Selector Component

```typescript
// src/features/settings/components/ThemeSelector.tsx
import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { THEME_LIST } from '@theme/themeStore';
import { ThemeId } from '@types/theme.types';
import { Text } from '@components/ui/Text';

export const ThemeSelector: React.FC = () => {
  const { themeId, setTheme, colors, spacing, borderRadius } = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="heading" style={{ marginBottom: spacing.md }}>
        Choose Your Theme
      </Text>
      <View style={styles.grid}>
        {THEME_LIST.map((t) => {
          const isSelected = t.id === themeId;
          return (
            <Pressable
              key={t.id}
              onPress={() => setTheme(t.id as ThemeId)}
              style={[
                styles.themeCard,
                {
                  backgroundColor: t.colors.surface,
                  borderRadius: borderRadius.lg,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? t.colors.primary : t.colors.border,
                },
              ]}
            >
              <Image
                source={t.mascotImage}
                style={styles.mascot}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: t.colors.textPrimary,
                  fontFamily: t.typography.fontFamily.semibold,
                  fontSize: t.typography.sizes.sm,
                  textAlign: 'center',
                  marginTop: spacing.sm,
                }}
              >
                {t.name}
              </Text>
              <Text
                style={{
                  color: t.colors.textSecondary,
                  fontSize: t.typography.sizes.xs,
                  textAlign: 'center',
                }}
              >
                {t.description}
              </Text>
              {isSelected && (
                <View
                  style={[
                    styles.selectedBadge,
                    { backgroundColor: t.colors.primary },
                  ]}
                >
                  <Text style={{ color: t.colors.onPrimary, fontSize: 10 }}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  themeCard: {
    width: '47%',
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  mascot: { width: 80, height: 80 },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

---

## 6. Functional Requirements (Complete)

### 6.1 Module 1: Silent Zone Management

| ID | Requirement | Details | Priority |
|----|------------|---------|----------|
| FR-1.1 | Zone Creation | Name (max 50 chars), GPS coordinates via map, Radius 50-1000m slider, Sound mode (Silent/Vibrate/Normal), Profile assignment, Active toggle | Must Have |
| FR-1.2 | Zone Editing | All fields editable, changes reflect immediately, geofence re-registered | Must Have |
| FR-1.3 | Zone Deletion | Confirmation dialog, undo 5s, geofence deregistered | Must Have |
| FR-1.4 | Zone Listing | Scrollable list, status indicators, quick toggle, search/filter | Must Have |
| FR-1.5 | Zone Limits | Free: 3 zones, Premium: Unlimited | Must Have |

### 6.2 Module 2: Geofencing & Automation Engine

| ID | Requirement | Details | Priority |
|----|------------|---------|----------|
| FR-2.1 | Geofence Detection | Fused Location Provider + Android Geofencing API, ±20m accuracy, <30s latency, <5% false positive | Must Have |
| FR-2.2 | Sound Mode Automation | Auto-silent/vibrate on ENTER, restore on EXIT, overlapping zone priority, manual override | Must Have |
| FR-2.3 | Background Operation | Works when app closed, screen off, survives restart (Boot Receiver), battery optimization compliant | Must Have |
| FR-2.4 | Notification System | Zone enter/exit notifications (silent for silent zones), persistent status notification, quick actions | Must Have |

### 6.3 Module 3: Profile Management

| ID | Requirement | Details | Priority |
|----|------------|---------|----------|
| FR-3.1 | Default Profiles | Home, Work/Office, School/College, Travel (pre-created) | Must Have |
| FR-3.2 | Custom Profiles | Name, icon, color, associated zones, default sound mode | Should Have |
| FR-3.3 | Profile Rules | One active at a time, activates associated zones only, quick switch from notification | Must Have |
| FR-3.4 | Profile Limits | Free: 2 custom, Premium: Unlimited | Must Have |
| FR-3.5 | Scheduled Profiles | Time + day based auto-switch (Premium) | Premium |

### 6.4 Module 4: Live Location Sharing

| ID | Requirement | Details | Priority |
|----|------------|---------|----------|
| FR-4.1 | Current Location Share | Google Maps link, address, timestamp, share via WhatsApp/SMS/Email/Copy | Must Have |
| FR-4.2 | Live Location Sharing | Duration selection (10min, 30min, 1hr, 2hr, Until stopped), real-time updates every 15-30s | Must Have |
| FR-4.3 | Sharing Controls | Manual stop, auto-stop on expiry, show active sharing status | Must Have |
| FR-4.4 | Free Limits | 15 min max, 1 recipient, 3 times/day | Must Have |
| FR-4.5 | Premium Limits | Unlimited duration, 5 recipients, unlimited frequency | Premium |

### 6.5 Module 5: Authentication

| ID | Requirement | Details | Priority |
|----|------------|---------|----------|
| FR-5.1 | Sign Up | Email+Password, Google Sign-In, Phone+OTP | Must Have |
| FR-5.2 | Sign In | All above methods, auto-login, 30-day session | Must Have |
| FR-5.3 | Password Requirements | Min 8 chars, 1 uppercase, 1 number, 1 special char | Must Have |
| FR-5.4 | Account Management | View/edit profile, change password, delete account (GDPR), export data | Must Have |
| FR-5.5 | Password Recovery | Send reset email, reset link works | Must Have |

### 6.6 Module 6: Settings & Preferences

| ID | Requirement | Details | Priority |
|----|------------|---------|----------|
| FR-6.1 | Location Settings | Accuracy (High/Balanced/Low), update interval, permission status | Must Have |
| FR-6.2 | Notification Settings | Zone alerts ON/OFF, sharing alerts, daily summary, sound selection | Must Have |
| FR-6.3 | Silent Mode Settings | Default entry mode, default exit mode, vibration intensity | Must Have |
| FR-6.4 | Appearance Settings | **4 Theme Selection** (Minimal Light, Pixel Blue, Soft Lavender, Holo Dark), Language, Map style | Must Have |
| FR-6.5 | Battery Settings | Battery saver mode, background optimization | Should Have |
| FR-6.6 | Data Settings | Cloud backup (Premium), backup frequency, clear local data | Should Have |

### 6.7 Module 7: Premium Features

| Feature | Free | Premium |
|---------|------|---------|
| Number of Zones | 3 | Unlimited |
| Number of Profiles | 2 | Unlimited |
| Live Location Duration | 15 min | Unlimited |
| Live Location Recipients | 1 | 5 |
| Ads | Yes | No |
| Cloud Backup | No | Yes |
| WiFi/Bluetooth Triggers | No | Yes |
| Schedule-based Profiles | No | Yes |
| Auto-Reply Messages | No | Yes |
| Priority Support | No | Yes |
| Custom Themes | All 4 free | All 4 free |

### 6.8 Module 8: Advanced Automation (Premium)

| ID | Requirement | Details | Priority |
|----|------------|---------|----------|
| FR-8.1 | WiFi-Based Triggers | Actions on specific WiFi SSID connect/disconnect | Premium |
| FR-8.2 | Time-Based Automation | Start/end time, day selection, combine with location | Premium |
| FR-8.3 | Auto-Reply Messages | Custom message, per-app (SMS, WhatsApp), whitelist contacts | Premium |

---

## 7. Non-Functional Requirements

### 7.1 Performance

| Metric | Target |
|--------|--------|
| App launch (cold start) | < 2.5 seconds |
| Screen navigation | < 300ms |
| Zone creation save | < 1.5 seconds |
| Map load | < 2.5 seconds |
| Geofence trigger response | < 30 seconds |
| APK size | < 30 MB (RN 0.87 includes New Architecture overhead) |
| RAM (active) | < 80 MB |
| RAM (background) | < 40 MB |
| Battery (background/day) | < 5% |
| Storage | < 40 MB (with cache) |

### 7.2 Reliability

| Metric | Target |
|--------|--------|
| Uptime (server) | 99.5% |
| Geofence accuracy | 95%+ correct triggers |
| Crash-free rate | 99.5%+ |
| Background service survival | 98%+ |
| Data sync reliability | 99%+ |

### 7.3 Compatibility

| Android Version | API Level | Support |
|-----------------|-----------|---------|
| Android 10 (Q) | 29 | Minimum supported |
| Android 11 | 30 | Fully supported |
| Android 12 | 31 | Fully supported |
| Android 13 | 33 | Fully supported |
| Android 14 | 34 | Fully supported |
| Android 15 | 35 | Fully supported |
| Android 16 | 36 | Target SDK |

> **Note:** Minimum SDK is API 29 (Android 10). React Native 0.87 supports minSdk 24+ natively, but we set 29 as our minimum for modern API compatibility, better background location handling, and reduced fragmentation testing.

### 7.4 Accessibility

- TalkBack screen reader support
- Minimum touch target: 48×48 dp
- Color contrast ratio: 4.5:1 minimum (verified for all 4 themes)
- Font scaling support
- Content descriptions on all interactive elements

### 7.5 Usability

- Max 3 taps for any core task
- Onboarding tutorial for first-time users
- Contextual help tooltips
- Undo for destructive actions
- Clear error messages with actionable solutions
- Offline graceful degradation

---

## 8. Database Schema & Type Definitions

### 8.1 Firebase Firestore Collections

```
users/
└── {userId}
    ├── (user document fields)
    ├── zones/           (subcollection)
    │   └── {zoneId}
    ├── profiles/        (subcollection)
    │   └── {profileId}
    └── (settings embedded in user doc)

locationShares/
└── {shareId}
```

### 8.2 Complete TypeScript Types

```typescript
// src/shared/types/user.types.ts
import { ThemeId } from './theme.types';

export type LocationAccuracy = 'high' | 'balanced' | 'low';
export type SoundMode = 'silent' | 'vibrate' | 'normal';
export type ExitSoundMode = 'restore' | 'normal' | 'vibrate';

export interface UserSettings {
  themeId: ThemeId;
  language: string; // ISO 639-1, e.g., 'en', 'hi'
  notificationsEnabled: boolean;
  locationAccuracy: LocationAccuracy;
  defaultSoundModeOnEntry: SoundMode;
  defaultSoundModeOnExit: ExitSoundMode;
  cloudBackupEnabled: boolean;
  backupFrequency?: 'daily' | 'weekly';
  batterySaverMode: boolean;
  mapStyle: 'standard' | 'satellite' | 'dark';
  dailySummaryEnabled: boolean;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  isPremium: boolean;
  premiumExpiryDate?: Date;
  subscriptionPlan?: 'monthly' | 'quarterly' | 'yearly';
  createdAt: Date;
  lastLoginAt: Date;
  settings: UserSettings;
  onboardingCompleted: boolean;
  fcmToken?: string;
}
```

```typescript
// src/shared/types/zone.types.ts
import { SoundMode, ExitSoundMode } from './user.types';

export type ZoneStatus = 'active' | 'inactive' | 'triggered';
export type TriggerType = 'location' | 'wifi' | 'time' | 'combined';

export interface Zone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // meters, 50-1000
  address?: string; // Reverse geocoded, for display
  soundModeOnEntry: SoundMode;
  soundModeOnExit: ExitSoundMode;
  profileId: string;
  isActive: boolean;
  status: ZoneStatus;
  createdAt: Date;
  updatedAt: Date;
  // Premium fields
  triggerType?: TriggerType;
  wifiSSID?: string; // For WiFi-based trigger
  activeHoursStart?: string; // "HH:MM"
  activeHoursEnd?: string;
  activeDays?: string[];
}

export interface ZoneFormData {
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  soundModeOnEntry: SoundMode;
  soundModeOnExit: ExitSoundMode;
  profileId: string;
  isActive: boolean;
}
```

```typescript
// src/shared/types/profile.types.ts
export interface Profile {
  id: string;
  name: string;
  icon: string; // MaterialCommunityIcons name
  color: string; // Hex
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
  zoneIds: string[];
  // Premium
  activeHoursStart?: string;
  activeHoursEnd?: string;
  activeDays?: string[];
}
```

```typescript
// src/shared/types/sharing.types.ts
export type ShareStatus = 'active' | 'stopped' | 'expired';
export type ShareDuration = '10min' | '30min' | '1hr' | '2hr' | 'until_stopped';

export interface LocationShare {
  id: string;
  userId: string;
  shareUrl: string;
  isLive: boolean;
  duration: ShareDuration;
  createdAt: Date;
  expiresAt?: Date;
  stoppedAt?: Date;
  status: ShareStatus;
  recipientCount: number;
  currentLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
    updatedAt: Date;
    speed?: number;
    batteryLevel?: number;
  };
}

export interface ShareLocationData {
  latitude: number;
  longitude: number;
  address: string;
  timestamp: Date;
  googleMapsUrl: string;
  message?: string;
}
```

```typescript
// src/shared/types/navigation.types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

// Home Stack
export type HomeStackParamList = {
  HomeScreen: undefined;
  AddEditZone: { zoneId?: string }; // undefined = Add, zoneId = Edit
  ZoneDetails: { zoneId: string };
};

// Sharing Stack
export type SharingStackParamList = {
  LocationSharing: undefined;
  LiveShareView: { shareId: string };
};

// Profile Stack
export type ProfileStackParamList = {
  Profiles: undefined;
  AddEditProfile: { profileId?: string };
};

// Settings Stack
export type SettingsStackParamList = {
  Settings: undefined;
  AppearanceSettings: undefined;
  NotificationSettings: undefined;
  LocationSettings: undefined;
  DataSettings: undefined;
  Account: undefined;
  Subscription: undefined;
  About: undefined;
  HelpSupport: undefined;
};

// Bottom Tabs
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SharingTab: NavigatorScreenParams<SharingStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};
```

```typescript
// src/shared/types/common.types.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page: number;
  limit: number;
  cursor?: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}
```

### 8.3 Zod Validation Schemas

```typescript
// src/features/auth/schemas/authSchemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
    .regex(/[0-9]/, 'Must contain at least 1 number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least 1 special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
```

```typescript
// src/features/zones/schemas/zoneSchemas.ts
import { z } from 'zod';

export const zoneFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Zone name is required')
    .max(50, 'Zone name cannot exceed 50 characters')
    .trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  radius: z
    .number()
    .min(50, 'Minimum radius is 50 meters')
    .max(1000, 'Maximum radius is 1000 meters'),
  soundModeOnEntry: z.enum(['silent', 'vibrate', 'normal']),
  soundModeOnExit: z.enum(['restore', 'normal', 'vibrate']),
  profileId: z.string().min(1, 'Profile assignment is required'),
  isActive: z.boolean(),
});

export type ZoneFormData = z.infer<typeof zoneFormSchema>;
```

---

## 9. Screen Specifications

### 9.1 Complete Screen List

| Screen ID | Screen Name | Navigator | Access | Purpose |
|-----------|------------|-----------|--------|---------|
| S-01 | Splash Screen | — | All | App loading, branding (via react-native-bootsplash) |
| S-02 | Onboarding Screen | AuthNavigator | New users | 3-4 slides: feature intro, permission requests |
| S-03 | Login Screen | AuthNavigator | Unauthenticated | Email/Google/Phone login |
| S-04 | Signup Screen | AuthNavigator | Unauthenticated | Registration |
| S-05 | Forgot Password Screen | AuthNavigator | Unauthenticated | Password recovery |
| S-06 | Home Dashboard | HomeStack | Authenticated | Zone overview, current status, quick actions |
| S-07 | Add/Edit Zone Screen | HomeStack | Authenticated | Map + form for zone creation/editing |
| S-08 | Zone Details Screen | HomeStack | Authenticated | Full zone information, history, actions |
| S-09 | Profile Management Screen | ProfileStack | Authenticated | List, create, edit, switch profiles |
| S-10 | Add/Edit Profile Screen | ProfileStack | Authenticated | Profile form |
| S-11 | Location Sharing Screen | SharingStack | Authenticated | Current & live location sharing hub |
| S-12 | Settings Screen | SettingsStack | Authenticated | Settings categories list |
| S-13 | Appearance Settings | SettingsStack | Authenticated | **4-Theme Selector**, language, map style |
| S-14 | Notification Settings | SettingsStack | Authenticated | Notification preferences |
| S-15 | Location Settings | SettingsStack | Authenticated | Accuracy, permissions status |
| S-16 | Data Settings | SettingsStack | Authenticated | Backup, clear data |
| S-17 | Account Screen | SettingsStack | Authenticated | Profile info, password change, delete account |
| S-18 | Subscription Screen | SettingsStack | Authenticated | Premium plans, purchase, manage subscription |
| S-19 | About Screen | SettingsStack | Authenticated | App info, version, legal, privacy policy |
| S-20 | Help & Support Screen | SettingsStack | Authenticated | FAQs, contact support, feedback |

### 9.2 Home Dashboard (S-06) — Detailed

**Layout (top to bottom):**

1. **Header Bar**
   - App logo (owl icon, theme-appropriate) + "SilentSync" title
   - Profile avatar (tap → Account)
   - Bell icon for notifications

2. **Current Status Card** (prominent, themed)
   - Current phone sound mode indicator (icon + text: 🔇 Silent / 📳 Vibrate / 🔔 Normal)
   - Active zone name (if in a zone): "📍 In: Office Zone"
   - Automation master toggle (ON/OFF)
   - Color-coded based on current mode

3. **Active Sharing Banner** (conditional, only if sharing)
   - "📡 Sharing live location • 12 min remaining"
   - Tap to manage → S-11

4. **My Zones Section**
   - Section header: "My Zones" + "See All" link
   - Horizontal or vertical list of ZoneCards
   - Each ZoneCard shows: Name, radius, sound mode icon, status badge, toggle switch
   - Tap → S-08 Zone Details
   - Long press → context menu (Edit/Delete/Toggle)

5. **Quick Action FAB**
   - Primary FAB: "+" → S-07 Add Zone
   - Speed dial options: Share Location, Switch Profile

6. **Ad Banner** (free users only, bottom)

### 9.3 Add/Edit Zone (S-07) — Detailed

**Layout:**

1. **Header**: "Add Zone" / "Edit: [Name]", Back button, Save button (disabled until valid)

2. **Zone Name Input**: Text field, real-time character count, Zod validation

3. **Map View** (60% of screen height)
   - Interactive Google Map
   - Current location button
   - Search bar overlay (Places Autocomplete)
   - Draggable marker for zone center
   - Semi-transparent circle showing radius
   - Theme-colored zone circle (mapZoneCircle / mapZoneStroke from theme)

4. **Radius Slider**: 50m–1000m, current value displayed, circle updates in real-time

5. **Sound Mode Selector**:
   - "On Entry": Silent / Vibrate / Normal (radio group)
   - "On Exit": Restore Previous / Normal / Vibrate (radio group)

6. **Assign Profile**: Dropdown picker (existing profiles)

7. **Active Toggle**: Enable/Disable zone

8. **Delete Button** (Edit mode only): Red, with confirmation dialog

### 9.4 Appearance Settings (S-13) — Theme Selection

**This is where the 4 theme cards are displayed:**

1. **Section: "Choose Theme"**
   - 2×2 grid of ThemeCards
   - Each card shows:
     - Owl mascot image (appropriate variant)
     - Theme name
     - Theme description
     - Color strip showing primary/accent colors
     - Checkmark badge on selected theme
   - Tap to switch theme → immediate app-wide update

2. **Section: "Language"**
   - Language selector dropdown

3. **Section: "Map Style"**
   - Standard / Satellite / Dark (auto-applied on dark themes)

---

## 10. User Stories

### 10.1 Zone Management

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-1.1 | As a user, I want to create a silent zone | Zone appears in list, geofence registered, confirmation shown | Must Have |
| US-1.2 | As a user, I want to set custom radius | Slider 50-1000m, visual circle updates, saved correctly | Must Have |
| US-1.3 | As a user, I want to edit zones | All fields editable, changes immediate, geofence updated | Must Have |
| US-1.4 | As a user, I want to delete zones | Confirmation dialog, zone removed, geofence deregistered | Must Have |
| US-1.5 | As a user, I want to toggle zones | Toggle on card, immediate effect, visual feedback | Should Have |

### 10.2 Location Sharing

| ID | User Story | Priority |
|----|------------|----------|
| US-2.1 | Share current location with contact | Must Have |
| US-2.2 | Share live location for set duration | Must Have |
| US-2.3 | Stop sharing manually at any time | Must Have |
| US-2.4 | See active sharing status on home screen | Should Have |

### 10.3 Profiles

| ID | User Story | Priority |
|----|------------|----------|
| US-3.1 | Create custom profiles with icon/color | Should Have |
| US-3.2 | Quick switch between profiles | Should Have |
| US-3.3 | Set a default profile | Could Have |

### 10.4 Authentication

| ID | User Story | Priority |
|----|------------|----------|
| US-4.1 | Sign up with email, Google, or phone | Must Have |
| US-4.2 | Log in quickly with remembered session | Must Have |
| US-4.3 | Reset forgotten password | Must Have |
| US-4.4 | Delete account and all data | Must Have |

### 10.5 Theme & Personalization

| ID | User Story | Priority |
|----|------------|----------|
| US-5.1 | As a user, I want to choose from 4 visual themes so the app matches my preference | Must Have |
| US-5.2 | As a user, I want my theme choice to persist across app restarts | Must Have |
| US-5.3 | As a user, I want the theme to change immediately when I select it | Must Have |
| US-5.4 | As a user, I want to see the owl mascot change with each theme | Should Have |

### 10.6 Premium

| ID | User Story | Priority |
|----|------------|----------|
| US-6.1 | Subscribe to premium for unlimited features | Must Have |
| US-6.2 | Create unlimited zones as premium user | Must Have |
| US-6.3 | Cloud backup of zones and profiles | Should Have |
| US-6.4 | 7-day free trial before committing | Should Have |

---

## 11. API & Service Integration

### 11.1 Firebase Services (Client SDK) — Modular API (v22+)

| Service | SDK | Operations |
|---------|-----|------------|
| **Firebase Auth** | `@react-native-firebase/auth` v22+ | `signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, `signInWithCredential` (Google), `verifyPhoneNumber`, `sendPasswordResetEmail`, `signOut`, `deleteUser` |
| **Firestore** | `@react-native-firebase/firestore` v22+ | CRUD for users, zones, profiles, locationShares collections (modular API: `getFirestore()`, `collection()`, `doc()`, `getDoc()`, `setDoc()`, etc.) |
| **Cloud Messaging** | `@react-native-firebase/messaging` v22+ | `getToken`, `onMessage`, `onNotificationOpenedApp`, `setBackgroundMessageHandler` |
| **Analytics** | `@react-native-firebase/analytics` v22+ | `logEvent`, `setUserId`, `setUserProperties`, `logScreenView` |
| **Crashlytics** | `@react-native-firebase/crashlytics` v22+ | `log`, `recordError`, `setAttributes` |
| **Remote Config** | `@react-native-firebase/remote-config` v22+ | Feature flags, A/B test parameters |

> **Important:** Starting from RN Firebase v22, the modular API is the default and namespaced API is deprecated. Use `import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';` style imports.

### 11.2 Google Maps Platform

| API | Library | Purpose | Billing |
|-----|---------|---------|---------|
| Maps SDK for Android | `react-native-maps` v1.20+ | Display interactive maps | Free ($200 credit) |
| Geocoding API | HTTP REST via `fetch` | Coordinates → Address | ~$5/1000 requests |
| Places API (Autocomplete) | HTTP REST | Location search in zone creation | ~$17/1000 requests |

### 11.3 Google Play Billing

| Library | Purpose |
|---------|---------|
| `react-native-purchases` v9+ (RevenueCat) | Subscription purchase, renewal, cancellation, restoration |

> **Recommendation:** Use **RevenueCat (`react-native-purchases`)** for subscription management. It provides a server-side receipt validation layer, comprehensive analytics, and significantly simplifies subscription lifecycle handling. Free tier supports up to $2.5M in tracked revenue.

### 11.4 AdMob

| Library | Ad Types |
|---------|----------|
| `react-native-google-mobile-ads` v15+ | Banner (adaptive), Interstitial, Rewarded |

---

## 12. Security Architecture

### 12.1 Authentication Security

- **Firebase Auth** handles all password hashing (bcrypt), token generation (JWT), and session management
- Short-lived ID tokens automatically refreshed
- Failed login throttling via Firebase
- Google Sign-In uses OAuth 2.0 with server-side token verification

### 12.2 Data Security

| Layer | Mechanism |
|-------|-----------|
| In Transit | HTTPS/TLS 1.3 (all Firebase + Maps API calls) |
| At Rest (Server) | Firebase Firestore encryption at rest (Google-managed) |
| At Rest (Device) | MMKV encryption for preferences, react-native-keychain for tokens |
| API Keys | `.env` files (NOT in git), obfuscated in release builds via ProGuard/R8 |
| Android Keystore | Auth tokens stored via `react-native-keychain` |

### 12.3 Location Privacy

- Explicit runtime permission requests with clear rationale
- Background location only requested with `ACCESS_BACKGROUND_LOCATION` and user education
- Live location sessions are time-bound and auto-expire
- Location data is NOT stored on servers indefinitely (only during active shares)
- Account deletion removes ALL user data from Firestore

### 12.4 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read, write: if isOwner(userId);

      match /zones/{zoneId} {
        allow read, write: if isOwner(userId);
      }

      match /profiles/{profileId} {
        allow read, write: if isOwner(userId);
      }
    }

    // Location Shares
    match /locationShares/{shareId} {
      allow create: if isAuthenticated();
      allow read: if isAuthenticated()
                    && (resource.data.userId == request.auth.uid
                        || resource.data.shareUrl != null); // Public via share URL
      allow update, delete: if isAuthenticated()
                              && resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 13. Monetization Strategy

### 13.1 Ad Implementation (Free Tier)

**Network:** Google AdMob via `react-native-google-mobile-ads` v15+

| Ad Type | Placement | Frequency | Target eCPM (India) |
|---------|-----------|-----------|---------------------|
| **Banner** | Bottom of Home Dashboard, Zone List | Always visible, 60s refresh | $0.05–$0.20 |
| **Interstitial** | After saving zone (1 in 3), after sharing location | Max 2/hr, 6/day | $0.50–$2.00 |
| **Rewarded** | +1 temp zone (24h), +15 min sharing, 1hr ad-free | User-initiated, max 5/day | $1.00–$3.00 |

**Implementation:** All ad unit IDs from `.env` file. Premium users → ads completely hidden via `<AdWrapper>` component.

### 13.2 Subscription Pricing

| Plan | Price (INR) | Price (USD) | Discount |
|------|-------------|-------------|----------|
| Monthly | ₹49 | ~$0.59 | — |
| Quarterly | ₹129 | ~$1.55 | ~12% off |
| Yearly | ₹399 | ~$4.79 | ~32% off |

- 7-day free trial on first subscription
- 3-day grace period for failed payments
- Managed via RevenueCat or Google Play Billing directly

---

## 14. Testing Strategy

### 14.1 Test Matrix

| Category | Tool | Scope |
|----------|------|-------|
| Unit Tests | Jest v29 | Pure functions, utilities, store logic, services |
| Component Tests | React Native Testing Library v13+ | UI component rendering, interactions, theme application |
| Integration Tests | Jest + Firebase Emulator | Service-to-store integration, Firestore CRUD |
| E2E Tests | Detox v20+ | Full user flows: auth, zone creation, sharing, theme switching |
| Performance | Android Studio Profiler, Perfetto | CPU, memory, battery, startup time |
| Crash Monitoring | Firebase Crashlytics | Production crash tracking |

### 14.2 Test Devices

| Device Category | Examples | Focus |
|-----------------|----------|-------|
| Reference | Google Pixel 8/9 | Baseline Android behavior |
| High Market Share | Samsung Galaxy S24/A55 | Custom Samsung optimizations |
| Aggressive Battery | Xiaomi Redmi Note 13/14 | Background service survival |
| Mid-Range | OnePlus Nord, Moto G84 | Performance on average hardware |
| Emulators | Android Studio AVD | API level coverage (29-36) |

### 14.3 Key Test Scenarios

1. **Geofence Accuracy:** Walking/driving in/out of zones, multiple zone overlap
2. **Background Persistence:** Service survives app kill, Doze mode, device reboot
3. **Battery Impact:** 24-hour background monitoring test, measure drain
4. **Permission Flows:** Grant, deny, revoke, re-request for location/notification/DND
5. **Subscription Lifecycle:** Purchase, renewal, cancellation, restoration, grace period
6. **Theme Switching:** Verify all 4 themes apply correctly to all screens, no visual glitches
7. **Offline Mode:** Create zones offline, sync when back online
8. **Overlapping Zones:** Priority handling when entering multiple zones simultaneously
9. **New Architecture Compatibility:** Verify all third-party libraries work with Fabric/TurboModules

---

## 15. Deployment & CI/CD

### 15.1 Android Build Configuration

```kotlin
// android/app/build.gradle.kts
android {
    namespace = "com.silentsync.app"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.silentsync.app"
        minSdk = 29
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"

        // Read from .env via react-native-config
        resValue("string", "GOOGLE_MAPS_API_KEY", project.findProperty("GOOGLE_MAPS_API_KEY")?.toString() ?: "")
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}
```

### 15.2 Version Strategy

| Version | Code | Description | Target |
|---------|------|-------------|--------|
| 1.0.0 | 1 | MVP: Core geofencing, basic sharing, 4 themes | Week 8 |
| 1.1.0 | 5 | UX improvements, bug fixes from feedback | Month 3 |
| 1.2.0 | 10 | Premium features, subscription | Month 4 |
| 1.3.0 | 15 | Advanced automation, profiles | Month 5 |
| 1.4.0 | 20 | Performance optimization, polish | Month 6 |

### 15.3 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/android-build.yml
name: Android Build & Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - run: yarn lint
      - run: yarn typecheck
      - run: yarn test --coverage

  android-build:
    needs: lint-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - name: Create .env
        run: |
          echo "FIREBASE_API_KEY=${{ secrets.FIREBASE_API_KEY }}" >> .env
          echo "GOOGLE_MAPS_API_KEY=${{ secrets.GOOGLE_MAPS_API_KEY }}" >> .env
          # ... all env vars from secrets
      - name: Decode google-services.json
        run: echo "${{ secrets.GOOGLE_SERVICES_JSON }}" | base64 -d > android/app/google-services.json
      - name: Build Release APK
        run: cd android && ./gradlew assembleRelease
      - uses: actions/upload-artifact@v4
        with:
          name: app-release
          path: android/app/build/outputs/apk/release/
```

### 15.4 Deployment Process

1. **Development:** Feature branches → PR → `develop` branch
2. **Staging:** `develop` → Build → Internal Testing Track (Google Play)
3. **Production:** `develop` → `main` → Build → Phased Rollout (5% → 25% → 100%)
4. **App Bundle:** Always use `.aab` for production releases (optimized delivery)

---

## 16. Risk Analysis

### 16.1 Technical Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| TR-01 | Geofencing unreliable on certain OEMs | Medium | High | Dual approach (Fused Location + Geofencing API), extensive OEM testing, user education on battery settings |
| TR-02 | Background service killed by OS | High | Critical | Foreground service with persistent notification, Boot receiver, WorkManager fallback, user guides for battery optimization |
| TR-03 | High battery drain | Medium | High | Optimize location update intervals, use geofencing passively, battery saver mode option |
| TR-04 | DND permission complexity | Medium | High | Clear permission request flow, fallback to basic AudioManager if DND access denied |
| TR-05 | RN 0.87 New Architecture library compatibility | Medium | Medium | Verify all third-party libraries support Fabric/TurboModules, use libraries with New Architecture support badge |
| TR-06 | React 19 breaking changes | Low | Medium | Follow React 19 migration guide, test all hooks and suspense boundaries |

### 16.2 Business Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| BR-01 | Low user acquisition | Medium | High | ASO, targeted marketing, referral programs, social media |
| BR-02 | High uninstall rate | Medium | High | Smooth onboarding, reliable core feature, regular updates |
| BR-03 | Low premium conversion | High | Medium | Clear premium benefits, free trial, A/B test pricing |
| BR-04 | Competition | High | Medium | Superior UX, 4-theme differentiation, integrated sharing |

---

## 17. Timeline & Milestones

### Phase 1: MVP (Weeks 1–8)

| Week | Focus | Deliverables |
|------|-------|-------------|
| 1-2 | **Foundation** | RN 0.87 project setup, TypeScript config, path aliases, folder structure, Firebase integration (modular API), MMKV setup, 4-theme system implementation, navigation scaffolding |
| 3-4 | **Auth + Home** | Login/Signup/Forgot Password screens, Google Sign-In, Zustand auth store, Home Dashboard UI, Current Status Card |
| 5-6 | **Zones + Geofencing** | Add/Edit Zone screen with map, zone CRUD (Firestore), geofence registration (native Kotlin module), ringer mode control, background service, zone list |
| 7-8 | **Sharing + Polish** | Current location sharing, basic live sharing, AdMob integration, comprehensive testing, bug fixes, Play Store listing |

**🎯 Milestone 1: MVP on Google Play (Week 8)**

### Phase 2: Growth (Months 3–6)

| Month | Focus | Deliverables |
|-------|-------|-------------|
| 3 | **Feedback + UX** | Bug fixes, onboarding improvements, analytics review, UI refinements |
| 4 | **Premium** | RevenueCat/IAP integration, subscription screens, premium features (unlimited zones, ad-free, cloud backup) |
| 5 | **Profiles + Advanced** | Custom profiles, profile switching, WiFi triggers, time-based automation |
| 6 | **Optimization** | Performance tuning, battery optimization, auto-reply (premium), expansion planning |

**🎯 Milestone 2: Premium Live (Month 4)**
**🎯 Milestone 3: 50K Downloads (Month 6)**

---

## 18. Budget Estimation

### 18.1 Initial Costs

| Item | Cost (INR) |
|------|------------|
| Google Play Developer Account | ₹2,500 (one-time) |
| Domain Name | ₹800/year |
| Logo/Icon Design | ₹1,000–3,000 |
| Firebase (Spark Plan) | ₹0 |
| Google Maps ($200 credit) | ₹0 |
| AdMob Setup | ₹0 |
| RevenueCat (free tier) | ₹0 |
| **Total Initial** | **₹4,300–6,300** |

### 18.2 Monthly Operational Costs

| Item | Cost (INR)/month |
|------|------------------|
| Firebase (Blaze, usage-based) | ₹1,000–5,000 |
| Google Maps API | ₹500–2,000 |
| Support/Email hosting | ₹200–500 |
| CI/CD (GitHub Actions free tier) | ₹0 |
| **Total Monthly** | **₹1,700–7,500** |

### 18.3 Year 1 Projection

| | Amount |
|-|--------|
| Total Cash Outlay | ~₹95,000 |
| Expected Revenue (conservative) | ~₹30,00,000 |
| Break-Even | Month 3–4 |

---

## 19. Success Metrics & KPIs

### 19.1 Core KPIs

| Category | Metric | Target |
|----------|--------|--------|
| **Acquisition** | Total Downloads | 50,000 in 6 months |
| **Engagement** | DAU/MAU | 30%+ |
| **Retention** | D1 / D7 / D30 | 40% / 25% / 15% |
| **Feature** | Zones per user | ≥3 |
| **Feature** | % users with active zone | ≥60% |
| **Revenue** | Premium conversion | 2-3% |
| **Revenue** | ARPU | ≥₹10/month |
| **Quality** | Play Store rating | ≥4.0 stars |
| **Quality** | Crash-free rate | ≥99.5% |
| **Quality** | Battery drain (bg/day) | <5% |

---

## 20. Cursor AI Implementation Guide

### 20.1 Recommended Prompt Sequence for Cursor AI

When using Cursor AI (or any AI coding assistant) to build this app, follow this exact sequence:

#### Step 1: Project Initialization

```
Prompt: "Initialize a bare React Native 0.87.0 project with TypeScript.
Use: npx @react-native-community/cli@latest init SilentSync --version 0.87.0

Package name: com.silentsync.app
Min SDK: 29, Target SDK: 36
JDK: 17, Kotlin 2.0+
New Architecture: ENABLED (default in 0.87)

Set up path aliases in tsconfig.json and babel.config.js as specified
in the SilentSync architecture document. Install these core dependencies:
- zustand v5
- react-native-mmkv v3
- @react-navigation/native v7
- @react-navigation/native-stack v7
- @react-navigation/bottom-tabs v7
- react-native-screens v4+
- react-native-safe-area-context v5+
- react-native-reanimated v4 (with react-native-worklets/plugin)
- react-native-gesture-handler v2.20+
- react-native-config v1.5+
- react-native-bootsplash v6+
- react-native-svg v15+

Create the complete folder structure under src/ as documented."
```

#### Step 2: Environment Setup

```
Prompt: "Create the .env.example file with all required environment
variables for SilentSync (Firebase, Google Maps, AdMob, Google Sign-In,
RevenueCat). Create src/config/env.ts to type-safely access all env
vars using react-native-config. Add all .env files to .gitignore.
Ensure google-services.json is also in .gitignore."
```

#### Step 3: Theme System

```
Prompt: "Implement the complete 4-theme system for SilentSync.
Create all type definitions in src/shared/types/theme.types.ts.
Create 4 theme files: minimalLight.ts, pixelBlue.ts, softLavender.ts,
holoDark.ts with full color palettes, typography, spacing, border
radius, and shadows as specified. Create the Zustand theme store
with MMKV persistence in src/theme/themeStore.ts. Create the
ThemeContext and useTheme hook. All colors, fonts, spacing in
components should come from the active theme via useTheme()."
```

#### Step 4: Shared Components

```
Prompt: "Build the shared/reusable UI component library in
src/shared/components/ui/. Create themed components: Button, Input,
Text, Card, Modal, Switch, Slider, Badge, Avatar, Divider, Chip,
Skeleton, Toast, IconButton. Each component must use useTheme()
hook for all styling. Create layout components: Screen (with SafeArea
and ScrollView), Header, Section, EmptyState. Create feedback
components: LoadingScreen, ErrorScreen, PermissionRequest,
ConfirmDialog."
```

#### Step 5: Navigation

```
Prompt: "Set up React Navigation v7 with the full navigator
structure: RootNavigator (auth check), AuthNavigator (Onboarding,
Login, Signup, ForgotPassword), MainNavigator (Bottom Tabs with
4 tabs: Home, Sharing, Profiles, Settings), and nested stacks for
each tab. Create all navigation types in src/navigation/types.ts.
Apply the active theme to navigation (header colors, tab bar colors,
status bar)."
```

#### Step 6: Authentication Feature

```
Prompt: "Implement the complete auth feature module using the
Firebase modular API (@react-native-firebase v22+):
- Firebase Auth integration (Email, Google Sign-In, Phone OTP)
  using: import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth'
- Zustand auth store with MMKV token persistence
- Login, Signup, ForgotPassword screens with React Hook Form + Zod v4
- Google Sign-In using @react-native-google-signin/google-signin v14+
- Onboarding screen (3 slides with permission requests)
- All screens use the theme system for styling
- Auth tokens stored in react-native-keychain v10+"
```

#### Step 7: Zone Management Feature

```
Prompt: "Implement the zones feature module:
- Home Dashboard screen with current status card, zone list
- Add/Edit Zone screen with interactive Google Map (react-native-maps v1.20+),
  draggable marker, radius circle, radius slider, sound mode selector
- Zone CRUD operations via Firestore modular API (zoneService.ts)
- Zod v4 validation for zone forms
- Zustand zone store for UI state
- TanStack Query v5 hooks for Firestore data fetching with caching
- ZoneCard component with quick toggle, status badge
- Free user limit: 3 zones (enforce in UI and service layer)"
```

#### Step 8: Native Geofencing Module

```
Prompt: "Create custom Kotlin native modules for Android geofencing.
Use TurboModules (New Architecture) style since RN 0.87 has New
Architecture enabled by default:
- RingerModeModule.kt: Control AudioManager (RINGER_MODE_SILENT,
  RINGER_MODE_VIBRATE, RINGER_MODE_NORMAL)
- DNDModule.kt: Control NotificationManager Do Not Disturb
- GeofenceModule.kt: Register/unregister geofences using Google
  Fused Location Provider and Geofencing API
- GeofenceBroadcastReceiver.kt: Handle ENTER/EXIT events
- LocationForegroundService.kt: Persistent foreground service with
  notification (required for Android 14+ compliance with foreground
  service types)
- BootReceiver.kt: Re-register geofences on device reboot
- Declare all foreground service types in AndroidManifest.xml
  (location for Android 14+)
- Bridge all modules to React Native via TurboModule specs"
```

#### Step 9: Location Sharing Feature

```
Prompt: "Implement the sharing feature module:
- Current location sharing (generate Google Maps link, share via
  RN Share API)
- Live location sharing with duration picker (10min, 30min, 1hr,
  2hr, Until stopped)
- Firestore document for active shares with real-time updates using
  onSnapshot from modular API
- Background location updates during live sharing
- Active share status card on home screen
- Auto-stop when duration expires
- Free limits: 15 min max, 1 recipient, 3/day"
```

#### Step 10: Settings, Premium & Ads

```
Prompt: "Implement:
1. Settings screens: all categories as specified, including the
   4-theme selector in Appearance Settings
2. Subscription screen with 3 plan options using RevenueCat
   (react-native-purchases v9+)
3. AdMob integration with react-native-google-mobile-ads v15+:
   BannerAd component at bottom of Home, interstitial ads after
   zone save, rewarded ads for temp benefits
4. AdWrapper component that conditionally hides ads for premium users
5. Premium store (Zustand) that checks subscription status"
```

### 20.2 Critical Implementation Notes for AI

1. **Always use `useTheme()` hook** — Never hardcode colors, fonts, or spacing. Every visual property must come from the active theme.

2. **All API keys in `.env` only** — Access via `src/config/env.ts`. Never import from `.env` directly in components.

3. **MMKV for local storage** — Never use AsyncStorage. Use `react-native-mmkv` for all key-value storage and Zustand persistence.

4. **Zod for validation** — Never use manual if/else validation. All form validation through Zod v4 schemas.

5. **Feature-first modules** — Each feature (auth, zones, profiles, sharing, settings, premium) is self-contained with its own screens, components, hooks, services, store, and types.

6. **Path aliases** — Always use `@features/`, `@shared/`, `@theme/`, etc. Never use relative paths like `../../../`.

7. **TypeScript strict mode** — No `any` types. All functions, props, and state fully typed.

8. **Background service is native Kotlin** — The geofencing engine must be a native Android service, not a JS background task.

9. **React Navigation v7** — Use the latest static API patterns, typed navigation props.

10. **React Native 0.87.0 + React 19** — New Architecture is ON by default. Use Fabric renderer and TurboModules where applicable. Ensure all third-party libraries support New Architecture.

11. **Firebase Modular API** — Use `@react-native-firebase` v22+ modular API only. Do NOT use the deprecated namespaced API (e.g., `firebase.auth()`). Use `import { getAuth } from '@react-native-firebase/auth'` instead.

12. **Reanimated v4 Worklets Plugin** — In `babel.config.js`, use `'react-native-worklets/plugin'` (not the old `'react-native-reanimated/plugin'`). Install `react-native-worklets` as a dependency.

13. **Android 14+ Foreground Service Types** — In `AndroidManifest.xml`, declare `foregroundServiceType="location"` for the location service. Required by Google Play policies.

14. **JDK 17 Required** — React Native 0.87 requires JDK 17 for Android builds. Update local dev environment and CI/CD accordingly.

---

## 21. Appendix

### 21.1 Package.json Dependencies (Key)

```json
{
  "name": "SilentSync",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "start": "react-native start",
    "lint": "eslint src/ --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "detox test -c android.emu.debug",
    "clean": "cd android && ./gradlew clean && cd .. && rm -rf node_modules/.cache"
  },
  "dependencies": {
    "react": "19.1.0",
    "react-native": "0.87.0",

    "@react-navigation/native": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "react-native-screens": "^4.4.0",
    "react-native-safe-area-context": "^5.1.0",

    "zustand": "^5.0.0",
    "@tanstack/react-query": "^5.60.0",
    "react-hook-form": "^7.54.0",
    "zod": "^4.0.0",
    "@hookform/resolvers": "^3.10.0",

    "react-native-mmkv": "^3.1.0",
    "react-native-keychain": "^10.0.0",

    "@react-native-firebase/app": "^22.0.0",
    "@react-native-firebase/auth": "^22.0.0",
    "@react-native-firebase/firestore": "^22.0.0",
    "@react-native-firebase/messaging": "^22.0.0",
    "@react-native-firebase/analytics": "^22.0.0",
    "@react-native-firebase/crashlytics": "^22.0.0",
    "@react-native-firebase/remote-config": "^22.0.0",
    "@react-native-firebase/storage": "^22.0.0",

    "@react-native-google-signin/google-signin": "^14.0.0",
    "react-native-google-mobile-ads": "^15.0.0",
    "react-native-purchases": "^9.0.0",

    "@notifee/react-native": "^9.1.0",

    "react-native-maps": "^1.20.0",
    "react-native-geolocation-service": "^5.3.1",
    "react-native-permissions": "^5.2.0",
    "@react-native-community/netinfo": "^11.4.0",
    "react-native-device-info": "^14.0.0",
    "react-native-contacts": "^8.0.0",

    "react-native-reanimated": "^4.0.0",
    "react-native-worklets": "^0.4.0",
    "react-native-gesture-handler": "^2.22.0",
    "react-native-svg": "^15.10.0",
    "react-native-linear-gradient": "^2.8.0",

    "react-native-config": "^1.5.5",
    "react-native-bootsplash": "^6.3.0",
    "@react-native-vector-icons/material-design-icons": "^12.0.0",
    "lucide-react-native": "^0.468.0",

    "nativewind": "^4.1.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@react-native/babel-preset": "0.87.0",
    "@react-native/eslint-config": "0.87.0",
    "@react-native/metro-config": "0.87.0",
    "@react-native/typescript-config": "0.87.0",
    "typescript": "^5.7.0",
    "@types/react": "^19.1.0",
    "@types/react-native": "^0.87.0",
    "eslint": "^9.15.0",
    "prettier": "^3.4.0",
    "jest": "^29.7.0",
    "@testing-library/react-native": "^13.0.0",
    "detox": "^20.30.0",
    "babel-plugin-module-resolver": "^5.0.2",
    "husky": "^9.1.0",
    "lint-staged": "^15.2.0",
    "@commitlint/cli": "^19.6.0",
    "@commitlint/config-conventional": "^19.6.0",
    "reactotron-react-native": "^5.1.0"
  }
}
```

> **Note:** Version numbers use `^` for minor/patch flexibility. Always run `yarn install` and verify compatibility. `@react-native-firebase/*` packages should all use the same major version (v22+). Reanimated v4 requires `react-native-worklets` as a peer dependency.

### 21.2 Glossary

| Term | Definition |
|------|-----------|
| **MMKV** | Efficient, small key-value storage framework developed by Tencent, 30x faster than AsyncStorage |
| **Zustand** | Small, fast, scalable state management library using simplified flux principles |
| **Zod** | TypeScript-first schema declaration and validation library |
| **TanStack Query** | Async state management for data fetching, caching, and synchronization |
| **NativeWind** | Tailwind CSS utility classes for React Native via a babel transform |
| **Notifee** | Advanced notification library for React Native (replaces deprecated RN push notification packages) |
| **RevenueCat** | Cross-platform in-app subscription management service |
| **Geofence** | Virtual geographic boundary defined by coordinates and radius |
| **FAB** | Floating Action Button — prominent circular button for primary actions |
| **MMKV-JSI** | Direct C++ bridge (JSI) making MMKV synchronous from JavaScript |
| **TurboModules** | React Native's new native module system using JSI for synchronous native calls |
| **Fabric** | React Native's new rendering system for improved performance |
| **Worklets** | JavaScript functions that run on the UI thread for smooth animations (Reanimated v4) |
| **New Architecture** | RN's modernized foundation combining Fabric + TurboModules, default in RN 0.87 |
| **Modular API** | Firebase's tree-shakeable v9+ API style using named imports |
| **eCPM** | Effective Cost Per Mille — ad revenue per 1,000 impressions |
| **ARPU** | Average Revenue Per User |
| **LTV** | Lifetime Value — total revenue from a customer over their relationship |
| **DAU/MAU** | Daily/Monthly Active Users |
| **ASO** | App Store Optimization |
| **DND** | Do Not Disturb — Android system feature for managing interruptions |

### 21.3 Contact

| Field | Value |
|-------|-------|
| **Project** | SilentSync |
| **Email** | support@silentsync.com |
| **Website** | https://silentsync.com |

---

**Document Version:** 2.0
**Last Updated:** 2026
**React Native Version:** 0.87.0
**React Version:** 19.1.0
**Status:** Ready for Implementation

---

© 2026 SilentSync. All rights reserved.