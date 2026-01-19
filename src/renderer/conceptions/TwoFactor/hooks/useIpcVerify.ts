import { useEffect } from "react";
import {
  useSetTwoFactorCodeDispatch,
  useSetTwoFactorPendingDispatch,
} from "../context";

export const useIpcVerify = () => {
  const setPending = useSetTwoFactorPendingDispatch();
  const setTwoFactorCode = useSetTwoFactorCodeDispatch();

  useEffect(() => {
    const unSub =
      window.electron.receive.subscribeWindowSendTwoFactorCodeVerify(() => {
        setPending(false);
        setTwoFactorCode("");
      });

    return unSub;
  }, [setPending, setTwoFactorCode]);
};
