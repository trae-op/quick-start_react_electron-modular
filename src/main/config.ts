import dotenv from "dotenv";
import path from "node:path";
import { isDev } from "./@shared/utils.js";

const envPath = path.join(process.resourcesPath, ".env");
dotenv.config(!isDev() ? { path: envPath } : undefined);

export const backgroundColor = "#242424";

export const windows: TWindows = {
  main: "window:main",
  preloadApp: "window:preload-app",
  add: "window:add",
};

export const folders = {
  distRenderer: "dist-renderer",
  distMain: "dist-main",
  download: "app-update",
};

export const menu = {
  labels: {
    app: "App",
    showApp: "Show",
    quit: "Quit",
    devTools: "Developer tools",
  },
};

export const icons = {
  trayIconTemplate: "16x16.png",
  trayIcon: "16x16.png",
  notificationIcon: "72x72.png",
};
