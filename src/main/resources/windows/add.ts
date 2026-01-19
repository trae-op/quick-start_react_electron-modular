import { WindowManager } from "@devisfuture/electron-modular";
import type { TWindowManager } from "../../types.js";

@WindowManager<TWindows["addResource"]>({
  hash: "window/resource/add",
  isCache: true,
  options: {
    width: 400,
    height: 500,
  },
})
export class AddWindow implements TWindowManager {
  constructor() {}

  onWebContentsDidFinishLoad(): void {}
}
