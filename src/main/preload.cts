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
    closePreloadWindow: () => ipcSend("closePreloadWindow"),
  },
  invoke: {
    getVersion: () => ipcInvoke("getVersion"),
    post: (payload) => ipcInvoke("post", payload),
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
