import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@components/Button";
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

const Add = () => {
  const [, formAction] = useActionState(
    async (_: TFormState, formData: FormData): Promise<TFormState> => {
      const title = formData.get("title");

      try {
        await window.electron.invoke.addItem({
          title: typeof title === "string" ? title : "",
        });

        return {
          ...initialState,
          success: true,
        };
      } catch (error) {
        return {
          ...initialState,
          message: "Failed to add item",
          success: false,
        };
      }
    },
    initialState,
  );

  return (
    <form action={formAction} noValidate autoComplete="off">
      <h2>Add a new item</h2>
      <TextField
        label="Title"
        name="title"
        type="text"
        required
        helperText="Enter the title"
      />
      <SubmitButton />
    </form>
  );
};

export default Add;
