import { useSyncExternalStore } from "react";

import { useSyncContext } from "./useContext";

export const useSyncIsAuthenticatedSelector = (): boolean | undefined => {
  const { getIsAuthenticated, subscribe } = useSyncContext();

  return useSyncExternalStore(
    subscribe,
    getIsAuthenticated,
    getIsAuthenticated,
  );
};

export const useSyncIsResourcesSelector = (): boolean | undefined => {
  const { getIsResources, subscribe } = useSyncContext();

  return useSyncExternalStore(subscribe, getIsResources, getIsResources);
};

export const useSyncIsUserSelector = (): boolean | undefined => {
  const { getIsUser, subscribe } = useSyncContext();

  return useSyncExternalStore(subscribe, getIsUser, getIsUser);
};

export const useSetSyncIsAuthenticatedDispatch = () => {
  return useSyncContext().setAuthenticated;
};

export const useSetSyncIsResourcesDispatch = () => {
  return useSyncContext().setResources;
};

export const useSetSyncIsUserDispatch = () => {
  return useSyncContext().setUser;
};
