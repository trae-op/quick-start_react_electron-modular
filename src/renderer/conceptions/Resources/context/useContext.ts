import { useContext } from "react";

import { Context } from "./Context.tsx";
import type { TContext } from "./types";

export const useResourcesContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("Resources context is not available");
  }

  return context;
};
