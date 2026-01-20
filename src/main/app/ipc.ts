import { ipcMain } from "electron";
import {
  TParamOnInit,
  TIpcHandlerInterface,
  IpcHandler,
  getWindow as getWindows,
} from "@devisfuture/electron-modular";

@IpcHandler()
export class AppIpc implements TIpcHandlerInterface {
  constructor() {}

  async onInit({ getWindow }: TParamOnInit<TWindows["main"]>) {
    const mainWindow = getWindow("window:main");
    const window = await mainWindow.create();

    ipcMain.on("closePreloadWindow", () => {
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
