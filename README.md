# electron-gp

Electron desktop app for generating, storing, and quickly copying strong passwords. It ships with a master-key lock, optional two-factor verification, and a system-tray menu for instant access to saved resources.

## Why it is useful

- Keeps credentials local-first and gated behind a user-defined master key.
- Generates complex passwords on demand with length and character-set controls.
- Streamlines daily use with one-click copy actions and a tray menu shortcut per resource.
- Supports two-factor flows and optional social login to protect critical actions.
- Auto-update support keeps the app current without manual downloads.

## Core functionality

- Home dashboard lists saved resources (e.g., Google) with copy, edit, and delete actions.
- Password generator window lets you choose length, include numbers/uppercase/special characters, and optionally update an existing key.
  ![create-gp](create-gp-gif.gif)
- Master key window to set, update, or remove the vault lock.
  ![unblock-gp](gp-unbloked-gif.gif)
- Tray menu exposes resources for quick copy/open plus update and quit shortcuts.
  ![tray-copy-gp](tray-copy-gif.gif)
- Two-factor windows handle QR enrollment and verification flows; the app currently relies on the user configuring Google Authenticator (or any other TOTP-compatible app) to scan the QR code, copy the secret, and provide the short-lived codes whenever sensitive actions require the extra factor.
- Updater window prompts when a new version is available.

## Technology stack

- Platform: Electron (multi-window app, tray, auto-updater).
- Frontend: React 19, React Router, TypeScript, Vite, Material UI + Emotion styling.
- Data & services: electron-store for persisted vault data, axios for API calls, reflect-metadata for DI-style modules.
- Build & tooling: TypeScript project references, electron-builder, ESLint, Vitest unit tests

## Project structure (high level)

- `src/main`: Electron main process modules (app bootstrap, tray, updater, auth, resources, master key, notifications, user, two-factor).
- `src/renderer`: React UI (windows for home, add/update/delete resource, master key form, updater, login, 2FA QR/verify; layouts and route guards).
- `dist-main` / `dist-renderer`: Built Electron main and renderer bundles.
