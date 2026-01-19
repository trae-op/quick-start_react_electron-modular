type TUser = {
  id: number;
  email: string | null;
  sourceId: string | null;
  twoFactorSecret: string | null;
  isTwoFactorEnabled: boolean;
  avatar: string | null;
  role: "USER" | "ADMIN";
  provider: TProviders;
  resources: TResource[];
};
