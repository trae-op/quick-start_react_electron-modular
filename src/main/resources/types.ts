import type { ApiResponse, RequestOptions } from "../rest-api/types.js";
import type { TEncryptedVault } from "./services/types.js";
import type { TItem as TTrayItem } from "../tray/types.js";

export type TResourcesRestApiProvider = {
  get: <TResponse>(
    endpoint: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<TResponse>>;
  post: <TResponse>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ) => Promise<ApiResponse<TResponse>>;
  put: <TResponse>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ) => Promise<ApiResponse<TResponse>>;
  delete: <TResponse>(
    endpoint: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<TResponse>>;
};

export type TResourcesCryptoProvider = {
  encrypt: (masterKey: string, value: string) => Promise<TEncryptedVault>;
  decrypt: (
    masterKey: string,
    encryptedVault: TEncryptedVault
  ) => Promise<string>;
};

export type TResourcesTrayProvider = {
  getTray: () => TTrayItem[];
  buildTray: (items?: TTrayItem[]) => void;
  destroyTray: () => void;
};
