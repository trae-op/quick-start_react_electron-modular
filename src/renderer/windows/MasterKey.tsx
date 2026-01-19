import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      loading={pending}
      disabled={pending}
    >
      {pending ? "Sending..." : "Apply"}
    </Button>
  );
};

const MasterKey = () => {
  const [, formAction] = useActionState(
    async (_: TFormState, formData: FormData): Promise<TFormState> => {
      const key = formData.get("key");

      try {
        await window.electron.invoke.postMasterKey({
          key: typeof key === "string" ? key : "",
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
      <div>
        <div>Add or update master key</div>
        <TextField
          label="Master key"
          variant="outlined"
          name="key"
          type="password"
          fullWidth
        />
        <SubmitButton />
      </div>
    </form>
  );
};

export default MasterKey;
