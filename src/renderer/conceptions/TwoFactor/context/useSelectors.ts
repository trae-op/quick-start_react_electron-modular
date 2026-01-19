import { useSyncExternalStore } from "react";

import { useTwoFactorContext } from "./useContext";

export const useTwoFactorPendingSelector = (): boolean => {
  const { getPending, subscribe } = useTwoFactorContext();

  return useSyncExternalStore(subscribe, getPending, getPending);
};

export const useTwoFactorBase64Selector = (): string => {
  const { getBase64, subscribe } = useTwoFactorContext();

  return useSyncExternalStore(subscribe, getBase64, getBase64);
};

export const useTwoFactorCodeSelector = (): string => {
  const { getTwoFactorCode, subscribe } = useTwoFactorContext();

  return useSyncExternalStore(subscribe, getTwoFactorCode, getTwoFactorCode);
};

export const useSetTwoFactorPendingDispatch = () => {
  return useTwoFactorContext().setPending;
};

export const useSetTwoFactorBase64Dispatch = () => {
  return useTwoFactorContext().setBase64;
};

export const useSetTwoFactorCodeDispatch = () => {
  return useTwoFactorContext().setTwoFactorCode;
};
