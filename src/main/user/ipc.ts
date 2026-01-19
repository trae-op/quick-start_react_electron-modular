import {
  IpcHandler,
  getWindow as getWindows,
} from "@devisfuture/electron-modular";
import { ipcMainOn, ipcWebContentsSend } from "../$shared/utils.js";
import { UserService } from "./service.js";
import { getElectronStorage } from "../$shared/store.js";
import { restApi } from "../config.js";

@IpcHandler()
export class UserIpc {
  constructor(private userService: UserService) {}

  onInit(): void {
    ipcMainOn("checkUser", async (event) => {
      const userId = getElectronStorage("userId");
      const cacheUser = this.cacheUser(userId);
      const mainWindow = getWindows<TWindows["main"]>("window:main");

      if (mainWindow !== undefined) {
        ipcWebContentsSend("sync", mainWindow.webContents, {
          isUser: false,
        });

        if (cacheUser !== undefined) {
          event.reply("checkUser", {
            user: cacheUser,
          });
        }

        const user = userId ? await this.userService.byId(userId) : undefined;
        if (user !== undefined) {
          event.reply("checkUser", {
            user,
          });
        }

        ipcWebContentsSend("sync", mainWindow.webContents, {
          isUser: true,
        });
      }
    });
  }

  private cacheUser(userId: string | undefined): TUser | undefined {
    let user: TUser | undefined = undefined;
    const cacheResponse = getElectronStorage("response");

    if (cacheResponse !== undefined && userId !== undefined) {
      user =
        cacheResponse[
          `${restApi.urls.base}${restApi.urls.baseApi}${
            restApi.urls.user.base
          }${restApi.urls.user.byId(userId)}`
        ];
    }

    if (user !== undefined) {
      return user;
    }

    return undefined;
  }
}
