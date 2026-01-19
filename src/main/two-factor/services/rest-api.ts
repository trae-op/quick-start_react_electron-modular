import { type AxiosRequestConfig } from "axios";
import { messages, restApi } from "../../config.js";
import { Injectable, Inject } from "@devisfuture/electron-modular";
import { getElectronStorage } from "../../$shared/store.js";
import type {
  TResponseGenerate,
  TParamsAuthenticate,
  TResponseTwoFactorEnable,
  TResponseTwoFactorAuthenticate,
} from "./types.js";
import { dialog } from "electron";
import { TWO_FACTOR_REST_API_PROVIDER } from "../tokens.js";
import type { TTwoFactorRestApiProvider } from "../types.js";

@Injectable()
export class TwoFactorRestApiService {
  constructor(
    @Inject(TWO_FACTOR_REST_API_PROVIDER)
    private restApiProvider: TTwoFactorRestApiProvider,
  ) {}

  private getAuthorization(): AxiosRequestConfig["headers"] {
    const token = getElectronStorage("authToken");

    if (token !== undefined) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }

    return;
  }

  async generateQA<R extends TResponseGenerate>(): Promise<R | undefined> {
    const response = await this.restApiProvider.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.twoFactor}${restApi.urls.auth.generate}`,
      {
        headers: this.getAuthorization(),
      },
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: messages.auth.errorGenerateQA,
        message: `Failed: ${response.status} ${response.error?.message}`,
      });

      return;
    }

    return response.data;
  }

  async authenticate<R extends TResponseTwoFactorAuthenticate>({
    body,
  }: TParamsAuthenticate): Promise<R | undefined> {
    const response = await this.restApiProvider.post<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.twoFactor}${restApi.urls.auth.authenticate}`,
      body,
      {
        headers: this.getAuthorization(),
      },
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: messages.auth.errorGenerateQA,
        message: `Failed: ${response.status} ${response.error?.message}`,
      });

      return;
    }

    return response.data;
  }

  async enableTwoFactor<R extends TResponseTwoFactorEnable>({
    body,
  }: TParamsAuthenticate): Promise<R | undefined> {
    const response = await this.restApiProvider.post<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.twoFactor}${restApi.urls.auth.enable}`,
      body,
      {
        headers: this.getAuthorization(),
      },
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: messages.auth.errorGenerateQA,
        message: `Failed: ${response.status} ${response.error?.message}`,
      });

      return;
    }

    return response.data;
  }
}
