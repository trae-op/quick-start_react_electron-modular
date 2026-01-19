import { createContext, useCallback, useRef } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const isAuthenticated = useRef<boolean | undefined>(undefined);
  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const getIsAuthenticated = useCallback((): boolean | undefined => {
    return isAuthenticated.current;
  }, []);

  const setIsAuthenticated = useCallback((value: boolean | undefined): void => {
    if (isAuthenticated.current === value) {
      return;
    }

    isAuthenticated.current = value;
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
        getIsAuthenticated,
        setIsAuthenticated,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
