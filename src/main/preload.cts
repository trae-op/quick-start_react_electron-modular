const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  receive: {
    subscribeUpdateApp: (callback) =>
      ipcOn("updateApp", (payload) => {
        callback(payload);
      }),
    subscribeWindowOpenUpdateApp: (callback) =>
      ipcOn("openUpdateApp", (payload) => {
        callback(payload);
      }),
    subscribeWindowTwoFactorQA: (callback) =>
      ipcOn("twoFactorQA", (payload) => {
        callback(payload);
      }),
    subscribeWindowAuthSocialNetwork: (callback) =>
      ipcOn("authSocialNetwork", (payload) => {
        callback(payload);
      }),
    subscribeSync: (callback) =>
      ipcOn("sync", (payload) => {
        callback(payload);
      }),
    subscribeCheckUser: (callback) =>
      ipcOn("checkUser", (payload) => {
        callback(payload);
      }),
    subscribeWindowSendTwoFactorCodeVerify: (callback) =>
      ipcOn("twoFactorCodeVerify", () => {
        callback();
      }),
    subscribeResources: (callback) =>
      ipcOn("resources", (payload) => {
        callback(payload);
      }),
    subscribeGetResource: (callback) =>
      ipcOn("getResource", (payload) => {
        callback(payload);
      }),
    subscribeMasterKey: (callback) =>
      ipcOn("masterKey", (payload) => {
        callback(payload);
      }),
  },
  send: {
    restart: () => {
      ipcSend("restart");
    },
    closePreloadWindow: () => {
      ipcSend("closePreloadWindow");
    },
    openLatestVersion: (payload) => {
      ipcSend("openLatestVersion", payload);
    },
    checkUser: () => {
      ipcSend("checkUser");
    },
    sync: () => {
      ipcSend("sync");
    },
    windowAuthSocialNetwork: (payload) => {
      ipcSend("authSocialNetwork", payload);
    },
    windowTwoFactorVerify: () => {
      ipcSend("twoFactorVerify");
    },
    sendTwoFactorCodeVerify: (payload) => {
      ipcSend("twoFactorCodeVerify", payload);
    },
    windowOpenUpdateResource: (payload) => {
      ipcSend("openUpdateResource", payload);
    },
    windowOpenDeleteResource: (payload) => {
      ipcSend("openDeleteResource", payload);
    },
    windowOpenAddResource: () => {
      ipcSend("openAddResource");
    },
    windowMasterKey: () => {
      ipcSend("masterKey");
    },
    checkMasterKey: () => {
      ipcSend("checkMasterKey");
    },
    deleteMasterKey: () => {
      ipcSend("deleteMasterKey");
    },
    getResource: (payload) => {
      ipcSend("getResource", payload);
    },
    resources: () => {
      ipcSend("resources");
    },
    logout: () => {
      ipcSend("logout");
    },
    cancelDeleteResource: () => {
      ipcSend("cancelDeleteResource");
    },
    copyKey: (payload) => {
      ipcSend("copyKey", payload);
    },
  },
  invoke: {
    getVersion: () => ipcInvoke("getVersion"),
    putResource: (payload) => ipcInvoke("putResource", payload),
    postResource: (payload) => ipcInvoke("postResource", payload),
    deleteResource: (payload) => ipcInvoke("deleteResource", payload),
    postMasterKey: (payload) => ipcInvoke("postMasterKey", payload),
    copyMasterKey: (payload) => ipcInvoke("copyMasterKey", payload),
  },
} satisfies Window["electron"]);

function ipcInvoke<
  Key extends keyof TEventPayloadInvoke,
  S extends keyof TEventSendInvoke
>(key: Key, payload?: TEventSendInvoke[S]): Promise<TEventPayloadInvoke[Key]> {
  return electron.ipcRenderer.invoke(key, payload);
}

function ipcSend<Key extends keyof TEventPayloadSend>(
  key: Key,
  payload?: TEventPayloadSend[Key]
) {
  electron.ipcRenderer.send(key, payload);
}

function ipcOn<Key extends keyof TEventPayloadReceive>(
  key: Key,
  callback: (payload: TEventPayloadReceive[Key]) => void
) {
  const cb = (
    _: Electron.IpcRendererEvent,
    payload: TEventPayloadReceive[Key]
  ) => callback(payload);

  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
