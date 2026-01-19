import type { PropsWithChildren } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getIsAuthenticated: () => boolean | undefined;
  getIsResources: () => boolean | undefined;
  getIsUser: () => boolean | undefined;
  setAuthenticated: (value: boolean | undefined) => void;
  setResources: (value: boolean | undefined) => void;
  setUser: (value: boolean | undefined) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
