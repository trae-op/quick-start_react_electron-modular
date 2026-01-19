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

  const textareaClassName = ["ui-textarea", className]
    .filter(Boolean)
    .join(" ");
  const containerClassNameFull = [
    "textarea",
    containerClassName,
    error ? "textarea--error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={containerClassNameFull}>
      {label && <span className="textarea__label">{label}</span>}
      <textarea className={textareaClassName} {...textareaProps} />
      {helperText && (
        <span className="textarea__helper" data-error={error}>
          {helperText}
        </span>
      )}
    </label>
  );
});
