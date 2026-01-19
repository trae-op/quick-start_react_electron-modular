import {
  useSetUpdateResourceNameDispatch,
  useSetUpdateResourceRenderGenerateCharactersDispatch,
  useSetUpdateResourceResultDispatch,
  useUpdateResourceNameSelector,
  useUpdateResourceRenderGenerateCharactersSelector,
  useUpdateResourceResultSelector,
} from "../context";

export const useControlContext = () => {
  const result = useUpdateResourceResultSelector();
  const name = useUpdateResourceNameSelector();

  return {
    result,
    name,
  };
};

export const useControlContextActions = () => {
  const setResult = useSetUpdateResourceResultDispatch();
  const setName = useSetUpdateResourceNameDispatch();

  return {
    setResult,
    setName,
  };
};

export const useControlContextComponents = () => {
  const renderGenerateCharacters =
    useUpdateResourceRenderGenerateCharactersSelector();
  const setRenderGenerateCharacters =
    useSetUpdateResourceRenderGenerateCharactersDispatch();

  return {
    renderGenerateCharacters,
    setRenderGenerateCharacters,
  };
};
