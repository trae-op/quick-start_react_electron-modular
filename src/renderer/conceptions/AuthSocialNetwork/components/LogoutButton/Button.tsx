import { forwardRef } from "react";
import { useControl } from "../../hooks";
import type { TComponentGenericForwardRef } from "./types";

export const LogoutButton = forwardRef(
  ({ component: Component, children, ...otherProps }, ref) => {
    const { handleLogout } = useControl();

    return (
      <Component onClick={handleLogout} ref={ref} {...otherProps}>
        {children}
      </Component>
    );
  }
) as TComponentGenericForwardRef;
