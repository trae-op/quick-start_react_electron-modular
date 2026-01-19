import { BrowserWindow } from "electron";
import { WindowManager } from "@devisfuture/electron-modular";
import { ipcWebContentsSend } from "../$shared/utils.js";
import { getStore } from "../$shared/store.js";
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
  },
})
export class MasterKeyWindow implements TWindowManager {
  isSync = false;
  constructor() {}

  onWebContentsDidFinishLoad(): void {
    this.isSync = true;
  }

  onShow(window: BrowserWindow): void {
    if (this.isSync) {
      const masterKey = getStore("masterKey");

      ipcWebContentsSend("masterKey", window.webContents, {
        isMasterKey: Boolean(masterKey),
      });
    }
  }
}
