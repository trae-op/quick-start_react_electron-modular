import { app } from "electron";
import {
  IpcHandler,
  type TIpcHandlerInterface,
} from "@devisfuture/electron-modular";
import { ipcMainHandle } from "../$shared/utils.js";

@IpcHandler()
export class AppVersionIpc implements TIpcHandlerInterface {
  constructor() {}

  onInit() {
    const currentVersion = app.getVersion();
    ipcMainHandle("getVersion", () => currentVersion);
  }
}
