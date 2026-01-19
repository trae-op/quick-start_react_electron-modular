import { Menu, Tray } from "electron";
import path from "node:path";
import { icons, menu } from "../config.js";
import { Injectable } from "@devisfuture/electron-modular";
import { getAssetsPath, isPlatform } from "../@shared/utils.js";
import type { TMenuItem } from "../types.js";

const trayMenu: TMenuItem[] = [
  {
    label: menu.labels.app,
    name: "app",
  },
  {
    label: menu.labels.quit,
    name: "quit",
  },
];

let tray: Tray | undefined = undefined;

@Injectable()
export class TrayService {
  trayMenu: TMenuItem[] = trayMenu;

  constructor() {}

  buildTray(items?: TMenuItem[]): void {
    if (tray === undefined) {
      tray = new Tray(
        path.join(
          getAssetsPath(),
          isPlatform("darwin") ? icons.trayIconTemplate : icons.trayIcon,
        ),
      );
    }

    tray.setContextMenu(
      Menu.buildFromTemplate(items !== undefined ? items : trayMenu),
    );
  }

  destroyTray(): void {
    if (tray !== undefined) {
      tray.destroy();
      tray = undefined;
    }
  }
}
