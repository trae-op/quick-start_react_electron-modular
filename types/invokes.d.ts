type TEventPayloadInvoke = {
  getVersion: string;
  "items:get": TItem[];
  "items:add": TItem | undefined;
  "items:delete": { id: string } | undefined;
  "deleteTarget:get": TItem | null | undefined;
};

type TEventSendInvoke = {
  getVersion: string;
  "items:get": undefined;
  "items:add": {
    title: string;
  };
  "items:delete": {
    id: string;
  };
  "deleteTarget:get": undefined;
};

type TInvoke = {
  getVersion: () => Promise<TEventPayloadInvoke["getVersion"]>;
  getItems: () => Promise<TEventPayloadInvoke["items:get"]>;
  addItem: (
    payload: TEventSendInvoke["items:add"],
  ) => Promise<TEventPayloadInvoke["items:add"]>;
  deleteItem: (
    payload: TEventSendInvoke["items:delete"],
  ) => Promise<TEventPayloadInvoke["items:delete"]>;
  getDeleteTarget: () => Promise<TEventPayloadInvoke["deleteTarget:get"]>;
};
