import { useContext } from "react";

import { Context } from "./Context";
import type { TContext } from "./types";

export const useTwoFactorContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("TwoFactor context is not available");
  }

  return context;
};
