type TEventPayloadInvoke = {
  "items:get": TItem[];
  "items:add": TItem | undefined;
  "items:delete": { id: string } | undefined;
};

type TEventSendInvoke = {
  "items:get": undefined;
  "items:add": {
    title: string;
  };
  "items:delete": {
    id: string;
  };
};

type TInvoke = {
  getItems: () => Promise<TEventPayloadInvoke["items:get"]>;
  addItem: (
    payload: TEventSendInvoke["items:add"],
  ) => Promise<TEventPayloadInvoke["items:add"]>;
  deleteItem: (
    payload: TEventSendInvoke["items:delete"],
  ) => Promise<TEventPayloadInvoke["items:delete"]>;
};
