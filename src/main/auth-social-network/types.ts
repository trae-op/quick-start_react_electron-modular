export type TAuthSocialNetworkTwoFactorProvider = {
  createWindow: (
    nameWindow: TWindows["twoFactorQA"] | TWindows["twoFactorVerify"]
  ) => Promise<void>;
};
