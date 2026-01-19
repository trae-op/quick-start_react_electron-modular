import type { TextareaHTMLAttributes } from "react";

export type TTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  containerClassName?: string;
};
