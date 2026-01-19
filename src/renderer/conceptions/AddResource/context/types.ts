import type { PropsWithChildren, ReactElement } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getName: () => string;
  getRenderGenerateCharacters: () => ReactElement | null;
  setName: (value: string) => void;
  setRenderGenerateCharacters: (value: ReactElement | null) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
