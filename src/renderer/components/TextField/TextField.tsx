import { memo } from "react";
import type { TTextFieldProps } from "./types";

export const TextField = memo((props: TTextFieldProps) => {
  const {
    label,
    helperText,
    error = false,
    containerClassName = "",
    className = "",
    ...inputProps
  } = props;

  const inputClassName = ["input-field", className].filter(Boolean).join(" ");
  const fieldClassName = [
    "field-container",
    containerClassName,
    error ? "field-error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={fieldClassName}>
      {label && <span className="field-label">{label}</span>}
      <input className={inputClassName} {...inputProps} />
      {helperText && (
        <span
          className={["field-helper", error ? "field-helper-error" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {helperText}
        </span>
      )}
    </label>
  );
});
