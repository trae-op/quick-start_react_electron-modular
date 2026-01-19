import { useSyncExternalStore } from "react";
import type { ReactElement } from "react";

import { useUpdateResourceContext } from "./useContext";

export const useUpdateResourceResultSelector = (): TResource | undefined => {
  const { getResult, subscribe } = useUpdateResourceContext();

  return useSyncExternalStore(subscribe, getResult, getResult);
};

export const useUpdateResourceNameSelector = (): string => {
  const { getName, subscribe } = useUpdateResourceContext();

  return useSyncExternalStore(subscribe, getName, getName);
};

export const useUpdateResourceRenderGenerateCharactersSelector =
  (): ReactElement | null => {
    const { getRenderGenerateCharacters, subscribe } =
      useUpdateResourceContext();

    return useSyncExternalStore(
      subscribe,
      getRenderGenerateCharacters,
      getRenderGenerateCharacters
    );
  };

export const useSetUpdateResourceResultDispatch = () => {
  return useUpdateResourceContext().setResult;
};

export const useSetUpdateResourceNameDispatch = () => {
  return useUpdateResourceContext().setName;
};

export const useSetUpdateResourceRenderGenerateCharactersDispatch = () => {
  return useUpdateResourceContext().setRenderGenerateCharacters;
};
