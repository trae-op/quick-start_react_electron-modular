import { BrowserWindow, clipboard, dialog } from "electron";
import {
  ipcMainHandle,
  ipcMainOn,
  ipcWebContentsSend,
} from "../../$shared/utils.js";
import {
  IpcHandler,
  getWindow as getWindows,
  Inject,
  type TIpcHandlerInterface,
} from "@devisfuture/electron-modular";
import { ResourcesService } from "../services/resources.js";
import { TEncryptedVault } from "../services/types.js";
import { CacheWindowsService } from "../services/cacheWindows.js";
import { getStore, getElectronStorage } from "../../$shared/store.js";
import { restApi } from "../../config.js";
import {
  RESOURCES_CRYPTO_PROVIDER,
  RESOURCES_TRAY_PROVIDER,
} from "../tokens.js";
import type {
  TResourcesCryptoProvider,
  TResourcesTrayProvider,
} from "../types.js";

@IpcHandler()
export class ResourcesActionsIpc implements TIpcHandlerInterface {
  constructor(
    private resourcesService: ResourcesService,
    @Inject(RESOURCES_CRYPTO_PROVIDER)
    private cryptoProvider: TResourcesCryptoProvider,
    private cacheWindowsService: CacheWindowsService,
    @Inject(RESOURCES_TRAY_PROVIDER)
    private trayProvider: TResourcesTrayProvider,
  ) {}

  onInit() {
    const mainWindow = getWindows<TWindows["main"]>("window:main");

    this.ipcDeleteResource(mainWindow);
    this.ipcPostResource(mainWindow);
    this.ipcPutResource(mainWindow);
    this.ipcGetResources();
    this.ipcGetResource();
    this.ipcCancelDeleteResource();
  }

  private ipcCancelDeleteResource(): void {
    ipcMainOn("cancelDeleteResource", () => {
      const deleteResourceWindow = this.cacheWindowsService.getResourceWindows(
        "deleteResourceWindow",
      );

      if (deleteResourceWindow !== undefined) {
        deleteResourceWindow.hide();
      }
    });
  }

  private ipcPutResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainHandle("putResource", async (payload) => {
      let encryptedVault: TEncryptedVault | undefined;
      const updateResourceWindow = this.cacheWindowsService.getResourceWindows(
        "updateResourceWindow",
      );
      const masterKey = getStore("masterKey");

      if (
        masterKey !== undefined &&
        payload !== undefined &&
        typeof payload.key === "string" &&
        payload.key.length &&
        payload.key.length
      ) {
        encryptedVault = await this.cryptoProvider.encrypt(
          masterKey,
          payload.key,
        );
      }

      if (
        payload !== undefined &&
        updateResourceWindow !== undefined &&
        typeof payload.name === "string" &&
        mainWindow !== undefined &&
        payload.id !== undefined
      ) {
        await this.resourcesService.put(payload.id, {
          name: payload.name,
          ...(encryptedVault !== undefined
            ? {
                key: encryptedVault.encryptedData,
                iv: encryptedVault.iv,
                salt: encryptedVault.salt,
              }
            : {}),
        });
        const resources = await this.getResources();

        if (resources !== undefined) {
          this.updateTrayMenu(resources);
          updateResourceWindow.hide();
          ipcWebContentsSend("resources", mainWindow.webContents, {
            items: resources,
          });
        }
      }

      return undefined;
    });
  }

  private ipcPostResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainHandle("postResource", async (payload) => {
      let encryptedVault: TEncryptedVault | undefined;
      const addResourceWindow =
        this.cacheWindowsService.getResourceWindows("addResourceWindow");
      const masterKey = getStore("masterKey");

      if (
        masterKey !== undefined &&
        payload !== undefined &&
        payload.key &&
        typeof payload.key === "string" &&
        payload.key.length
      ) {
        encryptedVault = await this.cryptoProvider.encrypt(
          masterKey,
          payload.key,
        );
      }

      if (
        payload !== undefined &&
        addResourceWindow !== undefined &&
        typeof payload.name === "string" &&
        mainWindow !== undefined &&
        encryptedVault !== undefined
      ) {
        await this.resourcesService.post({
          name: payload.name,
          key: encryptedVault.encryptedData,
          iv: encryptedVault.iv,
          salt: encryptedVault.salt,
        });
        const resources = await this.getResources();

        if (resources !== undefined) {
          this.updateTrayMenu(resources);
          addResourceWindow.hide();
          ipcWebContentsSend("resources", mainWindow.webContents, {
            items: resources,
          });
        }
      }

      return undefined;
    });
  }

  private ipcGetResource(): void {
    ipcMainOn("getResource", async (event, { id }) => {
      const item = await this.resourcesService.byId(id);

      event.reply("getResource", {
        item,
      });
    });
  }

  private cacheResources(): TResource[] | undefined {
    let resources: TResource[] | undefined = undefined;
    const cacheResponse = getElectronStorage("response");

    if (cacheResponse !== undefined) {
      resources =
        cacheResponse[
          `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.resources.base}`
        ];
    }

    if (resources !== undefined) {
      return resources;
    }

    return undefined;
  }

  private ipcGetResources(): void {
    ipcMainOn("resources", async (event) => {
      const cacheResources = this.cacheResources();
      const mainWindow = getWindows<TWindows["main"]>("window:main");

      if (mainWindow !== undefined) {
        ipcWebContentsSend("sync", mainWindow.webContents, {
          isResources: false,
        });

        if (cacheResources !== undefined) {
          event.reply("resources", {
            items: cacheResources,
          });
        }

        const resources = await this.getResources();
        if (resources !== undefined) {
          this.updateTrayMenu(resources);
          event.reply("resources", {
            items: resources,
          });
        }

        ipcWebContentsSend("sync", mainWindow.webContents, {
          isResources: true,
        });
      }
    });
  }

  private async getResources(): Promise<TResource[] | undefined> {
    const resources = await this.resourcesService.list();

    if (resources === undefined) {
      return;
    }

    return resources;
  }

  private ipcDeleteResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainHandle("deleteResource", async (payload) => {
      const deleteResourceWindow = this.cacheWindowsService.getResourceWindows(
        "deleteResourceWindow",
      );

      if (
        payload &&
        payload.id &&
        deleteResourceWindow !== undefined &&
        mainWindow !== undefined
      ) {
        await this.resourcesService.delete(payload.id);

        const resources = await this.getResources();

        if (resources !== undefined) {
          this.updateTrayMenu(resources);
          deleteResourceWindow.hide();
          ipcWebContentsSend("resources", mainWindow.webContents, {
            items: resources,
          });
        }
      }

      return undefined;
    });
  }

  private updateTrayMenu(resources: TResource[]) {
    this.trayProvider.buildTray(
      this.trayProvider.getTray().map((item) => {
        if (item.name === "resources") {
          if (resources.length) {
            item.visible = true;
            item.submenu = resources.map((resource) => ({
              label: resource.name,
              click: async () => {
                this.copyMasterKey(resource);
              },
            }));
          } else {
            item.visible = false;
          }
        }

        return item;
      }),
    );
  }

  private async copyMasterKey(resource: TResource) {
    const masterKey = getStore("masterKey");
    if (masterKey !== undefined && resource.salt !== null) {
      const encryptedVault = await this.cryptoProvider.decrypt(masterKey, {
        iv: resource.iv,
        salt: resource.salt,
        encryptedData: resource.key,
      });
      clipboard.writeText(encryptedVault);
    } else {
      dialog.showMessageBox({
        title: "Warning!",
        message:
          "You don't have access to copy! You must enter the master key!",
      });
    }
  }
}
