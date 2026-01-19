import { Menu } from "electron";
import { menu } from "../config.js";
import { Injectable } from "@devisfuture/electron-modular";
import { isPlatform } from "../@shared/utils.js";
import type { TMenuItem } from "../types.js";

const defaultMenu: TMenuItem[] = [
  {
    label: isPlatform("darwin") ? undefined : menu.labels.app,
    name: "app",
    submenu: [
      {
        label: menu.labels.devTools,
      },
      {
        label: menu.labels.quit,
      },
    ],
  },
];

@Injectable()
export class MenuService {
  menu: TMenuItem[] = defaultMenu;

  constructor() {}

  buildMenu(items?: TMenuItem[]): void {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate(items !== undefined ? items : defaultMenu),
    );
  }
}
