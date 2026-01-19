import { useCallback } from "react";
import type { ChangeEvent } from "react";

import {
  useSetUpdateResourceNameDispatch,
  useUpdateResourceNameSelector,
} from "../context";

export const useUpdateResourceNameField = () => {
  const value = useUpdateResourceNameSelector();
  const setValue = useSetUpdateResourceNameDispatch();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return {
    value,
    handleChange,
  };
};
