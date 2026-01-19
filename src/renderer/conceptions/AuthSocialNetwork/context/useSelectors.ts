import { useSyncExternalStore } from "react";

import { useAuthSocialNetworkContext } from "./useContext";

export const useAuthSocialNetworkAuthenticatedSelector = ():
  | boolean
  | undefined => {
  const { getIsAuthenticated, subscribe } = useAuthSocialNetworkContext();

  return useSyncExternalStore(
    subscribe,
    getIsAuthenticated,
    getIsAuthenticated
  );
};

export const useSetAuthSocialNetworkAuthenticatedDispatch = () => {
  return useAuthSocialNetworkContext().setIsAuthenticated;
};
