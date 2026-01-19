import { RgModule } from "@devisfuture/electron-modular";
import { ItemsModule } from "../items/module.js";
import { AddIpc } from "./ipc.js";
import { AddWindow } from "./window.js";

@RgModule({
  imports: [ItemsModule],
  ipc: [AddIpc],
  windows: [AddWindow],
})
export class AddModule {}
