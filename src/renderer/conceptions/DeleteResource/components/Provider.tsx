import { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { ReactNode } from "react";

import {
  Provider as DeleteResourceProvider,
  useSetDeleteResourceIdDispatch,
} from "../context";

type TProviderBridgeProps = {
  children: ReactNode;
  resourceId?: string;
};

const ProviderBridge = ({ children, resourceId }: TProviderBridgeProps) => {
  const setResourceId = useSetDeleteResourceIdDispatch();

  useEffect(() => {
    setResourceId(resourceId);
  }, [resourceId, setResourceId]);

  return children;
};

export const Provider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <DeleteResourceProvider>
      <ProviderBridge resourceId={id}>{children}</ProviderBridge>
    </DeleteResourceProvider>
  );
};
