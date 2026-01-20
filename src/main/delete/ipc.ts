import { ipcMain, type IpcMainEvent } from "electron";
import {
  Inject,
  IpcHandler,
  getWindow as getWindows,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { ITEMS_PROVIDER } from "./tokens.js";
import type { TItemsProvider } from "./types.js";

@IpcHandler()
export class DeleteIpc {
  private itemId: string | undefined;
  constructor(@Inject(ITEMS_PROVIDER) private itemsProvider: TItemsProvider) {}

  onInit({ getWindow }: TParamOnInit<TWindows["delete"]>): void {
    const deleteWindow = getWindow("window:delete");

    ipcMain.on(
      "deleteWindow",
      async (_: IpcMainEvent, payload: TEventPayloadSend["deleteWindow"]) => {
        if (payload.id === undefined) {
          return;
        }

        await deleteWindow.create({
          hash: `window:delete/${payload.id}`,
        });
        this.itemId = payload.id;
      },
    );

    ipcMain.on("closeDeleteWindow", () => {
      this.hideDeleteWindow();
    });

    ipcMain.handle(
      "items:delete",
      (_, payload?: TEventSendInvoke["items:delete"]) => {
        if (payload?.id === undefined) {
          return undefined;
        }

        const deletedId = this.itemsProvider.deleteItem(payload.id);
        this.hideDeleteWindow();

        return { id: deletedId };
      },
    );
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
