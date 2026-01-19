type TFunctionUnsubscribe = () => void;

type TEventPayloadReceive = {
  items: TItem[];
};

type TReceive = {
  itemsSubscribe: (
    callback: (payload: TEventPayloadReceive["items"]) => void,
  ) => TFunctionUnsubscribe;
};
