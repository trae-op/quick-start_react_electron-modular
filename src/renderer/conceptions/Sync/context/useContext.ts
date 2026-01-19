import { useContext } from "react";

import { Context } from "./Context";
import type { TContext } from "./types";

export const useSyncContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("Sync context is not available");
  }

  return context;
};
