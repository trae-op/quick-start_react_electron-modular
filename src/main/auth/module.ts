import { RgModule } from "@devisfuture/electron-modular";
import { RestApiModule } from "../rest-api/module.js";
import { RestApiService } from "../rest-api/service.js";
import { AuthService } from "./service.js";
import { AUTH_REST_API_PROVIDER } from "./tokens.js";
import type { TAuthRestApiProvider } from "./types.js";

@RgModule({
  imports: [RestApiModule],
  providers: [
    AuthService,
    {
      provide: AUTH_REST_API_PROVIDER,
      useFactory: (restApiService: RestApiService): TAuthRestApiProvider => ({
        get: (endpoint, options) => restApiService.get(endpoint, options),
      }),
      inject: [RestApiService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
