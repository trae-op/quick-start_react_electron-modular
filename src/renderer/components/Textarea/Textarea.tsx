import { memo } from "react";
import type { TTextareaProps } from "./types";

export const Textarea = memo((props: TTextareaProps) => {
  const {
    label,
    helperText,
    error = false,
    containerClassName = "",
    className = "",
    ...textareaProps
  } = props;

  const textareaClassName = ["textarea-field", className]
    .filter(Boolean)
    .join(" ");
  const containerClassNameFull = [
    "field-container",
    containerClassName,
    error ? "field-error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={containerClassNameFull}>
      {label && <span className="field-label">{label}</span>}
      <textarea className={textareaClassName} {...textareaProps} />
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
