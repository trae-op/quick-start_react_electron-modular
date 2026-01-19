import { useCallback, useMemo } from "react";
import type { THookUpdateDownloaded } from "./types";
import {
  useUpdaterPlatformSelector,
  useUpdaterUpdateFileSelector,
} from "../context";

export const useUpdateDownloaded = (): THookUpdateDownloaded => {
  const platform = useUpdaterPlatformSelector();
  const updateFile = useUpdaterUpdateFileSelector();

  const handleUpdate = useCallback(() => {
    if (platform === "win32") {
      window.electron.send.restart();
    }

    if (platform !== "win32" && updateFile !== undefined) {
      window.electron.send.openLatestVersion({
        updateFile,
      });
    }
  }, [platform, updateFile]);

  const value = useMemo(() => ({ handleUpdate }), [handleUpdate]);

  return value;
};
