import {
  Inject,
  IpcHandler,
  getWindow as getWindows,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { ipcMainHandle, ipcMainOn } from "../@shared/utils.js";
import type { TItemsProvider } from "./types.js";
import { ITEMS_PROVIDER } from "./tokens.js";

@IpcHandler()
export class AddIpc {
  constructor(@Inject(ITEMS_PROVIDER) private itemsProvider: TItemsProvider) {}

  onInit({ getWindow }: TParamOnInit<TWindows["add"]>): void {
    const addWindow = getWindow("window:add");

    ipcMainOn("addWindow", async () => {
      await addWindow.create();
    });

    this.ipcAddItem();
  }

  private ipcAddItem(): void {
    ipcMainHandle("items:add", async (payload) => {
      const title = payload?.title?.trim();

      if (!title) {
        return undefined;
      }

      const item = this.itemsProvider.addItem(title);
      this.hideAddWindow();

      return item;
    });
  }

  private hideAddWindow(): void {
    const window = getWindows<TWindows["add"]>("window:add");
    if (window !== undefined) {
      window.hide();
    }
  }
}
