import {
  IpcHandler,
  type TIpcHandlerInterface,
} from "@devisfuture/electron-modular";
import { ipcMainHandle } from "../@shared/utils.js";
import { ItemsService } from "./service.js";

@IpcHandler()
export class ItemsIpc implements TIpcHandlerInterface {
  constructor(private itemsService: ItemsService) {}

  onInit(): void {
    ipcMainHandle("items:get", () => this.itemsService.getItems());
  }
}
