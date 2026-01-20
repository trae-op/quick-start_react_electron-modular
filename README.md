# Quick Start — react + electron-modular ✅

**A minimal demo app that shows how to use the `@devisfuture/electron-modular` package.**  
See the package on npm: [@devisfuture/electron-modular](https://www.npmjs.com/package/@devisfuture/electron-modular)

This repository contains a _very simple_ Todo List application built with Electron + React used only to demonstrate how the `@devisfuture/electron-modular` package structures an Electron app into modular parts (main modules, IPC, preload, and renderer windows).

---

## 🔧 What this project demonstrates

- Modular main process code using `@devisfuture/electron-modular` (modules like `add`, `delete`, `items`, `app`, `menu`).
- Simple IPC and typed messaging between renderer and main.
- A React renderer that opens windows (Add, Delete, Main) and shows a tiny Todo list UI.
- Lightweight, easy-to-read example code to learn integration patterns.

## 🚀 Features

- Add and remove simple todo items
- Demonstrates module-based windows and IPC handlers
- Transpiles TypeScript for Electron main process and bundles React with Vite

## 📁 Project structure (high level)

- `src/main/` — main process sources and modular components
- `src/renderer/` — React UI and window components
- `dist-main/` — transpiled main process output (for distribution/runtime)

## 🧭 Quick start

- Install dependencies:

  ```bash
  npm install
  ```

- Start development (React + Electron):

  ```bash
  npm run dev
  ```

- Build the app:

  ```bash
  npm run build
  ```

- Run TypeScript transpilation for Electron main code (used by dev script):

  ```bash
  npm run transpile:electron
  ```

> ⚠️ Note: Development runs React dev server (Vite) and a transpiled Electron main process simultaneously.

## 💡 Notes

- This is intentionally minimal — the UI and data persistence are basic on purpose (the goal is to show how `@devisfuture/electron-modular` organizes an app, not to be a feature-complete todo app).
- Explore `src/main` and `src/renderer` to see how modules, IPC, and windows are wired.

---

**Author:** traeop

**License:** MIT
