import { memo, useActionState } from "react";
import { useControl } from "../hooks/useControl";
import { SubmitButton } from "./SubmitCopyKeyButton";
import { useResourcesCopyKeyResourceIdSelector } from "../context";
import { TPropsForm } from "./types";

export const CopyKeyFormButton = memo(({ id }: TPropsForm) => {
  const { submitCopyKeyFormAction } = useControl(id);
  const [_, formAction] = useActionState(submitCopyKeyFormAction, undefined);
  const copyKeyResourceId = useResourcesCopyKeyResourceIdSelector();

  return (
    <form action={formAction} noValidate autoComplete="off">
      <SubmitButton color={copyKeyResourceId === id ? "success" : "default"} />
    </form>
  );
});
