import { useContext } from "react";

import { Context } from "./Context";
import type { TContext } from "./types";

export const useAuthSocialNetworkContext = (): TContext => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("AuthSocialNetwork context is not available");
  }

  return context;
};
