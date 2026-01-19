import {
  TParamOnInit,
  TIpcHandlerInterface,
  IpcHandler,
  getWindow as getWindows,
} from "@devisfuture/electron-modular";
import { ipcMainOn } from "../@shared/utils.js";

@IpcHandler()
export class AppIpc implements TIpcHandlerInterface {
  constructor() {}

  async onInit({ getWindow }: TParamOnInit<TWindows["main"]>) {
    const mainWindow = getWindow("window:main");
    const window = await mainWindow.create();

    ipcMainOn("closePreloadWindow", async () => {
      const preloadAppWindow =
        getWindows<TWindows["preloadApp"]>("window:preload-app");
      if (preloadAppWindow !== undefined) {
        preloadAppWindow.hide();
      }

      if (window !== undefined) {
        window.show();
      }
    });
  }
}
