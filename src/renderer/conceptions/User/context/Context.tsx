import { createContext, useCallback, useRef } from "react";
import type { ReactElement } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const user = useRef<TUser | undefined>(undefined);
  const isNewVersionApp = useRef<boolean>(false);
  const renderButtonUpdateApp = useRef<ReactElement | null>(null);
  const renderButtonLogout = useRef<ReactElement | null>(null);

  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const getUser = useCallback((): TUser | undefined => {
    return user.current;
  }, []);

  const getIsNewVersionApp = useCallback((): boolean => {
    return isNewVersionApp.current;
  }, []);

  const getRenderButtonUpdateApp = useCallback((): ReactElement | null => {
    return renderButtonUpdateApp.current;
  }, []);

  const getRenderButtonLogout = useCallback((): ReactElement | null => {
    return renderButtonLogout.current;
  }, []);

  const notify = useCallback(() => {
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setUser = useCallback(
    (value: TUser | undefined): void => {
      if (user.current === value) {
        return;
      }

      user.current = value;
      notify();
    },
    [notify]
  );

  const setIsNewVersionApp = useCallback(
    (value: boolean): void => {
      if (isNewVersionApp.current === value) {
        return;
      }

      isNewVersionApp.current = value;
      notify();
    },
    [notify]
  );

  const setRenderButtonUpdateApp = useCallback(
    (value: ReactElement | null): void => {
      if (renderButtonUpdateApp.current === value) {
        return;
      }

      renderButtonUpdateApp.current = value;
      notify();
    },
    [notify]
  );

  const setRenderButtonLogout = useCallback(
    (value: ReactElement | null): void => {
      if (renderButtonLogout.current === value) {
        return;
      }

      renderButtonLogout.current = value;
      notify();
    },
    [notify]
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
        getUser,
        getIsNewVersionApp,
        getRenderButtonUpdateApp,
        getRenderButtonLogout,
        setUser,
        setIsNewVersionApp,
        setRenderButtonUpdateApp,
        setRenderButtonLogout,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
