import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@components/Button";
import { Textarea } from "@components/Textarea";
import { TextField } from "@components/TextField";

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
    <Button type="submit" size="large" loading={pending} disabled={pending}>
      {pending ? "Sending..." : "Apply"}
    </Button>
  );
};

const MasterKey = () => {
  const [formState, formAction] = useActionState(
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
    <form
      className="master-key"
      action={formAction}
      noValidate
      autoComplete="off"
    >
      <div className="master-key__header">
        <div className="master-key__title">Add or update master key</div>
        <p className="master-key__caption">
          The master key decrypts your session store and is never transmitted.
        </p>
      </div>
      <TextField
        label="Master key"
        name="key"
        type="password"
        required
        helperText="Keep it secret and unique"
      />
      {formState.message && (
        <Textarea
          label="Status"
          value={formState.message}
          readOnly
          error={!formState.success}
          helperText={
            formState.success
              ? "Master key updated successfully"
              : "There was a problem. Try again."
          }
        />
      )}
      <div className="master-key__actions">
        <SubmitButton />
      </div>
    </form>
  );
};

export default MasterKey;
