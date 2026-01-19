import type { BrowserWindow } from "electron";
import { WindowManager } from "@devisfuture/electron-modular";
import type { TWindowManager } from "../types.js";
import { backgroundColor } from "../config.js";

@WindowManager<TWindows["delete"]>({
  hash: "window:delete",
  isCache: true,
  options: {
    width: 320,
    height: 220,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    resizable: false,
    title: "",
    backgroundColor,
  },
})
export class DeleteWindow implements TWindowManager {
  isSync = false;
  constructor() {}

  onWebContentsDidFinishLoad(): void {}
}
