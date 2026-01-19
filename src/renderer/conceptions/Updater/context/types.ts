import type { PropsWithChildren } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getStatus: () => TUpdateData["status"];
  getDownloadedPercent: () => string | undefined;
  getMessage: () => string | undefined;
  getVersion: () => string | undefined;
  getPlatform: () => string | undefined;
  getUpdateFile: () => string | undefined;
  setStatus: (value: TUpdateData["status"]) => void;
  setDownloadedPercent: (value: string | undefined) => void;
  setMessage: (value: string | undefined) => void;
  setVersion: (value: string | undefined) => void;
  setPlatform: (value: string | undefined) => void;
  setUpdateFile: (value: string | undefined) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
