import { ReactNode, ReactElement } from "react";

export type TPropsProvider = {
  children: ReactNode;
  renderGenerateCharacters: ReactElement;
};

export type TFormState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

export type TNameFieldProps = {
  defaultValue?: string;
  error?: string[];
};

export type TGenerateKeyFieldProps = {
  label?: string;
};

export type TPasswordFieldProps = {
  error?: string[];
};

export type TSubmitButtonProps = {
  label?: string;
};
