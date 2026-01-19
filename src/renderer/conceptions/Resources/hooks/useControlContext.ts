import {
  useResourcesCopyKeyResourceIdSelector,
  useResourcesIsDisabledActionsSelector,
  useResourcesIsMasterKeySelector,
  useResourcesListSelector,
  useSetResourcesCopyKeyResourceIdDispatch,
  useSetResourcesListDispatch,
} from "../context";

export const useControlContext = () => {
  const list = useResourcesListSelector();
  const isMasterKey = useResourcesIsMasterKeySelector();
  const copyKeyResourceId = useResourcesCopyKeyResourceIdSelector();
  const isDisabledActions = useResourcesIsDisabledActionsSelector();

  return {
    list,
    isMasterKey,
    copyKeyResourceId,
    isDisabledActions,
  };
};

export const useControlContextActions = () => {
  const setItems = useSetResourcesListDispatch();
  const setCopyKeyResourceId = useSetResourcesCopyKeyResourceIdDispatch();

  return {
    setItems,
    setCopyKeyResourceId,
  };
};
