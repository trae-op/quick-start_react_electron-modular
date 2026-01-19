import type { TItem } from "../menu/types.js";
import type { TItem as TItemTray } from "../tray/types.js";

export type TDestroyProcess = {
  error?: any;
  message: string;
  title: string;
};

export type TMenuProvider = {
  getMenu: () => TItem[];
  buildMenu: (items?: TItem[]) => void;
};

export type TTrayProvider = {
  getTray: () => TItemTray[];
  buildTray: (items?: TItemTray[]) => void;
  destroyTray: () => void;
};
