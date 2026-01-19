import ElectronStorage from "electron-store";

export type TElectronStorage = {
  items: TItem[];
};

const electronStorage = new ElectronStorage<TElectronStorage>();

export function getElectronStorage<K extends keyof TElectronStorage>(key: K) {
  return electronStorage.get(key) as TElectronStorage[K] | undefined;
}

export function hasElectronStorage<K extends keyof TElectronStorage>(name: K) {
  return electronStorage.has(name);
}

export function setElectronStorage<K extends keyof TElectronStorage>(
  name: K,
  value: TElectronStorage[K],
) {
  electronStorage.set(name, value);
}

export function clearElectronStorage() {
  electronStorage.clear();
}

export function deleteFromElectronStorage<K extends keyof TElectronStorage>(
  name: K,
) {
  electronStorage.delete(name);
}
