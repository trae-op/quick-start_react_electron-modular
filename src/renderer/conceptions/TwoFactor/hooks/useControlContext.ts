import {
  useSetTwoFactorBase64Dispatch,
  useSetTwoFactorCodeDispatch,
  useSetTwoFactorPendingDispatch,
  useTwoFactorBase64Selector,
  useTwoFactorCodeSelector,
  useTwoFactorPendingSelector,
} from "../context";

export const useControlContext = () => {
  const pending = useTwoFactorPendingSelector();
  const base64 = useTwoFactorBase64Selector();
  const twoFactorCode = useTwoFactorCodeSelector();

  return {
    pending,
    base64,
    twoFactorCode,
  };
};

export const useControlContextActions = () => {
  const setPending = useSetTwoFactorPendingDispatch();
  const setBase64 = useSetTwoFactorBase64Dispatch();
  const setTwoFactorCode = useSetTwoFactorCodeDispatch();

  return {
    setPending,
    setBase64,
    setTwoFactorCode,
  };
};
