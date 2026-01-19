import { RgModule } from "@devisfuture/electron-modular";
import { ItemsModule } from "../items/module.js";
import { ItemsService } from "../items/service.js";

import { DeleteIpc } from "./ipc.js";
import { DeleteWindow } from "./window.js";
import type { TItemsProvider } from "./types.js";
import { ITEMS_PROVIDER } from "./tokens.js";

@RgModule({
  imports: [ItemsModule],
  ipc: [DeleteIpc],
  windows: [DeleteWindow],
  providers: [
    {
      provide: ITEMS_PROVIDER,
      useFactory: (itemsService: ItemsService): TItemsProvider => ({
        deleteItem: (id: string) => itemsService.deleteItem(id),
      }),
      inject: [ItemsService],
    },
  ],
})
export class DeleteModule {}
