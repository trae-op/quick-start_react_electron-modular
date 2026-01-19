import type { BrowserWindow } from "electron";
import type { ApiResponse, RequestOptions } from "../rest-api/types.js";

export type TTwoFactorRestApiProvider = {
  get: <TResponse>(
    endpoint: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<TResponse>>;
  post: <TResponse>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ) => Promise<ApiResponse<TResponse>>;
};

export type TTwoFactorUserProvider = {
  byId: <TResponse extends TUser>(id: string) => Promise<TResponse | undefined>;
};

export type TTwoFactorAuthProvider = {
  setCheckAccessInterval: (window: BrowserWindow) => void;
};
