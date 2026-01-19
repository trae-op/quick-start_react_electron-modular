import { useState, useMemo, useCallback } from "react";
import type {
  THookControlTwoFactorVerify,
  TChangeEvent,
  TFormEvent,
} from "./types";
import { isValidTwoFactor } from "@utils/regexes";
import {
  useSetTwoFactorCodeDispatch,
  useSetTwoFactorPendingDispatch,
  useTwoFactorCodeSelector,
} from "../context";

export const useControlTwoFactorVerify = (): THookControlTwoFactorVerify => {
  const setTwoFactorCode = useSetTwoFactorCodeDispatch();
  const setPending = useSetTwoFactorPendingDispatch();
  const twoFactorCode = useTwoFactorCodeSelector();
  const [isFocus, setFocus] = useState(false);

  const handleChange = useCallback(
    (event: TChangeEvent) => {
      setTwoFactorCode(event.target.value);
    },
    [setTwoFactorCode]
  );

  const handleSubmit = useCallback(
    (event: TFormEvent) => {
      event.preventDefault();
      setPending(true);
      window.electron.send.sendTwoFactorCodeVerify({ twoFactorCode });
    },
    [setPending, twoFactorCode]
  );

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const isValid = useMemo(
    () => isValidTwoFactor(twoFactorCode),
    [twoFactorCode]
  );
  const isInvalid = useMemo(() => isFocus && !isValid, [isFocus, isValid]);

  const value = useMemo(
    () => ({
      handleChange,
      handleSubmit,
      twoFactorCode,
      handleFocus,
      isInvalid,
      isValid,
    }),
    [handleChange, handleSubmit, twoFactorCode, handleFocus, isInvalid, isValid]
  );

  return value;
};
