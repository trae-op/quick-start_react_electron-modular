type TEventPayloadInvoke = {
  getVersion: string;
  putResource: undefined;
  postResource: undefined;
  deleteResource: undefined;
  postMasterKey: undefined;
  copyMasterKey: { ok: boolean } | undefined;
};

type TSendResource<V = FormDataEntryValue | null> = {
  id?: string;
  name: V;
  key: V;
};

type TIdResource = {
  id: string;
};

type TDeleteResource = TIdResource;
type TPostMasterKey = {
  key: string;
};

type OptionalProps<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>;

type TEventSendInvoke = {
  getVersion: string;
  putResource: OptionalProps<TSendResource, "key">;
  postResource: TSendResource;
  deleteResource: TDeleteResource;
  postMasterKey: TPostMasterKey;
  copyMasterKey: TIdResource;
};

type TInvoke = {
  getVersion: () => Promise<TEventSendInvoke["getVersion"]>;
  putResource: (
    payload: TEventSendInvoke["putResource"]
  ) => Promise<TEventPayloadInvoke["putResource"]>;
  postResource: (
    payload: TEventSendInvoke["postResource"]
  ) => Promise<TEventPayloadInvoke["postResource"]>;
  deleteResource: (
    payload: TEventSendInvoke["deleteResource"]
  ) => Promise<TEventPayloadInvoke["deleteResource"]>;
  postMasterKey: (
    payload: TEventSendInvoke["postMasterKey"]
  ) => Promise<TEventPayloadInvoke["postMasterKey"]>;
  copyMasterKey: (
    payload: TEventSendInvoke["copyMasterKey"]
  ) => Promise<TEventPayloadInvoke["copyMasterKey"]>;
};
