import { createContext, useCallback, useRef } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const resourceId = useRef<string | undefined>(undefined);
  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const getResourceId = useCallback((): string | undefined => {
    return resourceId.current;
  }, []);

  const setResourceId = useCallback((value: string | undefined): void => {
    if (resourceId.current === value) {
      return;
    }

    resourceId.current = value;
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
        getResourceId,
        setResourceId,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
