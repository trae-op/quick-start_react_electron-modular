import { app } from "electron";
import { Injectable, getWindow } from "@devisfuture/electron-modular";

@Injectable()
export class AppService {
  constructor() {}

  destroyTrayAndWindows(): void {
    const preloadAppWindow =
      getWindow<TWindows["preloadApp"]>("window:preload-app");

    if (preloadAppWindow !== undefined) {
      preloadAppWindow.destroy();
    }
  }

  dockHide() {
    if (app.dock) {
      app.dock.hide();
    }
  }
}
