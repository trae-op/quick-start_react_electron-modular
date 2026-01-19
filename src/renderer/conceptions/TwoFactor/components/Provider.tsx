import { Outlet } from "react-router-dom";
import { Provider as TwoFactorProvider } from "../context";

export const Provider = () => {
  return (
    <TwoFactorProvider>
      <Outlet />
    </TwoFactorProvider>
  );
};
