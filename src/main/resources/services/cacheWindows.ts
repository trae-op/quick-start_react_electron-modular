import { BrowserWindow } from "electron";
import { Injectable } from "@devisfuture/electron-modular";
import type { TCacheResourceWindows, TNamesResourceWindows } from "./types.js";

const resourceWindows = new Map<
  keyof TCacheResourceWindows,
  TCacheResourceWindows[keyof TCacheResourceWindows]
>();

@Injectable()
export class CacheWindowsService {
  constructor() {}

  setResourceWindows(name: TNamesResourceWindows, window: BrowserWindow): void {
    resourceWindows.set(name, window);
  }

  getResourceWindows(name: TNamesResourceWindows): BrowserWindow | undefined {
    return resourceWindows.get(name);
  }
}
