import { useEffect } from "react";
import {
  useSetUpdaterDownloadedPercentDispatch,
  useSetUpdaterMessageDispatch,
  useSetUpdaterPlatformDispatch,
  useSetUpdaterStatusDispatch,
  useSetUpdaterUpdateFileDispatch,
  useSetUpdaterVersionDispatch,
} from "../context";

export const useIpc = (): void => {
  const setStatus = useSetUpdaterStatusDispatch();
  const setDownloadedPercent = useSetUpdaterDownloadedPercentDispatch();
  const setMessage = useSetUpdaterMessageDispatch();
  const setVersion = useSetUpdaterVersionDispatch();
  const setPlatform = useSetUpdaterPlatformDispatch();
  const setUpdateFile = useSetUpdaterUpdateFileDispatch();

  useEffect(() => {
    const unSub = window.electron.receive.subscribeUpdateApp((payload) => {
      setStatus(payload.status);
      setDownloadedPercent(payload.downloadedPercent);
      setMessage(payload.message);
      setVersion(payload.version);
      setPlatform(payload.platform);
      setUpdateFile(payload.updateFile);
    });

    return unSub;
  }, [
    setDownloadedPercent,
    setMessage,
    setPlatform,
    setStatus,
    setUpdateFile,
    setVersion,
  ]);
};
