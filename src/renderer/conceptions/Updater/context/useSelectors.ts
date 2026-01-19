import { useSyncExternalStore } from "react";

import { useUpdaterContext } from "./useContext";

export const useUpdaterStatusSelector = (): TUpdateData["status"] => {
  const { getStatus, subscribe } = useUpdaterContext();

  return useSyncExternalStore(subscribe, getStatus, getStatus);
};

export const useUpdaterDownloadedPercentSelector = (): string | undefined => {
  const { getDownloadedPercent, subscribe } = useUpdaterContext();

  return useSyncExternalStore(
    subscribe,
    getDownloadedPercent,
    getDownloadedPercent
  );
};

export const useUpdaterMessageSelector = (): string | undefined => {
  const { getMessage, subscribe } = useUpdaterContext();

  return useSyncExternalStore(subscribe, getMessage, getMessage);
};

export const useUpdaterVersionSelector = (): string | undefined => {
  const { getVersion, subscribe } = useUpdaterContext();

  return useSyncExternalStore(subscribe, getVersion, getVersion);
};

export const useUpdaterPlatformSelector = (): string | undefined => {
  const { getPlatform, subscribe } = useUpdaterContext();

  return useSyncExternalStore(subscribe, getPlatform, getPlatform);
};

export const useUpdaterUpdateFileSelector = (): string | undefined => {
  const { getUpdateFile, subscribe } = useUpdaterContext();

  return useSyncExternalStore(subscribe, getUpdateFile, getUpdateFile);
};

export const useSetUpdaterStatusDispatch = () => {
  return useUpdaterContext().setStatus;
};

export const useSetUpdaterDownloadedPercentDispatch = () => {
  return useUpdaterContext().setDownloadedPercent;
};

export const useSetUpdaterMessageDispatch = () => {
  return useUpdaterContext().setMessage;
};

export const useSetUpdaterVersionDispatch = () => {
  return useUpdaterContext().setVersion;
};

export const useSetUpdaterPlatformDispatch = () => {
  return useUpdaterContext().setPlatform;
};

export const useSetUpdaterUpdateFileDispatch = () => {
  return useUpdaterContext().setUpdateFile;
};
