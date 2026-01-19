import { useCallback } from "react";
import type { ChangeEvent } from "react";

import {
  useAddResourceNameSelector,
  useSetAddResourceNameDispatch,
} from "../context";

export const useNameField = () => {
  const value = useAddResourceNameSelector();
  const setValue = useSetAddResourceNameDispatch();

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
