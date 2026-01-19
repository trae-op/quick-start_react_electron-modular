import { Menu } from "electron";
import { menu } from "../config.js";
import { Injectable } from "@devisfuture/electron-modular";
import { isPlatform } from "../$shared/utils.js";
import type { TItem } from "./types.js";

const defaultMenu: TItem[] = [
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
  {
    label: "Edit",
    name: "edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteAndMatchStyle" },
      { role: "delete" },
      { role: "selectAll" },
    ],
  },
];

@Injectable()
export class MenuService {
  menu: TItem[] = defaultMenu;

  constructor() {}

  buildMenu(items?: TItem[]): void {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate(items !== undefined ? items : defaultMenu),
    );
  }
}
