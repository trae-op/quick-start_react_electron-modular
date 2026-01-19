import { useEffect } from "react";
import type { ReactNode } from "react";
import {
  Provider as ResourcesProvider,
  useSetResourcesIsDisabledActionsDispatch,
  useSetResourcesIsMasterKeyDispatch,
} from "../context";
import type { TPropsProvider } from "./types";

const ProviderBridge = ({
  children,
  isMasterKey,
  isDisabledActions,
}: Required<Pick<TPropsProvider, "isMasterKey" | "isDisabledActions">> & {
  children: ReactNode;
}) => {
  const setIsMasterKey = useSetResourcesIsMasterKeyDispatch();
  const setIsDisabledActions = useSetResourcesIsDisabledActionsDispatch();

  useEffect(() => {
    setIsMasterKey(isMasterKey);
  }, [isMasterKey, setIsMasterKey]);

  useEffect(() => {
    setIsDisabledActions(isDisabledActions);
  }, [isDisabledActions, setIsDisabledActions]);

  return children;
};

export const Provider = ({
  children,
  isMasterKey = false,
  isDisabledActions = false,
}: TPropsProvider) => {
  return (
    <ResourcesProvider>
      <ProviderBridge
        isMasterKey={isMasterKey}
        isDisabledActions={isDisabledActions}
      >
        {children}
      </ProviderBridge>
    </ResourcesProvider>
  );
};
