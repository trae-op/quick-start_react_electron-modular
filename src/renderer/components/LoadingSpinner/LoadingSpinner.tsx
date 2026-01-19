import { memo } from "react";
import { TLoadingSpinnerProps } from "./types";

export const LoadingSpinner = memo((props: TLoadingSpinnerProps) => {
  const { className = "", inline = false, size = "md", ...other } = props;

  const containerClassName = [
    "loading-spinner",
    inline ? "loading-spinner--inline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const loaderClassName = [
    "ui-loader",
    typeof size === "string" ? `ui-loader--${size}` : "",
  ]
    .filter(Boolean)
    .join(" ");

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
