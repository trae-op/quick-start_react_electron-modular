import type { TEncryptedVault } from "../crypto/types.js";

export type TMasterKeyCryptoProvider = {
  decrypt: (
    masterKey: string,
    encryptedVault: TEncryptedVault
  ) => Promise<string>;
};
