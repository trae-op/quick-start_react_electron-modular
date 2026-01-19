import { randomUUID } from "node:crypto";
import {
  Injectable,
  getWindow as getWindows,
} from "@devisfuture/electron-modular";
import { getElectronStorage, setElectronStorage } from "../@shared/store.js";
import { ipcWebContentsSend } from "../@shared/utils.js";

@Injectable()
export class ItemsService {
  getItems(): TItem[] {
    return getElectronStorage("items") ?? [];
  }

  addItem(title: string): TItem {
    const items = this.getItems();
    const newItem: TItem = {
      id: randomUUID(),
      title,
    };

    const nextItems = [...items, newItem];
    setElectronStorage("items", nextItems);
    this.broadcastItems(nextItems);

    return newItem;
  }

  deleteItem(id: string): string {
    const items = this.getItems();
    const nextItems = items.filter((item) => item.id !== id);

    setElectronStorage("items", nextItems);
    this.broadcastItems(nextItems);

    return id;
  }

  broadcastItems(items: TItem[] = this.getItems()): void {
    const window = getWindows<TWindows["main"]>("window:main");

    if (window !== undefined) {
      ipcWebContentsSend("items", window.webContents, items);
    }
  }
}
