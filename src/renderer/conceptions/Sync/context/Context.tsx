import { createContext, useCallback, useRef } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const isAuthenticated = useRef<boolean | undefined>(undefined);
  const isResources = useRef<boolean | undefined>(undefined);
  const isUser = useRef<boolean | undefined>(undefined);
  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const notify = useCallback(() => {
    subscribers.current.forEach((callback) => callback());
  }, []);

  const getIsAuthenticated = useCallback((): boolean | undefined => {
    return isAuthenticated.current;
  }, []);

  const getIsResources = useCallback((): boolean | undefined => {
    return isResources.current;
  }, []);

  const getIsUser = useCallback((): boolean | undefined => {
    return isUser.current;
  }, []);

  const setAuthenticated = useCallback(
    (value: boolean | undefined): void => {
      if (isAuthenticated.current === value) {
        return;
      }

      isAuthenticated.current = value;
      notify();
    },
    [notify],
  );

  const setResources = useCallback(
    (value: boolean | undefined): void => {
      if (isResources.current === value) {
        return;
      }

      isResources.current = value;
      notify();
    },
    [notify],
  );

  const setUser = useCallback(
    (value: boolean | undefined): void => {
      if (isUser.current === value) {
        return;
      }

      isUser.current = value;
      notify();
    },
    [notify],
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
        getIsAuthenticated,
        getIsResources,
        getIsUser,
        setAuthenticated,
        setResources,
        setUser,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
