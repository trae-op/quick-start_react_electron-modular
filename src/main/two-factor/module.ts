import { RgModule } from "@devisfuture/electron-modular";
import { TwoFactorIpc } from "./ipc.js";
import { TwoFactorQAWindow } from "./windows/qa.js";
import { TwoFactorVerifyWindow } from "./windows/verify.js";
import { TwoFactorWindowsFactoryService } from "./services/windows-factory.js";
import { RestApiModule } from "../rest-api/module.js";
import { TwoFactorRestApiService } from "./services/rest-api.js";
import { UserModule } from "../user/module.js";
import { AuthModule } from "../auth/module.js";
import { RestApiService } from "../rest-api/service.js";
import { UserService } from "../user/service.js";
import { AuthService } from "../auth/service.js";
import {
  TWO_FACTOR_AUTH_PROVIDER,
  TWO_FACTOR_REST_API_PROVIDER,
  TWO_FACTOR_USER_PROVIDER,
} from "./tokens.js";
import type {
  TTwoFactorAuthProvider,
  TTwoFactorRestApiProvider,
  TTwoFactorUserProvider,
} from "./types.js";

@RgModule({
  imports: [RestApiModule, UserModule, AuthModule],
  ipc: [TwoFactorIpc],
  windows: [TwoFactorQAWindow, TwoFactorVerifyWindow],
  providers: [
    TwoFactorWindowsFactoryService,
    TwoFactorRestApiService,
    {
      provide: TWO_FACTOR_REST_API_PROVIDER,
      useFactory: (
        restApiService: RestApiService,
      ): TTwoFactorRestApiProvider => ({
        get: (endpoint, options) => restApiService.get(endpoint, options),
        post: (endpoint, data, options) =>
          restApiService.post(endpoint, data, options),
      }),
      inject: [RestApiService],
    },
    {
      provide: TWO_FACTOR_USER_PROVIDER,
      useFactory: (userService: UserService): TTwoFactorUserProvider => ({
        byId: (id) => userService.byId(id),
      }),
      inject: [UserService],
    },
    {
      provide: TWO_FACTOR_AUTH_PROVIDER,
      useFactory: (authService: AuthService): TTwoFactorAuthProvider => ({
        setCheckAccessInterval: (window) =>
          authService.setCheckAccessInterval(window),
      }),
      inject: [AuthService],
    },
  ],
  exports: [TwoFactorWindowsFactoryService],
})
export class TwoFactorModule {}
