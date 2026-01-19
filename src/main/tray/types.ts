import { type MenuItem, type MenuItemConstructorOptions } from "electron";

export type TCustomName = {
  name?: "check-update" | "show" | "quit" | "resources";
};

export interface IMenuItemConstructorOptions
  extends MenuItemConstructorOptions,
    TCustomName {}

export interface IMenuItem extends MenuItem, TCustomName {}

export type TItem = IMenuItemConstructorOptions | IMenuItem;
