import { memo } from "react";
import { TLoadingSpinnerProps } from "./types";

export const LoadingSpinner = memo((props: TLoadingSpinnerProps) => {
  const { className = "", inline = false, size = "md", ...other } = props;

  const containerClassName = [
    inline ? "spinner-inline" : "spinner-block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const loaderClassName =
    typeof size === "string" ? `spinner-${size}` : "spinner-md";

  const loaderStyle =
    typeof size === "number"
      ? {
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${Math.max(1, Math.round(size / 8))}px`,
        }
      : undefined;

  return (
    <div className={containerClassName} {...other}>
      <span
        aria-hidden="true"
        className={loaderClassName}
        style={loaderStyle}
      />
    </div>
  );
});
