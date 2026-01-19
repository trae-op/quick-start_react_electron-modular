import { useContext } from "react";

import { Context } from "./Context";
import type { TContext } from "./types";

export const useUserContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("User context is not available");
  }

  return context;
};
