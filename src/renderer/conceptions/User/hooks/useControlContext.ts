import {
  useSetUserDispatch,
  useUserIsNewVersionAppSelector,
  useUserRenderButtonLogoutSelector,
  useUserRenderButtonUpdateAppSelector,
  useUserSelector,
} from "../context";

export const useControlContext = () => {
  const user = useUserSelector();

  return {
    user,
  };
};

export const useControlContextActions = () => {
  const setUser = useSetUserDispatch();

  return {
    setUser,
  };
};

export const useControlContextUserPopover = () => {
  const renderButtonUpdateApp = useUserRenderButtonUpdateAppSelector();
  const renderButtonLogout = useUserRenderButtonLogoutSelector();
  const isNewVersionApp = useUserIsNewVersionAppSelector();

  return {
    renderButtonUpdateApp,
    renderButtonLogout,
    isNewVersionApp,
  };
};
