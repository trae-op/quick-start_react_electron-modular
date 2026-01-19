import { createContext, useCallback, useRef } from "react";
import type { ReactElement } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const name = useRef<string>("");
  const renderGenerateCharacters = useRef<ReactElement | null>(null);
  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const getName = useCallback((): string => {
    return name.current;
  }, []);

  const getRenderGenerateCharacters = useCallback((): ReactElement | null => {
    return renderGenerateCharacters.current;
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
        getName,
        getRenderGenerateCharacters,
        setName,
        setRenderGenerateCharacters,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
