import { BrowserWindow, clipboard } from "electron";
import {
  IpcHandler,
  getWindow as getWindows,
  Inject,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import {
  ipcMainHandle,
  ipcMainOn,
  ipcWebContentsSend,
} from "../$shared/utils.js";
import {
  setStore,
  getStore,
  deleteStore,
  getElectronStorage,
} from "../$shared/store.js";
import { restApi } from "../config.js";

import { MASTER_KEY_CRYPTO_PROVIDER } from "./tokens.js";
import type { TMasterKeyCryptoProvider } from "./types.js";

@IpcHandler()
export class MasterKeyIpc {
  masterKeyWindow: BrowserWindow | undefined;

  constructor(
    @Inject(MASTER_KEY_CRYPTO_PROVIDER)
    private cryptoProvider: TMasterKeyCryptoProvider,
  ) {}

  onInit({ getWindow }: TParamOnInit<TWindows["masterKey"]>): void {
    const masterKeyWindow = getWindow("window:master-key");

    ipcMainOn("masterKey", async () => {
      this.masterKeyWindow = await masterKeyWindow.create();
    });

    this.ipcCheckMasterKey();
    this.ipcPostMasterKey();
    this.ipcDeleteMasterKey();
    this.ipcCopyMasterKey();
  }

  private ipcPostMasterKey(): void {
    ipcMainHandle("postMasterKey", async (payload) => {
      if (payload !== undefined) {
        setStore("masterKey", payload.key);
      }

      this.hideMasterKeyWindow();

      this.getMasterKey();
      return undefined;
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

  private ipcCopyMasterKey(): void {
    ipcMainHandle("copyMasterKey", async (payload) => {
      if (payload !== undefined) {
        const cacheResources = this.cacheResources();
        const foundUser =
          cacheResources !== undefined
            ? cacheResources.find((res) => res.id + "" === payload.id)
            : undefined;
        const masterKey = getStore("masterKey");

        if (
          masterKey !== undefined &&
          foundUser !== undefined &&
          foundUser.salt !== null
        ) {
          const encryptedVault = await this.cryptoProvider.decrypt(masterKey, {
            iv: foundUser.iv,
            salt: foundUser.salt,
            encryptedData: foundUser.key,
          });
          clipboard.writeText(encryptedVault);

          return {
            ok: true,
          };
        }
      }

      return undefined;
    });
  }

  private ipcCheckMasterKey(): void {
    ipcMainOn("checkMasterKey", (event) => {
      const masterKey = getStore("masterKey");

      event.reply("masterKey", {
        isMasterKey: Boolean(masterKey),
      });
    });
  }

  private ipcDeleteMasterKey(): void {
    ipcMainOn("deleteMasterKey", () => {
      const masterKey = getStore("masterKey");

      if (masterKey !== undefined) {
        deleteStore("masterKey");
        this.getMasterKey();
        this.hideMasterKeyWindow();
      }
    });
  }

  private getMasterKey(): void {
    const masterKey = getStore("masterKey");
    const mainWindow = getWindows<TWindows["main"]>("window:main");
    if (mainWindow !== undefined) {
      ipcWebContentsSend("masterKey", mainWindow.webContents, {
        isMasterKey: Boolean(masterKey),
      });
    }

    if (this.masterKeyWindow !== undefined) {
      ipcWebContentsSend("masterKey", this.masterKeyWindow.webContents, {
        isMasterKey: Boolean(masterKey),
      });
    }
  }

  private hideMasterKeyWindow(): void {
    if (this.masterKeyWindow !== undefined) {
      this.masterKeyWindow.hide();
    }
  }
}
