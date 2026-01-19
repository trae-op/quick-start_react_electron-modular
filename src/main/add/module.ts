import { RgModule } from "@devisfuture/electron-modular";
import { ItemsModule } from "../items/module.js";
import { ItemsService } from "../items/service.js";
import { AddIpc } from "./ipc.js";
import { AddWindow } from "./window.js";
import { ITEMS_PROVIDER } from "./tokens.js";
import type { TItemsProvider } from "./types.js";

@RgModule({
  imports: [ItemsModule],
  ipc: [AddIpc],
  providers: [
    {
      provide: ITEMS_PROVIDER,
      useFactory: (itemsService: ItemsService): TItemsProvider => ({
        addItem: (title: string) => itemsService.addItem(title),
      }),
      inject: [ItemsService],
    },
  ],
  windows: [AddWindow],
})
export class AddModule {}
