import { BrowserWindow } from "electron";
import { WindowManager } from "@devisfuture/electron-modular";
import { ipcWebContentsSend } from "../../$shared/utils.js";
import { TwoFactorRestApiService } from "../services/rest-api.js";
import type { TWindowManager } from "../../types.js";

@WindowManager<TWindows["twoFactorQA"]>({
  hash: "window:two-factor-qa",
  isCache: true,
  options: {
    width: 500,
    height: 500,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
  },
})
export class TwoFactorQAWindow implements TWindowManager {
  constructor(private twoFactorRestApiService: TwoFactorRestApiService) {}

  async onWebContentsDidFinishLoad(window: BrowserWindow) {
    const response = await this.twoFactorRestApiService.generateQA();

    // window.webContents.openDevTools();

    if (response !== undefined) {
      ipcWebContentsSend("twoFactorQA", window.webContents, response);
    }
  }
}
