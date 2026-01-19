import { ipcMainOn } from "../../$shared/utils.js";
import {
  IpcHandler,
  TWindowFactory,
  type TIpcHandlerInterface,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { CacheWindowsService } from "../services/cacheWindows.js";

@IpcHandler()
export class ResourcesOpenIpc implements TIpcHandlerInterface {
  constructor(private cacheWindowsService: CacheWindowsService) {}

  onInit({
    getWindow,
  }: TParamOnInit<
    | TWindows["updateResource"]
    | TWindows["addResource"]
    | TWindows["deleteResource"]
  >) {
    const updateResourceWindow = getWindow("window/resource/update");
    const addResourceWindow = getWindow("window/resource/add");
    const deleteResourceWindow = getWindow("window/resource/delete");

    this.ipcOpenUpdateResource(updateResourceWindow);
    this.ipcOpenAddResource(addResourceWindow);
    this.ipcOpenDeleteResource(deleteResourceWindow);
  }

  private ipcOpenUpdateResource(window: TWindowFactory): void {
    ipcMainOn("openUpdateResource", async (_, { id }) => {
      const updateResourceWindow = await window.create({
        hash: `window/resource/update/${id}`,
      });

      if (updateResourceWindow !== undefined) {
        this.cacheWindowsService.setResourceWindows(
          "updateResourceWindow",
          updateResourceWindow,
        );
      }
    });
  }

  private ipcOpenAddResource(window: TWindowFactory): void {
    ipcMainOn("openAddResource", async () => {
      const addResourceWindow = await window.create();

      if (addResourceWindow !== undefined) {
        this.cacheWindowsService.setResourceWindows(
          "addResourceWindow",
          addResourceWindow,
        );
      }
    });
  }

  private ipcOpenDeleteResource(window: TWindowFactory): void {
    ipcMainOn("openDeleteResource", async (_, { id }) => {
      const deleteResourceWindow = await window.create({
        hash: `window/resource/delete/${id}`,
      });

      if (deleteResourceWindow !== undefined) {
        this.cacheWindowsService.setResourceWindows(
          "deleteResourceWindow",
          deleteResourceWindow,
        );
      }
    });
  }
}
