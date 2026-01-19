import type { PropsWithChildren } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getResourceId: () => string | undefined;
  setResourceId: (value: string | undefined) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
