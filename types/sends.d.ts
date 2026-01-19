type TEventPayloadSend = {
  addWindow: undefined;
  closePreloadWindow: undefined;
  deleteWindow: TItem;
  closeDeleteWindow: undefined;
};

type TSend = {
  addWindow: () => void;
  closePreloadWindow: () => void;
  deleteWindow: (payload: TEventPayloadSend["deleteWindow"]) => void;
  closeDeleteWindow: () => void;
};
