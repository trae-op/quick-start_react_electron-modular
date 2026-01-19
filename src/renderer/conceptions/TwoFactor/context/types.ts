import type { PropsWithChildren } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getPending: () => boolean;
  getBase64: () => string;
  getTwoFactorCode: () => string;
  setPending: (value: boolean) => void;
  setBase64: (value: string) => void;
  setTwoFactorCode: (value: string) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
