import { RgModule } from "@devisfuture/electron-modular";
import { AuthSocialNetworkIpc } from "./ipc.js";
import { AuthSocialNetworkWindow } from "./window.js";
import { TwoFactorModule } from "../two-factor/module.js";
import { TwoFactorWindowsFactoryService } from "../two-factor/services/windows-factory.js";
import { AUTH_SOCIAL_NETWORK_TWO_FACTOR_PROVIDER } from "./tokens.js";
import type { TAuthSocialNetworkTwoFactorProvider } from "./types.js";

@RgModule({
  imports: [TwoFactorModule],
  ipc: [AuthSocialNetworkIpc],
  windows: [AuthSocialNetworkWindow],
  providers: [
    {
      provide: AUTH_SOCIAL_NETWORK_TWO_FACTOR_PROVIDER,
      useFactory: (
        twoFactorWindowsFactoryService: TwoFactorWindowsFactoryService,
      ): TAuthSocialNetworkTwoFactorProvider => ({
        createWindow: (nameWindow) =>
          twoFactorWindowsFactoryService.createWindow(nameWindow),
      }),
      inject: [TwoFactorWindowsFactoryService],
    },
  ],
})
export class AuthSocialNetworkModule {}
