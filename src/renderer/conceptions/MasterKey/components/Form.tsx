import { useActionState } from "react";
import Stack from "@mui/material/Stack";
import { SubmitButton } from "./SubmitButton";
import { useControl } from "../hooks/useControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MasterKeyField } from "./fields/MasterKeyField";

type TFormState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

const initialState: TFormState = {
  errors: {},
  message: "",
  success: false,
};

export const Form = () => {
  const { handleDeleteMasterKey } = useControl();
  const [_, formAction] = useActionState(
    async (_: TFormState, formData: FormData): Promise<TFormState> => {
      const key = (formData.get("key") || "") as string;

      try {
        await window.electron.invoke.postMasterKey({
          key,
        });

        return {
          ...initialState,
          success: true,
        };
      } catch (error) {
        return {
          ...initialState,
          message: "Failed to update master key",
          success: false,
        };
      }
    },
    initialState,
  );

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={2}>
        <Typography variant="h6" gutterBottom>
          Add or update master key
        </Typography>
        <MasterKeyField />
        <SubmitButton />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleDeleteMasterKey}
        >
          Delete master key
        </Button>
      </Stack>
    </form>
  );
};
