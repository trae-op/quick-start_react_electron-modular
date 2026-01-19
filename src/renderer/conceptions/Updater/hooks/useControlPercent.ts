import { useMemo } from "react";
import type { THookControlPercent } from "./types";
import { useUpdaterDownloadedPercentSelector } from "../context";

export const useControlPercent = (): THookControlPercent => {
  const downloadedPercent = useUpdaterDownloadedPercentSelector();
  const percent = useMemo(
    () =>
      downloadedPercent === undefined
        ? undefined
        : Math.round(Number(downloadedPercent)),
    [downloadedPercent]
  );

  const value = useMemo(() => ({ percent }), [percent]);

  return value;
};
