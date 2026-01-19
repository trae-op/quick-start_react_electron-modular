import Stack from "@mui/material/Stack";
import { useIpc } from "../hooks/useIpc";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { SubmitButton } from "./SubmitButton";
import { useUpdateResourceForm } from "../hooks/useUpdateResourceForm";
import { NameField } from "./fields/NameField";
import { GenerateKeyField } from "./fields/GenerateKeyField";
import { useUpdateResourceResultSelector } from "../context";

export const Form = () => {
  useIpc();
  const result = useUpdateResourceResultSelector();
  const { state, formAction } = useUpdateResourceForm();

  if (result === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={1}>
        <NameField error={state.errors?.name} />

        <GenerateKeyField />

        <SubmitButton />
      </Stack>
    </form>
  );
};
