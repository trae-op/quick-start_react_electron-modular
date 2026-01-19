import { useContext } from "react";

import { Context } from "./Context";
import type { TContext } from "./types";

export const useDeleteResourceContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("DeleteResource context is not available");
  }

  return context;
};
