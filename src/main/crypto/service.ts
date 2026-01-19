import crypto from "crypto";
import { promisify } from "node:util";
import { Injectable } from "@devisfuture/electron-modular";
import { TEncryptedVault } from "./types.js";
import { cryptoOptions } from "../config.js";
import { dialog } from "electron";

const pbkdf2 = promisify(crypto.pbkdf2);

@Injectable()
export class CryptoService {
  constructor() {}

  private async deriveKey(masterKey: string, salt: Buffer): Promise<Buffer> {
    return await pbkdf2(
      masterKey,
      salt,
      cryptoOptions.PBKDF2_ITERATIONS,
      cryptoOptions.AES_KEY_LENGTH_BYTES,
      cryptoOptions.PBKDF2_DIGEST,
    );
  }

  async encrypt(
    masterKey: string,
    masterKeyToEncrypt: string,
  ): Promise<TEncryptedVault> {
    const salt: Buffer = crypto.randomBytes(cryptoOptions.SALT_LENGTH_BYTES);
    const derivedKey: Buffer = await this.deriveKey(masterKey, salt);
    const iv: Buffer = crypto.randomBytes(cryptoOptions.SALT_LENGTH_BYTES);
    const cipher: crypto.Cipher = crypto.createCipheriv(
      cryptoOptions.AES_ALGORITHM,
      derivedKey,
      iv,
    );

    const encryptedData: Buffer = Buffer.concat([
      cipher.update(Buffer.from(masterKeyToEncrypt, "utf8")),
      cipher.final(),
    ]);

    return {
      iv: iv.toString("hex"),
      salt: salt.toString("hex"),
      encryptedData: encryptedData.toString("hex"),
    };
  }

  async decrypt(
    masterKey: string,
    encryptedVault: TEncryptedVault,
  ): Promise<string> {
    const salt: Buffer = Buffer.from(encryptedVault.salt, "hex");
    const iv: Buffer = Buffer.from(encryptedVault.iv, "hex");
    const encryptedDataBuffer: Buffer = Buffer.from(
      encryptedVault.encryptedData,
      "hex",
    );
    const derivedKey: Buffer = await this.deriveKey(masterKey, salt);
    const decipher: crypto.Decipher = crypto.createDecipheriv(
      cryptoOptions.AES_ALGORITHM,
      derivedKey,
      iv,
    );

    let decryptedBuffer: Buffer;
    try {
      decryptedBuffer = Buffer.concat([
        decipher.update(encryptedDataBuffer),
        decipher.final(),
      ]);
    } catch (error: any) {
      if (error.code === "ERR_OSSL_BAD_DECRYPT") {
        dialog.showMessageBox({
          title: `Something wrong with server! ${error.code || ""}`,
          message: `
          The message: ${error.message}.
          Possible causes:
          1. You have changed (masterKey) and now you must update you resources.
          2. Incorrect user password (masterKey).
          3. Corrupted or incomplete encrypted data (${encryptedVault.encryptedData}).
          4. Incorrect IV (${encryptedVault.iv}).
          5. Key derivation parameters (iterations, keyLength, digest) mismatch between encryption and decryption.
          `,
        });
      }
      return "";
    }

    return decryptedBuffer.toString("utf8");
  }
}
