import { useEffect } from "react";
import type { ReactElement, ReactNode } from "react";
import type { TPropsProvider } from "./types";
import {
  Provider as AddResourceProvider,
  useSetAddResourceRenderGenerateCharactersDispatch,
} from "../context";

const ProviderBridge = ({
  children,
  renderGenerateCharacters,
}: {
  children: ReactNode;
  renderGenerateCharacters: ReactElement;
}) => {
  const setRenderGenerateCharacters =
    useSetAddResourceRenderGenerateCharactersDispatch();

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
    <AddResourceProvider>
      <ProviderBridge renderGenerateCharacters={renderGenerateCharacters}>
        {children}
      </ProviderBridge>
    </AddResourceProvider>
  );
};
