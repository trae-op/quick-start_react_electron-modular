import { memo } from "react";
import Stack from "@mui/material/Stack";
import { SubmitButton } from "./SubmitButton";
import { useAddResourceForm } from "../hooks/useAddResourceForm";
import { NameField } from "./fields/NameField";
import { GenerateKeyField } from "./fields/GenerateKeyField";

export const Form = memo(() => {
  const { state, formAction } = useAddResourceForm();

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={1}>
        <NameField error={state.errors?.name} />

        <GenerateKeyField />

        <SubmitButton />
      </Stack>
    </form>
  );
});
