import { createContext, useCallback, useRef } from "react";
import isEqual from "lodash.isequal";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const list = useRef<TResource[] | undefined>(undefined);
  const isMasterKey = useRef<boolean>(false);
  const isDisabledActions = useRef<boolean>(false);
  const copyKeyResourceId = useRef<string | undefined>(undefined);

  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const notify = useCallback(() => {
    subscribers.current.forEach((callback) => callback());
  }, []);

  const getList = useCallback((): TResource[] | undefined => {
    return list.current;
  }, []);

  const getIsMasterKey = useCallback((): boolean => {
    return isMasterKey.current;
  }, []);

  const getIsDisabledActions = useCallback((): boolean => {
    return isDisabledActions.current;
  }, []);

  const getCopyKeyResourceId = useCallback((): string | undefined => {
    return copyKeyResourceId.current;
  }, []);

  const setList = useCallback(
    (value: TResource[] | undefined): void => {
      if (isEqual(list.current, value)) {
        return;
      }

      list.current = value;
      notify();
    },
    [notify]
  );

  const setIsMasterKey = useCallback(
    (value: boolean): void => {
      if (isMasterKey.current === value) {
        return;
      }

      isMasterKey.current = value;
      notify();
    },
    [notify]
  );

  const setIsDisabledActions = useCallback(
    (value: boolean): void => {
      if (isDisabledActions.current === value) {
        return;
      }

      isDisabledActions.current = value;
      notify();
    },
    [notify]
  );

  const setCopyKeyResourceId = useCallback(
    (value: string | undefined): void => {
      if (copyKeyResourceId.current === value) {
        return;
      }

      copyKeyResourceId.current = value;
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
        getList,
        getIsMasterKey,
        getIsDisabledActions,
        getCopyKeyResourceId,
        setList,
        setIsMasterKey,
        setIsDisabledActions,
        setCopyKeyResourceId,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
