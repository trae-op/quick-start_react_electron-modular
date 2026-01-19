import { type MenuItem, type MenuItemConstructorOptions } from "electron";

type TCustomName = {
  name: "app" | "quit";
};

type TMenuItemConstructorOptions = MenuItemConstructorOptions & TCustomName;

type TMenuItem = TMenuItemConstructorOptions | (MenuItem & TCustomName);

export type TDestroyProcess = {
  error?: any;
  message: string;
  title: string;
};

export type TMenuProvider = {
  getMenu: () => TMenuItem[];
  buildMenu: (items?: TMenuItem[]) => void;
};
