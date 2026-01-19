import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      fullWidth
      variant="outlined"
      loading={pending}
      disabled={pending}
    >
      {pending ? "Sending..." : "Delete"}
    </Button>
  );
};
