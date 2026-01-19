type TEventPayloadInvoke = {
  getVersion: string;
  postMasterKey: undefined;
  copyMasterKey: { ok: boolean } | undefined;
};

type TEventSendInvoke = {
  getVersion: string;
  postMasterKey: {
    key: string;
  };
  copyMasterKey: TIdResource;
};

type TInvoke = {
  getVersion: () => Promise<TEventSendInvoke["getVersion"]>;
  postMasterKey: (
    payload: TEventSendInvoke["postMasterKey"],
  ) => Promise<TEventPayloadInvoke["postMasterKey"]>;
};
