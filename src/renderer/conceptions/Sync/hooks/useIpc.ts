import { useCallback, useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setUser, setAuthenticated, setResources } =
    useControlContextActions();

  const subscribeSync = useCallback(() => {
    return window.electron.receive.subscribeSync(
      ({ isAuthenticated, isResources, isUser }) => {
        if (isAuthenticated !== undefined) {
          setAuthenticated(isAuthenticated);
        }

        if (isUser !== undefined) {
          setUser(isUser);
        }

        if (isResources !== undefined) {
          setResources(isResources);
        }
      },
    );
  }, []);

  useEffect(() => {
    window.electron.send.sync();
  }, []);

  useEffect(() => {
    const unSub = subscribeSync();

    return unSub;
  }, []);
};
