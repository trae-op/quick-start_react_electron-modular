import { Menu, Tray } from "electron";
import path from "node:path";
import { icons, menu } from "../config.js";
import { Injectable } from "@devisfuture/electron-modular";
import { isDev, isPlatform } from "../$shared/utils.js";
import type { TItem } from "./types.js";
import { getAssetsPath } from "../$shared/pathResolver.js";

const trayMenu: TItem[] = [
  {
    label: menu.labels.showApp,
    name: "show",
  },
  {
    label: menu.labels.checkUpdate,
    name: "check-update",
    visible: !isDev(),
  },
  {
    label: menu.labels.resources,
    name: "resources",
    visible: false,
  },
  {
    label: menu.labels.quit,
    name: "quit",
  },
];

let tray: Tray | undefined = undefined;

@Injectable()
export class TrayService {
  trayMenu: TItem[] = trayMenu;

  constructor() {}

  buildTray(items?: TItem[]): void {
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
