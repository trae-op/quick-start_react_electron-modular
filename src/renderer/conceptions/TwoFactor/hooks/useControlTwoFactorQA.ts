import { useCallback, useMemo } from "react";
import type { THookControlTwoFactorQA } from "./types";

export const useControlTwoFactorQA = (): THookControlTwoFactorQA => {
  const handleNextStep = useCallback(async () => {
    window.electron.send.windowTwoFactorVerify();
  }, []);

  const value = useMemo(() => ({ handleNextStep }), [handleNextStep]);

  return value;
};
