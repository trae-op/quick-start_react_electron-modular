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

  const inputClassName = ["ui-input", className].filter(Boolean).join(" ");
  const fieldClassName = [
    "text-field",
    containerClassName,
    error ? "text-field--error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={fieldClassName}>
      {label && <span className="text-field__label">{label}</span>}
      <input className={inputClassName} {...inputProps} />
      {helperText && (
        <span className="text-field__helper" data-error={error}>
          {helperText}
        </span>
      )}
    </label>
  );
});
