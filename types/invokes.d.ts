type TEventPayloadInvoke = {
  getVersion: string;
  post: { ok: boolean } | undefined;
};

type TEventSendInvoke = {
  getVersion: string;
  post: {
    title: string;
  };
};

type TInvoke = {
  getVersion: () => Promise<TEventSendInvoke["getVersion"]>;
  post: (
    payload: TEventSendInvoke["post"],
  ) => Promise<TEventPayloadInvoke["post"]>;
};
