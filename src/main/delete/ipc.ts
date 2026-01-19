import {
  Inject,
  IpcHandler,
  getWindow as getWindows,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { ipcMainHandle, ipcMainOn } from "../@shared/utils.js";
import { ITEMS_PROVIDER } from "./tokens.js";
import type { TItemsProvider } from "./types.js";

@IpcHandler()
export class DeleteIpc {
  private itemId: string | undefined;
  constructor(@Inject(ITEMS_PROVIDER) private itemsProvider: TItemsProvider) {}

  onInit({ getWindow }: TParamOnInit<TWindows["delete"]>): void {
    const deleteWindow = getWindow("window:delete");

    ipcMainOn("deleteWindow", async (_event, payload) => {
      if (payload.id === undefined) {
        return;
      }

      await deleteWindow.create({
        hash: `window:delete/${payload.id}`,
      });
      this.itemId = payload.id;
    });

    ipcMainOn("closeDeleteWindow", () => {
      this.hideDeleteWindow();
    });

    ipcMainHandle("items:delete", async (payload) => {
      if (payload?.id === undefined) {
        return undefined;
      }

      const deletedId = this.itemsProvider.deleteItem(payload.id);
      this.hideDeleteWindow();

      return { id: deletedId };
    });
  }

  private hideDeleteWindow(): void {
    if (this.itemId === undefined) {
      return;
    }

    const window = getWindows(`window:delete/${this.itemId}`);

    if (window !== undefined) {
      window.hide();
    }
  }
}
