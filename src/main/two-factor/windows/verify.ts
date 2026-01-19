import { BrowserWindow } from "electron";
import { WindowManager } from "@devisfuture/electron-modular";
import type { TWindowManager } from "../../types.js";
@WindowManager<TWindows["twoFactorVerify"]>({
  hash: "window:two-factor-verify",
  isCache: true,
  options: {
    width: 350,
    height: 300,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
  },
})
export class TwoFactorVerifyWindow implements TWindowManager {
  constructor() {}

  onWebContentsDidFinishLoad(window: BrowserWindow) {}
}
