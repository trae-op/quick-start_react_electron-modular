import type { TPropsProvider } from "./types";
import { Provider as AuthSocialNetworkProvider } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  return <AuthSocialNetworkProvider>{children}</AuthSocialNetworkProvider>;
};
