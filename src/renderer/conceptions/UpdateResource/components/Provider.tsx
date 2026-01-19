import { useEffect } from "react";
import type { ReactElement, ReactNode } from "react";
import type { TPropsProvider } from "./types";
import {
  Provider as UpdateResourceProvider,
  useSetUpdateResourceRenderGenerateCharactersDispatch,
} from "../context";

const ProviderBridge = ({
  children,
  renderGenerateCharacters,
}: {
  children: ReactNode;
  renderGenerateCharacters: ReactElement;
}) => {
  const setRenderGenerateCharacters =
    useSetUpdateResourceRenderGenerateCharactersDispatch();

  useEffect(() => {
    setRenderGenerateCharacters(renderGenerateCharacters);
  }, [renderGenerateCharacters, setRenderGenerateCharacters]);

  return children;
};

export const Provider = ({
  children,
  renderGenerateCharacters,
}: TPropsProvider) => {
  return (
    <UpdateResourceProvider>
      <ProviderBridge renderGenerateCharacters={renderGenerateCharacters}>
        {children}
      </ProviderBridge>
    </UpdateResourceProvider>
  );
};
