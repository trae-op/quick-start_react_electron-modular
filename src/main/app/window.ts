import { app, BrowserWindow, Event } from "electron";
import {
  Inject,
  WindowManager,
  destroyWindows,
} from "@devisfuture/electron-modular";
import { isDev } from "../@shared/utils.js";
import { menu } from "../config.js";
import type { TWindowManager } from "../types.js";
import { MENU_PROVIDER } from "./tokens.js";
import type { TMenuProvider } from "./types.js";
import { backgroundColor } from "../config.js";

@WindowManager<TWindows["main"]>({
  hash: "window:main",
  isCache: true,
  options: {
    resizable: isDev(),
    show: false,
    width: 350,
    height: 500,
    backgroundColor,
  },
})
export class AppWindow implements TWindowManager {
  private isWillClose = false;

  constructor(
    @Inject(MENU_PROVIDER) private readonly menuProvider: TMenuProvider,
  ) {
    app.on("before-quit", () => {
      this.isWillClose = true;

      destroyWindows();
    });
  }

  onWebContentsDidFinishLoad(window: BrowserWindow): void {
    this.buildMenu(window);
  }

  private buildMenu(window: BrowserWindow): void {
    this.menuProvider.buildMenu(
      this.menuProvider.getMenu().map((item) => {
        if (item.name === "app") {
          item.submenu = [
            {
              label: menu.labels.devTools,
              click: () => window.webContents.openDevTools(),
            },
            {
              label: menu.labels.quit,
              click: () => app.quit(),
            },
          ];
        }

        return item;
      }),
    );
  }

  onShow(): void {
    this.isWillClose = false;
  }

  onClose(event: Event, window: BrowserWindow): void {
    if (this.isWillClose) {
      return;
    }

    event.preventDefault();
    window.hide();
    if (app.dock) {
      app.dock.hide();
    }
  }
}
