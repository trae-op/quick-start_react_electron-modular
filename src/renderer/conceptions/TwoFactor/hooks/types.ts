export type TEventButton = React.MouseEvent<HTMLButtonElement>;

export type THookControl = {
  handleProvider: (event: TEventButton) => void;
};

export type TChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type TFormEvent = React.FormEvent<HTMLFormElement>;

export type THookControlTwoFactorVerify = {
  handleChange: (event: TChangeEvent) => void;
  handleSubmit: (event: TFormEvent) => void;
  handleFocus: () => void;
  twoFactorCode: string;
  isInvalid: boolean;
  isValid: boolean;
};

export type THookControlTwoFactorQA = {
  handleNextStep: () => void;
};

export type THookSubscribeEventTwoFactorQA = {
  base64: string;
};
