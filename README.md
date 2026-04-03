# 🚗 Nomad Drive

![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?style=flat-square&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red?style=flat-square)

> A modern, mobile-first vehicle rental platform for adventure seekers. Browse, favorite, and schedule rentals for off-road vehicles — Buggies, UTVs, SUVs, and Quadricycles — right from your phone.

---

## ✨ Features

- 🔐 **Multi-method Authentication** — Email/password login, OAuth via Clerk, and biometric (Face ID / Fingerprint) sign-in
- 🚙 **Vehicle Catalog** — Browse available rentals filtered by type, transmission, and availability
- ❤️ **Favorites** — Save vehicles for quick access later
- 📅 **Trip Scheduling** — Book and manage your rental reservations in one place
- 👤 **User Profile** — Manage personal info and account preferences
- 🌙 **Dark & Light Mode** — Respects your system preference, with a manual override
- 🔔 **Push Notifications** — Stay updated on booking status via OneSignal
- 📊 **Analytics & Crash Reporting** — Powered by Firebase Analytics and Crashlytics
- 🔒 **Secure Token Storage** — Auth tokens persisted safely with MMKV

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React Native 0.81](https://reactnative.dev) + [Expo Bare SDK 54](https://expo.dev) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org) |
| **Routing** | [Expo Router v6](https://expo.github.io/router) — file-based navigation |
| **State Management** | [Zustand v4](https://zustand-demo.pmnd.rs) |
| **Persistence** | [react-native-mmkv v4](https://github.com/mrousavy/react-native-mmkv) |
| **Styling** | [Styled Components v6](https://styled-components.com) with dark/light themes |
| **Authentication** | [Clerk](https://clerk.com) (OAuth + email/password) + `expo-local-authentication` (biometrics) |
| **HTTP Client** | [Axios](https://axios-http.com) with request/response interceptors |
| **Form Validation** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Push Notifications** | [OneSignal](https://onesignal.com) |
| **Analytics & Crashes** | [Firebase Analytics + Crashlytics](https://firebase.google.com) |
| **Icons** | [Phosphor React Native](https://phosphoricons.com) |
| **Package Manager** | [Yarn 4 (Berry)](https://yarnpkg.com) |

---

## ✅ Prerequisites

Make sure you have the following installed and configured before running the project:

| Requirement | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org) | 18+ | LTS recommended |
| [Yarn](https://yarnpkg.com) | 4.x (Berry) | Enabled via `corepack enable` |
| [Expo CLI](https://docs.expo.dev/get-started/installation/) | Latest | `npm install -g expo-cli` |
| [Android Studio](https://developer.android.com/studio) | Latest | Required for Android builds |
| [Xcode](https://developer.apple.com/xcode/) | 15+ | Required for iOS builds (macOS only) |
| [EAS CLI](https://docs.expo.dev/eas/) | Latest | Required for cloud builds only |

---

## 🔑 Environment Variables & Secret Files

### 1. `.env` file

Create a `.env` file in the project root with the following variables:

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_your_clerk_publishable_key_here
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

You can obtain your Clerk publishable key from the [Clerk Dashboard](https://dashboard.clerk.com).

### 2. Firebase Configuration Files

Firebase requires platform-specific config files that are **not included in the repository**. Download them from your [Firebase Console](https://console.firebase.google.com) and place them at:

| Platform | File | Location |
|---|---|---|
| iOS | `GoogleService-Info.plist` | `ios/GoogleService-Info.plist` |
| Android | `google-services.json` | `android/app/google-services.json` |

### 3. OneSignal App ID

The OneSignal App ID is hardcoded in `src/app/_layout.tsx`. To use your own instance, replace the ID in the `OneSignal.initialize()` call with your App ID from the [OneSignal Dashboard](https://app.onesignal.com).

---

## 🚀 Installation

Follow these steps to get the project running locally:

**1. Clone the repository**

```nomad-drive/README.md
git clone https://github.com/your-username/nomad-drive.git
cd nomad-drive
```

**2. Install dependencies**

```nomad-drive/README.md
corepack enable
yarn install
```

**3. Set up environment variables**

```nomad-drive/README.md
cp .env.example .env
# Then fill in your EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
```

**4. Add Firebase config files**

Place `GoogleService-Info.plist` in `ios/` and `google-services.json` in `android/app/` as described in the [Environment Variables](#-environment-variables--secret-files) section.

**5. Install native dependencies (iOS only)**

```nomad-drive/README.md
cd ios && pod install && cd ..
```

---

## 📜 Scripts

### Development

| Script | Command | Description |
|---|---|---|
| **Start** | `yarn start` | Start the Expo dev server with a custom dev client |
| **Android** | `yarn android` | Run the app on a connected Android device or emulator |
| **iOS** | `yarn ios` | Run the app on a connected iOS device or simulator |

### Building — Local

| Script | Command | Description |
|---|---|---|
| **Android Debug** | `yarn build-android-dev` | Assemble a debug APK via Gradle |
| **Android Release** | `yarn build-android-release` | Bundle a release AAB via Gradle |
| **iOS Debug** | `yarn build-ios-dev` | Build a debug `.app` for the simulator via Xcode |
| **iOS Release** | `yarn build-ios-release` | Archive a release `.ipa` via Xcode |

### Building — EAS (Cloud)

| Script | Command | Description |
|---|---|---|
| **Android Dev** | `yarn build-android-dev-eas` | EAS cloud build — Android development profile |
| **Android Release** | `yarn build-android-release-eas` | EAS cloud build — Android production profile |
| **iOS Dev** | `yarn build-ios-dev-eas` | EAS cloud build — iOS development profile |
| **iOS Release** | `yarn build-ios-release-eas` | EAS cloud build — iOS production profile |

### Code Quality

| Script | Command | Description |
|---|---|---|
| **Lint** | `yarn lint` | Run ESLint + Prettier check across all TS/JS files |
| **Format** | `yarn format` | Auto-fix ESLint issues and reformat with Prettier |
| **Test** | `yarn test` | Run the Jest test suite |

---

## 📁 Project Structure

```nomad-drive/README.md
nomad-drive/
├── assets/                        # Static assets (icon, splash, adaptive icon)
├── android/                       # Android native project (Expo Bare)
├── ios/                           # iOS native project (Expo Bare)
└── src/
    ├── app/                       # Expo Router — file-based route definitions
    │   ├── _layout.tsx            # Root layout: theme, fonts, auth guard, providers
    │   ├── oauth-callback.tsx     # OAuth web redirect handler
    │   ├── oauth-native-callback.tsx # OAuth native redirect handler
    │   ├── +not-found.tsx         # 404 fallback screen
    │   ├── (auth)/                # Public route group (unauthenticated)
    │   │   ├── _layout.tsx        # Auth stack navigator
    │   │   ├── index.tsx          # Welcome screen
    │   │   ├── signIn.tsx         # Sign-in screen
    │   │   └── signUp.tsx         # Sign-up screen
    │   ├── (app)/                 # Protected route group (authenticated)
    │   │   ├── _layout.tsx        # Tab navigator (Vehicles, Trips, Favorites, Menu)
    │   │   ├── index.tsx          # Home / vehicle catalog tab
    │   │   ├── trips/             # Trips / reservations tab
    │   │   ├── favorites/         # Favorites tab
    │   │   └── menu/              # Options menu tab
    │   └── vehicle/
    │       ├── _layout.tsx        # Vehicle detail stack layout
    │       └── [id].tsx           # Dynamic vehicle detail screen
    │
    ├── screens/                   # Screen components (UI logic per screen)
    │   ├── Welcome/
    │   ├── SignIn/
    │   ├── SignUp/
    │   ├── Home/
    │   ├── VehicleDetails/
    │   ├── Favorites/
    │   ├── Trips/
    │   ├── Profile/
    │   ├── OptionsMenu/
    │   └── DevScreen/             # Internal development/debug screen
    │
    ├── components/                # Shared, reusable UI components
    │   ├── Button/
    │   ├── ButtonSelect/
    │   ├── ButtonToggle/
    │   ├── ControlledInput/       # React Hook Form-aware input wrapper
    │   ├── Header/
    │   ├── ImageSlider/
    │   ├── Screen/
    │   ├── ScreenDivider/
    │   ├── VehicleHighlightItem/  # Featured vehicle card
    │   ├── VehicleListItem/       # Compact vehicle list row
    │   ├── Bullet/
    │   └── BackButton/
    │
    ├── contexts/
    │   └── AuthProvider.tsx       # Auth context: sign-in, sign-out, biometrics, Clerk
    │
    ├── stores/                    # Zustand global state slices
    │   ├── userStore.ts           # Authenticated user data
    │   └── userConfigsStore.ts    # User preferences (dark mode, local auth, etc.)
    │
    ├── storage/
    │   └── mmkv.ts                # Three MMKV instances: user, token, config
    │
    ├── api/
    │   └── api.ts                 # Axios instance with base URL switching and interceptors
    │
    ├── interfaces/                # TypeScript interfaces / types
    │   ├── vehicle.ts             # Vehicle, Owner, VehicleImage types
    │   ├── user.ts                # User, UserRole types
    │   ├── userConfigurations.ts  # UserConfigs type
    │   └── theme.ts               # ThemeProps type for styled-components
    │
    ├── enums/
    │   └── enumsUrl.ts            # App-wide URL constants
    │
    ├── utils/
    │   └── formatCurrency.ts      # Currency formatting helper
    │
    ├── global/
    │   └── themes/                # Styled-components theme definitions
    │       ├── theme.ts           # Base theme shape
    │       ├── lightTheme.ts      # Light mode color tokens
    │       └── darkTheme.ts       # Dark mode color tokens
    │
    └── @types/                    # Global TypeScript declaration files
        ├── styled.d.ts            # Augments styled-components DefaultTheme
        ├── svg/                   # SVG module declarations
        ├── png.d.ts
        ├── jpg.d.ts
        └── gif.d.ts
```

---