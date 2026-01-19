const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  receive: {
    itemsSubscribe: (callback) =>
      ipcOn("items", (payload) => {
        callback(payload);
      }),
  },
  send: {
    addWindow: () => ipcSend("addWindow"),
    deleteWindow: (payload) => ipcSend("deleteWindow", payload),
    closeDeleteWindow: () => ipcSend("closeDeleteWindow"),
    closePreloadWindow: () => ipcSend("closePreloadWindow"),
  },
  invoke: {
    getVersion: () => ipcInvoke("getVersion"),
    getItems: () => ipcInvoke("items:get"),
    addItem: (payload) => ipcInvoke("items:add", payload),
    deleteItem: (payload) => ipcInvoke("items:delete", payload),
    getDeleteTarget: () => ipcInvoke("deleteTarget:get"),
  },
} satisfies Window["electron"]);

function ipcInvoke<
  Key extends keyof TEventPayloadInvoke,
  S extends keyof TEventSendInvoke,
>(key: Key, payload?: TEventSendInvoke[S]): Promise<TEventPayloadInvoke[Key]> {
  return electron.ipcRenderer.invoke(key, payload);
}

function ipcSend<Key extends keyof TEventPayloadSend>(
  key: Key,
  payload?: TEventPayloadSend[Key],
) {
  electron.ipcRenderer.send(key, payload);
}

function ipcOn<Key extends keyof TEventPayloadReceive>(
  key: Key,
  callback: (payload: TEventPayloadReceive[Key]) => void,
) {
  const cb = (
    _: Electron.IpcRendererEvent,
    payload: TEventPayloadReceive[Key],
  ) => callback(payload);

  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
