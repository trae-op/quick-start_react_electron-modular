import { useSyncExternalStore } from "react";

import { useDeleteResourceContext } from "./useContext";

export const useDeleteResourceIdSelector = (): string | undefined => {
  const { getResourceId, subscribe } = useDeleteResourceContext();

  return useSyncExternalStore(subscribe, getResourceId, getResourceId);
};

export const useSetDeleteResourceIdDispatch = () => {
  return useDeleteResourceContext().setResourceId;
};
