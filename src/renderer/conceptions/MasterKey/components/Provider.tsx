import type { TPropsProvider } from "./types";
import { Provider as MasterKeyProvider } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  return <MasterKeyProvider>{children}</MasterKeyProvider>;
};
