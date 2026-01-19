type TEventPayloadSend = {
  // closePreloadWindow: undefined;
  // openLatestVersion: TCallbackOpenLatestVersion;
  masterKeyWindow: undefined;
};

type TSend = {
  // closePreloadWindow: () => void;
  // openLatestVersion: (payload: TEventPayloadSend["openLatestVersion"]) => void;
  masterKeyWindow: () => void;
};
