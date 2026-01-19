import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";

export const useUpdateResourceGenerateKeyField = () => {
  const [isChecked, setChecked] = useState(false);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  }, []);

  return {
    isChecked,
    handleChange,
  };
};
