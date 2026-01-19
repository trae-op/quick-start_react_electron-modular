import type { InputHTMLAttributes } from "react";

export type TTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  containerClassName?: string;
};
