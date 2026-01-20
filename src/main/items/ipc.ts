import { ipcMain } from "electron/main";
import {
  IpcHandler,
  type TIpcHandlerInterface,
} from "@devisfuture/electron-modular";
import { ItemsService } from "./service.js";

@IpcHandler()
export class ItemsIpc implements TIpcHandlerInterface {
  constructor(private itemsService: ItemsService) {}

  onInit(): void {
    ipcMain.handle("items:get", () => this.itemsService.getItems());
  }
}
