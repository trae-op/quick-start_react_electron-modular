import type { ApiResponse, RequestOptions } from "../rest-api/types.js";

export type TUserRestApiProvider = {
  get: <TResponse>(
    endpoint: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<TResponse>>;
};
