type TCallbackOpenLatestVersion = {
  updateFile: string;
};
type TCallbackAuthSocialNetwork = {
  providers: TProviders;
};
type TCallbackSendTwoFactorCodeVerify = {
  twoFactorCode: string;
};

type TCallbackResource = {
  id: string;
};

type TCallbackOpenUpdateResource = TCallbackResource;
type TCallbackOpenDeleteResource = TCallbackResource;
type TCallbackCopyKey = TCallbackResource;

type TEventPayloadSend = {
  restart: undefined;
  closePreloadWindow: undefined;
  openLatestVersion: TCallbackOpenLatestVersion;
  authSocialNetwork: TCallbackAuthSocialNetwork;
  twoFactorCodeVerify: TCallbackSendTwoFactorCodeVerify;
  twoFactorVerify: undefined;
  checkUser: undefined;
  sync: undefined;
  logout: undefined;
  openUpdateResource: TCallbackOpenUpdateResource;
  openDeleteResource: TCallbackOpenDeleteResource;
  getResource: TCallbackResource;
  copyKey: TCallbackCopyKey;
  masterKey: undefined;
  checkMasterKey: undefined;
  deleteMasterKey: undefined;
  resources: undefined;
  openAddResource: undefined;
  cancelDeleteResource: undefined;
};

type TSend = {
  restart: () => void;
  closePreloadWindow: () => void;
  openLatestVersion: (payload: TEventPayloadSend["openLatestVersion"]) => void;
  windowAuthSocialNetwork: (
    payload: TEventPayloadSend["authSocialNetwork"]
  ) => void;
  windowTwoFactorVerify: () => void;
  checkUser: () => void;
  sync: () => void;
  sendTwoFactorCodeVerify: (
    payload: TEventPayloadSend["twoFactorCodeVerify"]
  ) => void;
  windowOpenUpdateResource: (
    payload: TEventPayloadSend["openUpdateResource"]
  ) => void;
  windowOpenDeleteResource: (
    payload: TEventPayloadSend["openDeleteResource"]
  ) => void;
  copyKey: (payload: TEventPayloadSend["copyKey"]) => void;
  windowMasterKey: () => void;
  checkMasterKey: () => void;
  deleteMasterKey: () => void;
  windowOpenAddResource: () => void;
  cancelDeleteResource: () => void;
  getResource: (payload: TEventPayloadSend["getResource"]) => void;
  logout: () => void;
  resources: () => void;
};
