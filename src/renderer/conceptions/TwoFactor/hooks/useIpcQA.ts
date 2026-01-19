import { useEffect, useRef } from "react";
import isEqual from "lodash.isequal";
import {
  useSetTwoFactorBase64Dispatch,
  useTwoFactorBase64Selector,
} from "../context";

export const useIpcQA = () => {
  const setBase64 = useSetTwoFactorBase64Dispatch();
  const base64 = useTwoFactorBase64Selector();
  const base64Ref = useRef(base64);

  useEffect(() => {
    base64Ref.current = base64;
  }, [base64]);

  useEffect(() => {
    const unSub = window.electron.receive.subscribeWindowTwoFactorQA((data) => {
      if (
        data.base64 !== undefined &&
        !isEqual(base64Ref.current, data.base64)
      ) {
        setBase64(data.base64 || "");
      }
    });

    return unSub;
  }, [setBase64]);
};
