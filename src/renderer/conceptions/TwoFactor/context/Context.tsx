import { createContext, useCallback, useRef } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const pending = useRef<boolean>(false);
  const base64 = useRef<string>("");
  const twoFactorCode = useRef<string>("");

  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const getPending = useCallback((): boolean => {
    return pending.current;
  }, []);

  const getBase64 = useCallback((): string => {
    return base64.current;
  }, []);

  const getTwoFactorCode = useCallback((): string => {
    return twoFactorCode.current;
  }, []);

  const setPending = useCallback((value: boolean): void => {
    if (pending.current === value) {
      return;
    }

    pending.current = value;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setBase64 = useCallback((value: string): void => {
    if (base64.current === value) {
      return;
    }

    base64.current = value;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setTwoFactorCode = useCallback((value: string): void => {
    if (twoFactorCode.current === value) {
      return;
    }

    twoFactorCode.current = value;
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
        getPending,
        getBase64,
        getTwoFactorCode,
        setPending,
        setBase64,
        setTwoFactorCode,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
