import { createContext, useCallback, useRef } from "react";

import type { TContext, TProviderProps, TSubscriberCallback } from "./types";

export const Context = createContext<TContext | null>(null);

export function Provider({ children }: TProviderProps) {
  const status = useRef<TUpdateData["status"]>("checking-for-update");
  const downloadedPercent = useRef<string | undefined>(undefined);
  const message = useRef<string | undefined>(undefined);
  const version = useRef<string | undefined>(undefined);
  const platform = useRef<string | undefined>(undefined);
  const updateFile = useRef<string | undefined>(undefined);

  const subscribers = useRef<Set<TSubscriberCallback>>(new Set());

  const getStatus = useCallback((): TUpdateData["status"] => {
    return status.current;
  }, []);

  const getDownloadedPercent = useCallback((): string | undefined => {
    return downloadedPercent.current;
  }, []);

  const getMessage = useCallback((): string | undefined => {
    return message.current;
  }, []);

  const getVersion = useCallback((): string | undefined => {
    return version.current;
  }, []);

  const getPlatform = useCallback((): string | undefined => {
    return platform.current;
  }, []);

  const getUpdateFile = useCallback((): string | undefined => {
    return updateFile.current;
  }, []);

  const notify = useCallback(() => {
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setStatus = useCallback(
    (value: TUpdateData["status"]): void => {
      if (status.current === value) {
        return;
      }

      status.current = value;
      notify();
    },
    [notify]
  );

  const setDownloadedPercent = useCallback(
    (value: string | undefined): void => {
      if (downloadedPercent.current === value) {
        return;
      }

      downloadedPercent.current = value;
      notify();
    },
    [notify]
  );

  const setMessage = useCallback(
    (value: string | undefined): void => {
      if (message.current === value) {
        return;
      }

      message.current = value;
      notify();
    },
    [notify]
  );

  const setVersion = useCallback(
    (value: string | undefined): void => {
      if (version.current === value) {
        return;
      }

      version.current = value;
      notify();
    },
    [notify]
  );

  const setPlatform = useCallback(
    (value: string | undefined): void => {
      if (platform.current === value) {
        return;
      }

      platform.current = value;
      notify();
    },
    [notify]
  );

  const setUpdateFile = useCallback(
    (value: string | undefined): void => {
      if (updateFile.current === value) {
        return;
      }

      updateFile.current = value;
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
        getStatus,
        getDownloadedPercent,
        getMessage,
        getVersion,
        getPlatform,
        getUpdateFile,
        setStatus,
        setDownloadedPercent,
        setMessage,
        setVersion,
        setPlatform,
        setUpdateFile,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}
