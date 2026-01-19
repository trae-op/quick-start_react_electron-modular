import { BrowserWindow } from "electron";
import { WindowManager } from "@devisfuture/electron-modular";
import type { TWindowManager } from "../../types.js";

@WindowManager<TWindows["updateResource"]>({
  hash: "window/resource/update",
  isCache: true,
  options: {
    width: 400,
    height: 500,
  },
})
export class UpdateWindow implements TWindowManager {
  constructor() {}

  onWebContentsDidFinishLoad(window: BrowserWindow): void {}
}
