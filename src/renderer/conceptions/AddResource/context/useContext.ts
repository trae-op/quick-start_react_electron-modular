import { useContext } from "react";

import { Context } from "./Context";
import type { TContext } from "./types";

export const useAddResourceContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("AddResource context is not available");
  }

  return context;
};
