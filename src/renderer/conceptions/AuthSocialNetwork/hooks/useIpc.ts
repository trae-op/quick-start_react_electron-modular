import { useEffect } from "react";
import { useSetAuthSocialNetworkAuthenticatedDispatch } from "../context";

export const useIpc = () => {
  const setAuthenticated = useSetAuthSocialNetworkAuthenticatedDispatch();

  useEffect(() => {
    window.electron.receive.subscribeWindowAuthSocialNetwork(
      ({ isAuthenticated }) => {
        setAuthenticated(isAuthenticated);
      }
    );
  }, [setAuthenticated]);
};
