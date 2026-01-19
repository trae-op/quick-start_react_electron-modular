import { RgModule } from "@devisfuture/electron-modular";
import { ItemsIpc } from "./ipc.js";
import { ItemsService } from "./service.js";

@RgModule({
  ipc: [ItemsIpc],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
