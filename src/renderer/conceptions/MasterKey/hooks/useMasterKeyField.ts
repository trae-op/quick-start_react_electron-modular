import { useCallback } from "react";
import type { ChangeEvent } from "react";

import {
  useMasterKeyValueSelector,
  useSetMasterKeyValueDispatch,
} from "../context";

export const useMasterKeyField = () => {
  const value = useMasterKeyValueSelector();
  const setValue = useSetMasterKeyValueDispatch();

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
