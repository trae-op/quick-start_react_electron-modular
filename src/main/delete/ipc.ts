import {
  Inject,
  IpcHandler,
  getWindow as getWindows,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { ipcMainHandle, ipcMainOn } from "../@shared/utils.js";
import { DeleteService } from "./service.js";
import { ITEMS_PROVIDER } from "./tokens.js";
import type { TItemsProvider } from "./types.js";

@IpcHandler()
export class DeleteIpc {
  constructor(
    @Inject(ITEMS_PROVIDER) private itemsProvider: TItemsProvider,
    private deleteService: DeleteService,
  ) {}

  onInit({ getWindow }: TParamOnInit<TWindows["delete"]>): void {
    const deleteWindow = getWindow("window:delete");

    ipcMainOn("deleteWindow", async (_event, payload) => {
      if (payload !== undefined) {
        this.deleteService.setTarget(payload);
      }

      await deleteWindow.create();
    });

    ipcMainOn("closeDeleteWindow", () => {
      this.hideDeleteWindow();
    });

    ipcMainHandle("deleteTarget:get", async () => {
      return this.deleteService.getTarget();
    });

    ipcMainHandle("items:delete", async (payload) => {
      if (payload?.id === undefined) {
        return undefined;
      }

      const deletedId = this.itemsProvider.deleteItem(payload.id);
      this.deleteService.clearTarget();
      this.hideDeleteWindow();

      return { id: deletedId };
    });
  }

  private hideDeleteWindow(): void {
    const window = getWindows<TWindows["delete"]>("window:delete");

    if (window !== undefined) {
      window.hide();
    }
  }
}
