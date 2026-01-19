import type { PropsWithChildren } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getList: () => TResource[] | undefined;
  getIsMasterKey: () => boolean;
  getIsDisabledActions: () => boolean;
  getCopyKeyResourceId: () => string | undefined;
  setList: (value: TResource[] | undefined) => void;
  setIsMasterKey: (value: boolean) => void;
  setIsDisabledActions: (value: boolean) => void;
  setCopyKeyResourceId: (value: string | undefined) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
