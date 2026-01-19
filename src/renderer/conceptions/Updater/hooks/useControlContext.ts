import {
  useUpdaterDownloadedPercentSelector,
  useUpdaterMessageSelector,
  useUpdaterPlatformSelector,
  useUpdaterStatusSelector,
  useUpdaterUpdateFileSelector,
  useUpdaterVersionSelector,
} from "../context";

export const useControlContext = () => {
  const status = useUpdaterStatusSelector();
  const downloadedPercent = useUpdaterDownloadedPercentSelector();
  const message = useUpdaterMessageSelector();
  const version = useUpdaterVersionSelector();
  const platform = useUpdaterPlatformSelector();
  const updateFile = useUpdaterUpdateFileSelector();

  return {
    status,
    downloadedPercent,
    message,
    version,
    platform,
    updateFile,
  };
};
