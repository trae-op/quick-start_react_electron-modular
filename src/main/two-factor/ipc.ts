import { BrowserWindow } from "electron";
import {
  IpcHandler,
  getWindow as getWindows,
  Inject,
  type TParamOnInit,
} from "@devisfuture/electron-modular";
import { ipcMainOn, ipcWebContentsSend } from "../$shared/utils.js";
import type { TNameWindows } from "./services/types.js";
import { TwoFactorWindowsFactoryService } from "./services/windows-factory.js";
import { TwoFactorRestApiService } from "./services/rest-api.js";
import { getElectronStorage, setElectronStorage } from "../$shared/store.js";

import {
  TWO_FACTOR_AUTH_PROVIDER,
  TWO_FACTOR_USER_PROVIDER,
} from "./tokens.js";
import type {
  TTwoFactorAuthProvider,
  TTwoFactorUserProvider,
} from "./types.js";

@IpcHandler()
export class TwoFactorIpc {
  private isNeedToTwoFactorEnable = false;
  private twoFactorVerifyWindow: BrowserWindow | undefined = undefined;

  constructor(
    private twoFactorWindowsFactoryService: TwoFactorWindowsFactoryService,
    private twoFactorRestApiService: TwoFactorRestApiService,
    @Inject(TWO_FACTOR_USER_PROVIDER)
    private userProvider: TTwoFactorUserProvider,
    @Inject(TWO_FACTOR_AUTH_PROVIDER)
    private authProvider: TTwoFactorAuthProvider,
  ) {}

  onInit({ getWindow }: TParamOnInit<TNameWindows>): void {
    const twoFactorQAWindow = getWindow("window:two-factor-qa");
    const twoFactorVerifyWindow = getWindow("window:two-factor-verify");

    this.twoFactorWindowsFactoryService.addWindow(
      "window:two-factor-qa",
      twoFactorQAWindow.create,
    );

    this.twoFactorWindowsFactoryService.addWindow(
      "window:two-factor-verify",
      twoFactorVerifyWindow.create,
    );

    ipcMainOn("twoFactorVerify", async () => {
      if (this.twoFactorVerifyWindow !== undefined) {
        this.twoFactorVerifyWindow.show();
      } else {
        this.twoFactorVerifyWindow = await twoFactorVerifyWindow.create();
      }

      this.isNeedToTwoFactorEnable = true;
    });

    ipcMainOn("twoFactorCodeVerify", async (event, body) => {
      const qaWindow = getWindows<TNameWindows>("window:two-factor-qa");

      if (qaWindow !== undefined) {
        qaWindow.hide();
      }

      await this.authenticate(body);
      await this.enableTwoFactor(body);

      event.reply("twoFactorCodeVerify");
    });
  }

  private async authenticate(body: TCallbackSendTwoFactorCodeVerify) {
    if (!this.isNeedToTwoFactorEnable) {
      const response = await this.twoFactorRestApiService.authenticate({
        body,
      });

      const verifyWindow = getWindows<TNameWindows>("window:two-factor-verify");
      if (response !== undefined && verifyWindow !== undefined) {
        await this.isAuthenticated();
        verifyWindow.hide();
      }
    }
  }

  private async isAuthenticated() {
    const userId = getElectronStorage("userId");
    const user = userId ? await this.userProvider.byId(userId) : undefined;
    const mainWindow = getWindows<TNameWindows>("window:main");

    if (
      mainWindow !== undefined &&
      user !== undefined &&
      user.twoFactorSecret
    ) {
      setElectronStorage("twoFactorSecret", user.twoFactorSecret);
      ipcWebContentsSend("authSocialNetwork", mainWindow.webContents, {
        isAuthenticated: true,
      });
      this.authProvider.setCheckAccessInterval(mainWindow);
    }
  }

  private async enableTwoFactor(body: TCallbackSendTwoFactorCodeVerify) {
    if (this.isNeedToTwoFactorEnable) {
      const response = await this.twoFactorRestApiService.enableTwoFactor({
        body,
      });

      const verifyWindow = getWindows<TNameWindows>("window:two-factor-verify");
      if (response !== undefined && verifyWindow !== undefined) {
        await this.isAuthenticated();
        verifyWindow.hide();
      }
    }
  }
}
