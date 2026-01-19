import { memo } from "react";
import { AddButton, Provider } from "@conceptions/AddResource";
import { useControlContext as useControlContextSync } from "@conceptions/Sync";
import { Form as FormGenerateCharacters } from "@conceptions/GenerateCharacters";
import { TPropsHomeChildren } from "./types";

const AddResource = memo(({ isMasterKey }: TPropsHomeChildren) => {
  const { isAuthenticated, isResources, isUser } = useControlContextSync();

  if (!isMasterKey) {
    return null;
  }

  return (
    <Provider renderGenerateCharacters={<FormGenerateCharacters />}>
      <AddButton
        size="small"
        disabled={isAuthenticated && isResources && isUser ? false : true}
      />
    </Provider>
  );
});

export default AddResource;
