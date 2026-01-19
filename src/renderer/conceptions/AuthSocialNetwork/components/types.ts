import { type ButtonProps } from "@mui/material/Button";
import { type ReactNode } from "react";

export type TPropsButtonProvider = ButtonProps & {
  text: string;
};

export type TPropsButtonLogout<P extends Record<string, any>> = P & {
  component: React.ElementType<P>;
  children?: React.ReactNode;
};

export type TPropsProvider = {
  children: ReactNode;
};

export type TPropsPrivateRoute = {
  children: ReactNode;
};
