import type { PropsWithChildren } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getIsAuthenticated: () => boolean | undefined;
  setIsAuthenticated: (value: boolean | undefined) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
