export type TNameWindows =
  | TWindows["twoFactorQA"]
  | TWindows["main"]
  | TWindows["twoFactorVerify"];

export type TResponseGenerate = {
  base64: string;
};

export type TResponseTwoFactorEnable = {
  message: string;
};

export type TResponseTwoFactorAuthenticate = {
  token: string;
};

export type TBodyTwoFactorCode = {
  twoFactorCode: string;
};

export type TParamsAuthenticate = {
  body: TBodyTwoFactorCode;
};

export type TParamsEnable = TParamsAuthenticate;
