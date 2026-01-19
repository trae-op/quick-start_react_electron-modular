import { useCallback, useMemo } from "react";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const handleDeleteMasterKey = useCallback(() => {
    window.electron.send.deleteMasterKey();
  }, []);

  const value = useMemo(
    () => ({
      handleDeleteMasterKey,
    }),
    [handleDeleteMasterKey]
  );

  return value;
};
