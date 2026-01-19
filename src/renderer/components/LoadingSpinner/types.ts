import type { HTMLAttributes } from "react";

export type TLoadingSpinnerPresets = "xs" | "sm" | "md" | "lg" | "xl";

export type TLoadingSpinnerProps = HTMLAttributes<HTMLDivElement> & {
  inline?: boolean;
  size?: TLoadingSpinnerPresets | number;
};
