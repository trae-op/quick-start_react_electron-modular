import { createContext, useCallback, useRef } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const isMasterKey = useRef<boolean>(false);
  const key = useRef<string>("");

  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const getIsMasterKey = useCallback((): boolean => {
    return isMasterKey.current;
  }, []);

  const getKey = useCallback((): string => {
    return key.current;
  }, []);

  const setIsMasterKey = useCallback((value: boolean): void => {
    if (isMasterKey.current === value) {
      return;
    }

    isMasterKey.current = value;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setKey = useCallback((value: string): void => {
    if (key.current === value) {
      return;
    }

    key.current = value;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: TSubscriberCallback) => {
    subscribers.current.add(callback);

    return (): void => {
      subscribers.current.delete(callback);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        getIsMasterKey,
        getKey,
        setIsMasterKey,
        setKey,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
