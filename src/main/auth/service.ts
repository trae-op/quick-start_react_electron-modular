import { BrowserWindow } from "electron";
import { type AxiosRequestConfig } from "axios";
import { restApi, timers } from "../config.js";
import {
  Injectable,
  Inject,
  getWindow as getWindows,
} from "@devisfuture/electron-modular";
import {
  deleteFromElectronStorage,
  getElectronStorage,
  deleteStore,
} from "../$shared/store.js";
import { ipcWebContentsSend } from "../$shared/utils.js";
import { AUTH_REST_API_PROVIDER } from "./tokens.js";
import type { TAuthRestApiProvider } from "./types.js";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REST_API_PROVIDER)
    private restApiProvider: TAuthRestApiProvider,
  ) {}

  private getAuthorization(): AxiosRequestConfig["headers"] {
    const token = getElectronStorage("authToken");

    if (token !== undefined) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }

    return;
  }

  async access<R extends { ok: boolean }>(): Promise<R | undefined> {
    const response = await this.restApiProvider.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.access}`,
      {
        headers: this.getAuthorization(),
        isCache: true,
      },
    );

    if (response.error !== undefined) {
      const mainWindow = getWindows<TWindows["main"]>("window:main");
      if (response.status === 401 && mainWindow !== undefined) {
        this.logout(mainWindow);
      }
      return;
    }

    return response.data;
  }

  checkAuthenticated(
    window: BrowserWindow,
  ): { isAuthenticated: boolean } | undefined {
    const cacheAccess = this.cacheAccess();
    if (cacheAccess !== undefined) {
      ipcWebContentsSend("sync", window.webContents, {
        isAuthenticated: cacheAccess.ok,
      });

      return {
        isAuthenticated: true,
      };
    }
  }

  setCheckAccessInterval(window: BrowserWindow) {
    const interval = setInterval(async () => {
      ipcWebContentsSend("sync", window.webContents, {
        isAuthenticated: false,
      });

      const response = await this.access();
      ipcWebContentsSend("sync", window.webContents, {
        isAuthenticated: (response !== undefined && response.ok) || true,
      });

      const authToken = getElectronStorage("authToken");
      if (authToken === undefined) {
        clearInterval(interval);
      }
    }, timers.intervalCheckAuth);
  }

  cacheAccess(): { ok: boolean } | undefined {
    let access: { ok: boolean } | undefined = undefined;
    const cacheResponse = getElectronStorage("response");

    if (cacheResponse !== undefined) {
      access =
        cacheResponse[
          `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.access}`
        ];
    }

    if (access !== undefined) {
      return access;
    }

    return undefined;
  }

  logout(window: BrowserWindow) {
    deleteFromElectronStorage("authToken");
    deleteFromElectronStorage("response");
    deleteFromElectronStorage("userId");
    deleteStore("masterKey");
    deleteFromElectronStorage("twoFactorSecret");
    ipcWebContentsSend("authSocialNetwork", window.webContents, {
      isAuthenticated: false,
    });
  }
}
