import { useContext } from "react";

import { Context } from "./Context";
import type { TContext } from "./types";

export const useUpdaterContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("Updater context is not available");
  }

  return context;
};
