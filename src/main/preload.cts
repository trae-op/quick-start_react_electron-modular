const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  receive: {
    itemsSubscribe: (callback) => {
      const cb = (_: Electron.IpcRendererEvent, payload: any) =>
        callback(payload);

      electron.ipcRenderer.on("items", cb);

      return () => electron.ipcRenderer.off("items", cb);
    },
  },
  send: {
    addWindow: () => electron.ipcRenderer.send("addWindow"),
    deleteWindow: (payload) =>
      electron.ipcRenderer.send("deleteWindow", payload),
    closeDeleteWindow: () => electron.ipcRenderer.send("closeDeleteWindow"),
    closePreloadWindow: () => electron.ipcRenderer.send("closePreloadWindow"),
  },
  invoke: {
    getItems: () => electron.ipcRenderer.invoke("items:get"),
    addItem: (payload) => electron.ipcRenderer.invoke("items:add", payload),
    deleteItem: (payload) =>
      electron.ipcRenderer.invoke("items:delete", payload),
  },
} satisfies Window["electron"]);
