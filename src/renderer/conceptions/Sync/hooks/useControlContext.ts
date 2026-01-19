import {
  useSyncIsAuthenticatedSelector,
  useSyncIsResourcesSelector,
  useSyncIsUserSelector,
} from "../context/useSelectors";
import { useSyncContext } from "../context/useContext";

export const useControlContext = () => {
  const isAuthenticated = useSyncIsAuthenticatedSelector();
  const isResources = useSyncIsResourcesSelector();
  const isUser = useSyncIsUserSelector();

  return {
    isAuthenticated,
    isResources,
    isUser,
  };
};

export const useControlContextActions = () => {
  const { setAuthenticated, setResources, setUser } = useSyncContext();

  return {
    setAuthenticated,
    setResources,
    setUser,
  };
};
