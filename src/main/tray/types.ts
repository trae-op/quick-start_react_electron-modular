import { type MenuItem, type MenuItemConstructorOptions } from "electron";

export type TCustomName = {
  name?: "show" | "quit";
};

export interface IMenuItemConstructorOptions
  extends MenuItemConstructorOptions, TCustomName {}

export interface IMenuItem extends MenuItem, TCustomName {}

export type TItem = IMenuItemConstructorOptions | IMenuItem;
