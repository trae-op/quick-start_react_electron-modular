import { useSyncExternalStore } from "react";

import { useResourcesContext } from "./useContext";

export const useResourcesListSelector = (): TResource[] | undefined => {
  const { getList, subscribe } = useResourcesContext();

  return useSyncExternalStore(subscribe, getList, getList);
};

export const useResourcesIsMasterKeySelector = (): boolean => {
  const { getIsMasterKey, subscribe } = useResourcesContext();

  return useSyncExternalStore(subscribe, getIsMasterKey, getIsMasterKey);
};

export const useResourcesIsDisabledActionsSelector = (): boolean => {
  const { getIsDisabledActions, subscribe } = useResourcesContext();

  return useSyncExternalStore(
    subscribe,
    getIsDisabledActions,
    getIsDisabledActions
  );
};

export const useResourcesCopyKeyResourceIdSelector = (): string | undefined => {
  const { getCopyKeyResourceId, subscribe } = useResourcesContext();

  return useSyncExternalStore(
    subscribe,
    getCopyKeyResourceId,
    getCopyKeyResourceId
  );
};

export const useSetResourcesListDispatch = () => {
  return useResourcesContext().setList;
};

export const useSetResourcesIsMasterKeyDispatch = () => {
  return useResourcesContext().setIsMasterKey;
};

export const useSetResourcesIsDisabledActionsDispatch = () => {
  return useResourcesContext().setIsDisabledActions;
};

export const useSetResourcesCopyKeyResourceIdDispatch = () => {
  return useResourcesContext().setCopyKeyResourceId;
};
