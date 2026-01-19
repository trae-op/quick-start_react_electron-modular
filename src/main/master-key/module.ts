import { RgModule } from "@devisfuture/electron-modular";
import { MasterKeyIpc } from "./ipc.js";
import { MasterKeyWindow } from "./window.js";

@RgModule({
  ipc: [MasterKeyIpc],
  windows: [MasterKeyWindow],
})
export class MasterKeyModule {}
