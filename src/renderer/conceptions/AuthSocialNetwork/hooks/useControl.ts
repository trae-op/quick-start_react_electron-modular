import { useCallback, useMemo } from "react";
import type { THookControl, TEventButton } from "./types";

export const useControl = (): THookControl => {
  const handleProvider = useCallback((event: TEventButton) => {
    const providers = (event.target as HTMLButtonElement).dataset
      .provider as TProviders;
    window.electron.send.windowAuthSocialNetwork({
      providers,
    });
  }, []);

  const handleLogout = useCallback(() => {
    window.electron.send.logout();
  }, []);

  const value = useMemo(
    () => ({
      handleLogout,
      handleProvider,
    }),
    [handleLogout, handleProvider]
  );

  return value;
};
