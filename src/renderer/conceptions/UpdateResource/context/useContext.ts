import { useContext } from "react";

import { Context } from "./Context";
import type { TContext } from "./types";

export const useUpdateResourceContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("UpdateResource context is not available");
  }

  return context;
};
