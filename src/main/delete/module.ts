import { RgModule } from "@devisfuture/electron-modular";
import { ItemsModule } from "../items/module.js";
import { DeleteIpc } from "./ipc.js";
import { DeleteService } from "./service.js";
import { DeleteWindow } from "./window.js";

@RgModule({
  imports: [ItemsModule],
  ipc: [DeleteIpc],
  windows: [DeleteWindow],
  providers: [DeleteService],
})
export class DeleteModule {}
