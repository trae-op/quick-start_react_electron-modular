import { WindowManager } from "@devisfuture/electron-modular";
import type { TWindowManager } from "../types.js";

@WindowManager<TWindows["masterKey"]>({
  hash: "window:master-key",
  isCache: true,
  options: {
    width: 350,
    height: 300,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
    backgroundColor: "#242424",
  },
})
export class MasterKeyWindow implements TWindowManager {
  isSync = false;
  constructor() {}

  onWebContentsDidFinishLoad(): void {}
}
