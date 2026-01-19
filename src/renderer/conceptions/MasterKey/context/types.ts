import type { PropsWithChildren } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getIsMasterKey: () => boolean;
  getKey: () => string;
  setIsMasterKey: (value: boolean) => void;
  setKey: (value: string) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
