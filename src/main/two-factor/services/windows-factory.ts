import { BrowserWindow } from "electron";
import { Injectable, type TWindowCreate } from "@devisfuture/electron-modular";
import type { TNameWindows } from "./types.js";

let qaWindow: TWindowCreate | undefined = undefined;
let verifyWindow: TWindowCreate | undefined = undefined;

@Injectable()
export class TwoFactorWindowsFactoryService {
  private qaWindow: BrowserWindow | undefined = undefined;
  private verifyWindow: BrowserWindow | undefined = undefined;

  constructor() {}

  async createWindow(nameWindow: TNameWindows) {
    if (nameWindow === "window:two-factor-qa" && qaWindow !== undefined) {
      if (this.qaWindow !== undefined) {
        this.qaWindow.show();
      } else {
        this.qaWindow = await qaWindow();
      }
    }

    if (
      nameWindow === "window:two-factor-verify" &&
      verifyWindow !== undefined
    ) {
      if (this.verifyWindow !== undefined) {
        this.verifyWindow.show();
      } else {
        this.verifyWindow = await verifyWindow();
      }
    }
  }

  addWindow(nameWindow: TNameWindows, window: TWindowCreate) {
    if (nameWindow === "window:two-factor-qa") {
      qaWindow = window;
    }

    if (nameWindow === "window:two-factor-verify") {
      verifyWindow = window;
    }
  }
}
