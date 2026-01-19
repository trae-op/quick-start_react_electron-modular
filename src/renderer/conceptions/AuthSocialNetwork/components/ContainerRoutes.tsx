import { memo, type ReactNode } from "react";
import { useIpc } from "../hooks";

export const ContainerRoutes = memo(({ children }: { children: ReactNode }) => {
  useIpc();

  return children;
});
