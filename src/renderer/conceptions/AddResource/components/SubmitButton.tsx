import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import type { TSubmitButtonProps } from "./types";

export const SubmitButton = ({ label }: TSubmitButtonProps) => {
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
      {pending ? "Sending..." : label || "Apply"}
    </Button>
  );
};
