import { ReactNode, ReactElement } from "react";

export type TPropsForm = {
  renderGenerateCharacters: ReactElement;
};

export type TPropsProvider = {
  children: ReactNode;
};

export type TFormState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

export type TMasterKeyFieldProps = {
  error?: string[];
};

export type TSubmitButtonProps = {
  label?: string;
};
