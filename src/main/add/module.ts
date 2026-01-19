import { RgModule } from "@devisfuture/electron-modular";
import { AddIpc } from "./ipc.js";
import { AddWindow } from "./window.js";

@RgModule({
  ipc: [AddIpc],
  windows: [AddWindow],
})
export class AddModule {}
