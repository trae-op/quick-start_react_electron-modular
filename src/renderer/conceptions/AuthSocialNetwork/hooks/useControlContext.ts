import {
  useAuthSocialNetworkAuthenticatedSelector,
  useSetAuthSocialNetworkAuthenticatedDispatch,
} from "../context";

export const useControlContext = () => {
  const isAuthenticated = useAuthSocialNetworkAuthenticatedSelector();

  return {
    isAuthenticated,
  };
};

export const useControlContextActions = () => {
  const setAuthenticated = useSetAuthSocialNetworkAuthenticatedDispatch();

  return {
    setAuthenticated,
  };
};
