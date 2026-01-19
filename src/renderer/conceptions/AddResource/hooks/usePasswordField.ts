import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";

export const usePasswordField = () => {
  const [value, setValue] = useState("");

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return {
    value,
    handleChange,
  };
};
