import type { TPropsProvider } from "./types";
import { Provider as SyncProvider } from "../context/Context";

export const Provider = ({ children }: TPropsProvider) => {
  return <SyncProvider>{children}</SyncProvider>;
};
