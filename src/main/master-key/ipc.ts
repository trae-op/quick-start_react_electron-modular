import {
  IpcHandler,
  getWindow as getWindows,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { ipcMainHandle, ipcMainOn } from "../@shared/utils.js";

@IpcHandler()
export class MasterKeyIpc {
  constructor() {}

  onInit({ getWindow }: TParamOnInit<TWindows["masterKey"]>): void {
    const masterKeyWindow = getWindow("window:master-key");

    ipcMainOn("masterKeyWindow", async () => {
      await masterKeyWindow.create();
    });

    this.ipcPostMasterKey();
  }

  private ipcPostMasterKey(): void {
    ipcMainHandle("postMasterKey", async (payload) => {
      this.hideMasterKeyWindow();

      return undefined;
    });
  }

  private hideMasterKeyWindow(): void {
    const window = getWindows<TWindows["masterKey"]>("window:master-key");
    if (window !== undefined) {
      window.hide();
    }
  }
}
