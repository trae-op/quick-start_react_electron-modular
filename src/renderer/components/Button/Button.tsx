import { memo } from "react";
import type { TButtonProps, TButtonSize, TButtonVariant } from "./types";

const buttonClassMap: Record<TButtonVariant, Record<TButtonSize, string>> = {
  primary: {
    large: "button-primary-large",
    medium: "button-primary-medium",
    small: "button-primary-small",
  },
  ghost: {
    large: "button-ghost-large",
    medium: "button-ghost-medium",
    small: "button-ghost-small",
  },
};

export const Button = memo((props: TButtonProps) => {
  const {
    variant = "primary",
    size = "medium",
    loading = false,
    disabled,
    className = "",
    children,
    type,
    ...rest
  } = props;

  const combinedClassName = [buttonClassMap[variant][size], className]
    .filter(Boolean)
    .join(" ");

  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      {...rest}
      className={combinedClassName}
      disabled={isDisabled}
      aria-busy={loading}
      type={type ?? "button"}
    >
      {loading && <span aria-hidden="true" className="spinner-md" />}
      <span>{children}</span>
    </button>
  );
});
