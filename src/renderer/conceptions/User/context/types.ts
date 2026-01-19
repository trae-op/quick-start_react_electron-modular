import type { PropsWithChildren, ReactElement } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getUser: () => TUser | undefined;
  getIsNewVersionApp: () => boolean;
  getRenderButtonUpdateApp: () => ReactElement | null;
  getRenderButtonLogout: () => ReactElement | null;
  setUser: (value: TUser | undefined) => void;
  setIsNewVersionApp: (value: boolean) => void;
  setRenderButtonUpdateApp: (value: ReactElement | null) => void;
  setRenderButtonLogout: (value: ReactElement | null) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
