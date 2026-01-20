import { app } from "electron";
import path from "node:path";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isPlatform(platform: NodeJS.Platform): boolean {
  return process.platform === platform;
}

export function getAssetsPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "src/assets");
}
