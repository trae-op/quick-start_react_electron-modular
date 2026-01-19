import { useEffect } from "react";
import { useSetMasterKeyIsMasterKeyDispatch } from "../context";

export const useIpc = () => {
  const setMasterKey = useSetMasterKeyIsMasterKeyDispatch();

  useEffect(() => {
    window.electron.send.checkMasterKey();
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeMasterKey(({ isMasterKey }) => {
      setMasterKey(isMasterKey);
    });
  }, [setMasterKey]);
};
