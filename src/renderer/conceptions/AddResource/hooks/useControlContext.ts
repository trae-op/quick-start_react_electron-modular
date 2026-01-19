import {
  useAddResourceNameSelector,
  useAddResourceRenderGenerateCharactersSelector,
  useSetAddResourceNameDispatch,
  useSetAddResourceRenderGenerateCharactersDispatch,
} from "../context";

export const useControlContext = () => {
  const name = useAddResourceNameSelector();

  return {
    name,
  };
};

export const useControlContextActions = () => {
  const setName = useSetAddResourceNameDispatch();

  return {
    setName,
  };
};

export const useControlContextComponents = () => {
  const renderGenerateCharacters =
    useAddResourceRenderGenerateCharactersSelector();
  const setRenderGenerateCharacters =
    useSetAddResourceRenderGenerateCharactersDispatch();

  return {
    renderGenerateCharacters,
    setRenderGenerateCharacters,
  };
};
