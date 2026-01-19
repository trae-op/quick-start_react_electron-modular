import {
  IpcHandler,
  getWindow as getWindows,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { ipcMainHandle, ipcMainOn } from "../@shared/utils.js";

@IpcHandler()
export class AddIpc {
  constructor() {}

  onInit({ getWindow }: TParamOnInit<TWindows["add"]>): void {
    const addWindow = getWindow("window:add");

    ipcMainOn("addWindow", async () => {
      await addWindow.create();
    });

    this.ipcPostMasterKey();
  }

  private ipcPostMasterKey(): void {
    ipcMainHandle("post", async (payload) => {
      console.log("Received master key title:", payload?.title);
      this.hideAddWindow();

      return undefined;
    });
  }

  private hideAddWindow(): void {
    const window = getWindows<TWindows["add"]>("window:add");
    if (window !== undefined) {
      window.hide();
    }
  }
}
