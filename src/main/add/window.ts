import { WindowManager } from "@devisfuture/electron-modular";
import type { TWindowManager } from "../types.js";
import { backgroundColor } from "../config.js";

@WindowManager<TWindows["add"]>({
  hash: "window:add",
  isCache: true,
  options: {
    width: 350,
    height: 300,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
    backgroundColor,
  },
})
export class AddWindow implements TWindowManager {
  isSync = false;
  constructor() {}

  onWebContentsDidFinishLoad(): void {}
}
