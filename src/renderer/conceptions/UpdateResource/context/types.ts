import type { PropsWithChildren, ReactElement } from "react";

export type TProviderProps = PropsWithChildren;

export type TSubscriberCallback = () => void;

export type TContext = {
  getResult: () => TResource | undefined;
  getName: () => string;
  getRenderGenerateCharacters: () => ReactElement | null;
  setResult: (value: TResource | undefined) => void;
  setName: (value: string) => void;
  setRenderGenerateCharacters: (value: ReactElement | null) => void;
  subscribe: (callback: TSubscriberCallback) => () => void;
};
