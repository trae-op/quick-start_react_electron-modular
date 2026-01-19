import { useSyncExternalStore } from "react";
import type { ReactElement } from "react";

import { useAddResourceContext } from "./useContext";

export const useAddResourceNameSelector = (): string => {
  const { getName, subscribe } = useAddResourceContext();

  return useSyncExternalStore(subscribe, getName, getName);
};

export const useAddResourceRenderGenerateCharactersSelector =
  (): ReactElement | null => {
    const { getRenderGenerateCharacters, subscribe } = useAddResourceContext();

    return useSyncExternalStore(
      subscribe,
      getRenderGenerateCharacters,
      getRenderGenerateCharacters
    );
  };

export const useSetAddResourceNameDispatch = () => {
  return useAddResourceContext().setName;
};

export const useSetAddResourceRenderGenerateCharactersDispatch = () => {
  return useAddResourceContext().setRenderGenerateCharacters;
};
