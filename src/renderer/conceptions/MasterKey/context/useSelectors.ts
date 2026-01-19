import { useSyncExternalStore } from "react";

import { useMasterKeyContext } from "./useContext";

export const useMasterKeyIsMasterKeySelector = (): boolean => {
  const { getIsMasterKey, subscribe } = useMasterKeyContext();

  return useSyncExternalStore(subscribe, getIsMasterKey, getIsMasterKey);
};

export const useMasterKeyValueSelector = (): string => {
  const { getKey, subscribe } = useMasterKeyContext();

  return useSyncExternalStore(subscribe, getKey, getKey);
};

export const useSetMasterKeyIsMasterKeyDispatch = () => {
  return useMasterKeyContext().setIsMasterKey;
};

export const useSetMasterKeyValueDispatch = () => {
  return useMasterKeyContext().setKey;
};
