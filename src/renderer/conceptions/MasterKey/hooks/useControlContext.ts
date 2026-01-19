import {
  useMasterKeyIsMasterKeySelector,
  useMasterKeyValueSelector,
  useSetMasterKeyIsMasterKeyDispatch,
  useSetMasterKeyValueDispatch,
} from "../context";

export const useControlContext = () => {
  const isMasterKey = useMasterKeyIsMasterKeySelector();
  const key = useMasterKeyValueSelector();

  return {
    isMasterKey,
    key,
  };
};

export const useControlContextActions = () => {
  const setMasterKey = useSetMasterKeyIsMasterKeyDispatch();
  const setKey = useSetMasterKeyValueDispatch();

  return {
    setMasterKey,
    setKey,
  };
};
