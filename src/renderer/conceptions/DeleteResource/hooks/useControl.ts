import { useCallback, useMemo } from "react";
import { THookControl } from "./types";
import { useDeleteResourceIdSelector } from "../context";

export const useControl = (): THookControl => {
  const id = useDeleteResourceIdSelector();

  const submitFormAction = useCallback(async (): Promise<undefined> => {
    if (id !== undefined) {
      await window.electron.invoke.deleteResource({
        id: id + "",
      });
    }
  }, [id]);

  const handleCancel = useCallback(() => {
    window.electron.send.cancelDeleteResource();
  }, []);

  const value = useMemo(
    () => ({
      submitFormAction,
      handleCancel,
    }),
    [submitFormAction, handleCancel]
  );

  return value;
};
