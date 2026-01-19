import { useSyncExternalStore } from "react";
import type { ReactElement } from "react";

import { useUserContext } from "./useContext";

export const useUserSelector = (): TUser | undefined => {
  const { getUser, subscribe } = useUserContext();

  return useSyncExternalStore(subscribe, getUser, getUser);
};

export const useUserIsNewVersionAppSelector = (): boolean => {
  const { getIsNewVersionApp, subscribe } = useUserContext();

  return useSyncExternalStore(
    subscribe,
    getIsNewVersionApp,
    getIsNewVersionApp
  );
};

export const useUserRenderButtonUpdateAppSelector = (): ReactElement | null => {
  const { getRenderButtonUpdateApp, subscribe } = useUserContext();

  return useSyncExternalStore(
    subscribe,
    getRenderButtonUpdateApp,
    getRenderButtonUpdateApp
  );
};

export const useUserRenderButtonLogoutSelector = (): ReactElement | null => {
  const { getRenderButtonLogout, subscribe } = useUserContext();

  return useSyncExternalStore(
    subscribe,
    getRenderButtonLogout,
    getRenderButtonLogout
  );
};

export const useSetUserDispatch = () => {
  return useUserContext().setUser;
};

export const useSetUserIsNewVersionAppDispatch = () => {
  return useUserContext().setIsNewVersionApp;
};

export const useSetUserRenderButtonUpdateAppDispatch = () => {
  return useUserContext().setRenderButtonUpdateApp;
};

export const useSetUserRenderButtonLogoutDispatch = () => {
  return useUserContext().setRenderButtonLogout;
};
