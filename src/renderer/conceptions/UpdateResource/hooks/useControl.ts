import { ChangeEvent, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSetUpdateResourceNameDispatch } from "../context";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { id } = useParams<{ id: string }>();
  const setName = useSetUpdateResourceNameDispatch();

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  const submitFormAction = useCallback(
    async (_: undefined, formData: FormData): Promise<undefined> => {
      const name = formData.get("name");
      const key = formData.get("password");

      if (name !== null) {
        await window.electron.invoke.putResource({
          id,
          name,
          ...(key !== null ? { key } : {}),
        });
      }
    },
    [id]
  );

  const value = useMemo(
    () => ({
      submitFormAction,
      handleTextInputChange,
    }),
    [submitFormAction, handleTextInputChange]
  );

  return value;
};
