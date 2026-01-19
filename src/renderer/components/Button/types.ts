import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TButtonVariant = "primary" | "ghost";
export type TButtonSize = "small" | "medium" | "large";

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: TButtonVariant;
  size?: TButtonSize;
  loading?: boolean;
  children: ReactNode;
};
