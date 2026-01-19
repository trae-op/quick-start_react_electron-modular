import {
  IpcHandler,
  getWindow as getWindows,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { ipcMainHandle, ipcMainOn } from "../@shared/utils.js";
import { ItemsService } from "../items/service.js";

@IpcHandler()
export class AddIpc {
  constructor(private itemsService: ItemsService) {}

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

      const item = this.itemsService.addItem(title);
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
