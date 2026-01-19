import { RgModule } from "@devisfuture/electron-modular";
import { RestApiModule } from "../rest-api/module.js";
import { RestApiService } from "../rest-api/service.js";
import { CryptoModule } from "../crypto/module.js";
import { CryptoService } from "../crypto/service.js";
import { ResourcesActionsIpc } from "./ipc/actions.js";
import { ResourcesOpenIpc } from "./ipc/open.js";
import { ResourcesService } from "./services/resources.js";
import { CacheWindowsService } from "./services/cacheWindows.js";
import { UpdateWindow } from "./windows/update.js";
import { AddWindow } from "./windows/add.js";
import { DeleteWindow } from "./windows/delete.js";
import { TrayModule } from "../tray/module.js";
import { TrayService } from "../tray/service.js";
import {
  RESOURCES_CRYPTO_PROVIDER,
  RESOURCES_REST_API_PROVIDER,
  RESOURCES_TRAY_PROVIDER,
} from "./tokens.js";
import type {
  TResourcesCryptoProvider,
  TResourcesRestApiProvider,
  TResourcesTrayProvider,
} from "./types.js";

@RgModule({
  imports: [RestApiModule, CryptoModule, TrayModule],
  ipc: [ResourcesActionsIpc, ResourcesOpenIpc],
  windows: [UpdateWindow, AddWindow, DeleteWindow],
  providers: [
    ResourcesService,
    CacheWindowsService,
    {
      provide: RESOURCES_REST_API_PROVIDER,
      useFactory: (
        restApiService: RestApiService,
      ): TResourcesRestApiProvider => ({
        get: (endpoint, options) => restApiService.get(endpoint, options),
        post: (endpoint, data, options) =>
          restApiService.post(endpoint, data, options),
        put: (endpoint, data, options) =>
          restApiService.put(endpoint, data, options),
        delete: (endpoint, options) => restApiService.delete(endpoint, options),
      }),
      inject: [RestApiService],
    },
    {
      provide: RESOURCES_CRYPTO_PROVIDER,
      useFactory: (cryptoService: CryptoService): TResourcesCryptoProvider => ({
        encrypt: (masterKey, value) => cryptoService.encrypt(masterKey, value),
        decrypt: (masterKey, encryptedVault) =>
          cryptoService.decrypt(masterKey, encryptedVault),
      }),
      inject: [CryptoService],
    },
    {
      provide: RESOURCES_TRAY_PROVIDER,
      useFactory: (trayService: TrayService): TResourcesTrayProvider => ({
        getTray: () => trayService.trayMenu,
        buildTray: (items) => trayService.buildTray(items),
        destroyTray: () => trayService.destroyTray(),
      }),
      inject: [TrayService],
    },
  ],
  exports: [ResourcesService],
})
export class ResourcesModule {}
