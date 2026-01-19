import {
  BrowserWindow,
  dialog,
  type Event,
  type WebContentsWillRedirectEventParams,
} from "electron";
import { WindowManager, Inject } from "@devisfuture/electron-modular";
import { setElectronStorage } from "../$shared/store.js";
import { messages } from "../config.js";
import type { TWindowManager } from "../types.js";
import { AUTH_SOCIAL_NETWORK_TWO_FACTOR_PROVIDER } from "./tokens.js";
import type { TAuthSocialNetworkTwoFactorProvider } from "./types.js";

@WindowManager<TWindows["authSocialNetwork"]>({
  hash: "window:auth-social-network",
  options: {
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
    width: 400,
    height: 400,
  },
})
export class AuthSocialNetworkWindow implements TWindowManager {
  private window: BrowserWindow | undefined;

  constructor(
    @Inject(AUTH_SOCIAL_NETWORK_TWO_FACTOR_PROVIDER)
    private twoFactorProvider: TAuthSocialNetworkTwoFactorProvider,
  ) {}

  onWebContentsDidFinishLoad(window: BrowserWindow): void {
    this.window = window;
  }

  onWebContentsWillRedirect(
    _: Event<WebContentsWillRedirectEventParams>,
    url: string,
  ): void {
    const callBackUrl = new URL(url);
    const searchParams = new URLSearchParams(callBackUrl.search);
    const isSetup = /api\/auth\/two\-factor\/setup\?token\=/g.test(url);
    const isVerify = /api\/auth\/two\-factor\/verify\?token\=/g.test(url);

    switch (true) {
      case isSetup: {
        this.setToStore("window:two-factor-qa", searchParams);
        break;
      }
      case isVerify: {
        this.setToStore("window:two-factor-verify", searchParams);
        break;
      }
      case /api\/auth\/user\-exists\?message\=/g.test(url): {
        this.window?.close();
        const message = searchParams.get("message");
        const email = searchParams.get("email");

        if (message !== null && email !== null) {
          dialog.showMessageBox({
            title: messages.auth.userAlreadyExists,
            message: `${message}\nEmail: ${email}`,
          });
        }
        break;
      }
      default: {
        return;
      }
    }
  }

  private setToStore(
    nameWindow: TWindows["twoFactorQA"] | TWindows["twoFactorVerify"],
    searchParams: URLSearchParams,
  ): void {
    this.window?.close();
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (token !== null && userId !== null) {
      setElectronStorage("authToken", token);
      setElectronStorage("userId", userId);
      this.twoFactorProvider.createWindow(nameWindow);
    } else {
      dialog.showMessageBox({
        title: messages.auth.errorTokenUserMissing,
        message: `Token=${token}\nUserId: ${userId}`,
      });
    }
  }
}
