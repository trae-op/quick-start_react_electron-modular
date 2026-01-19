import { RgModule } from "@devisfuture/electron-modular";
import { MasterKeyIpc } from "./ipc.js";
import { MasterKeyWindow } from "./window.js";
import { ResourcesModule } from "../resources/module.js";
import { CryptoModule } from "../crypto/module.js";
import { CryptoService } from "../crypto/service.js";
import { MASTER_KEY_CRYPTO_PROVIDER } from "./tokens.js";
import type { TMasterKeyCryptoProvider } from "./types.js";

@RgModule({
  imports: [ResourcesModule, CryptoModule],
  ipc: [MasterKeyIpc],
  windows: [MasterKeyWindow],
  providers: [
    {
      provide: MASTER_KEY_CRYPTO_PROVIDER,
      useFactory: (cryptoService: CryptoService): TMasterKeyCryptoProvider => ({
        decrypt: (masterKey, encryptedVault) =>
          cryptoService.decrypt(masterKey, encryptedVault),
      }),
      inject: [CryptoService],
    },
  ],
})
export class MasterKeyModule {}
