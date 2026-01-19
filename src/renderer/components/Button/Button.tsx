import { memo } from "react";
import type { TButtonProps, TButtonSize, TButtonVariant } from "./types";

const variantClasses: Record<TButtonVariant, string> = {
  ghost: "ui-btn--ghost",
  primary: "ui-btn--primary",
};

const sizeClasses: Record<TButtonSize, string> = {
  large: "ui-btn--lg",
  medium: "",
  small: "ui-btn--sm",
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

  const combinedClassName = [
    "ui-btn",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
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
      {loading && <span aria-hidden="true" className="ui-loader" />}
      <span>{children}</span>
    </button>
  );
});
