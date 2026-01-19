import { dialog } from "electron";
import { type AxiosRequestConfig } from "axios";
import { restApi } from "../../config.js";
import { Injectable, Inject } from "@devisfuture/electron-modular";
import { getElectronStorage } from "../../$shared/store.js";
import type { TPostBody, TPutBody } from "./types.js";
import { RESOURCES_REST_API_PROVIDER } from "../tokens.js";
import type { TResourcesRestApiProvider } from "../types.js";

@Injectable()
export class ResourcesService {
  constructor(
    @Inject(RESOURCES_REST_API_PROVIDER)
    private restApiProvider: TResourcesRestApiProvider,
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

  async byId<R extends TResource>(id: string): Promise<R | undefined> {
    const response = await this.restApiProvider.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${
        restApi.urls.resources.base
      }${restApi.urls.resources.byId(id)}`,
      {
        headers: this.getAuthorization(),
      },
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }

  async delete<R extends TResource>(id: string): Promise<R | undefined> {
    const response = await this.restApiProvider.delete<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${
        restApi.urls.resources.base
      }${restApi.urls.resources.byId(id)}`,
      {
        headers: this.getAuthorization(),
      },
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }

  async post<R extends TResource>(body: TPostBody): Promise<R | undefined> {
    const response = await this.restApiProvider.post<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.resources.base}`,
      body,
      {
        headers: this.getAuthorization(),
      },
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }

  async put<R extends TResource>(
    id: string,
    body: TPutBody,
  ): Promise<R | undefined> {
    const response = await this.restApiProvider.put<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${
        restApi.urls.resources.base
      }${restApi.urls.resources.byId(id)}`,
      body,
      {
        headers: this.getAuthorization(),
      },
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }

  async list<R extends TResource[]>(): Promise<R | undefined> {
    const response = await this.restApiProvider.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.resources.base}`,
      {
        headers: this.getAuthorization(),
        isCache: true,
      },
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }
}
