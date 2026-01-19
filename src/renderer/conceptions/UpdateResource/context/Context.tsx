import { createContext, useCallback, useRef } from "react";
import type { ReactElement } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const result = useRef<TResource | undefined>(undefined);
  const name = useRef<string>("");
  const renderGenerateCharacters = useRef<ReactElement | null>(null);
  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const getResult = useCallback((): TResource | undefined => {
    return result.current;
  }, []);

  const getName = useCallback((): string => {
    return name.current;
  }, []);

  const getRenderGenerateCharacters = useCallback((): ReactElement | null => {
    return renderGenerateCharacters.current;
  }, []);

  const setResult = useCallback((value: TResource | undefined): void => {
    if (result.current === value) {
      return;
    }

    result.current = value;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setName = useCallback((value: string): void => {
    if (name.current === value) {
      return;
    }

    name.current = value;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setRenderGenerateCharacters = useCallback(
    (value: ReactElement | null): void => {
      if (renderGenerateCharacters.current === value) {
        return;
      }

      renderGenerateCharacters.current = value;
      subscribers.current.forEach((callback) => callback());
    },
    []
  );

  const subscribe = useCallback((callback: TSubscriberCallback) => {
    subscribers.current.add(callback);

    return (): void => {
      subscribers.current.delete(callback);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        getResult,
        getName,
        getRenderGenerateCharacters,
        setResult,
        setName,
        setRenderGenerateCharacters,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
