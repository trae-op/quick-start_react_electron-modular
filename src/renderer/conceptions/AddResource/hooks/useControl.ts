import { useCallback, useMemo } from "react";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const handleAdd = useCallback(() => {
    window.electron.send.windowOpenAddResource();
  }, []);

  const value = useMemo(
    () => ({
      handleAdd,
    }),
    [handleAdd]
  );

  return value;
};
