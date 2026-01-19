import type { TPropsProvider } from "./types";
import { Provider as UserProvider } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  return <UserProvider>{children}</UserProvider>;
};
