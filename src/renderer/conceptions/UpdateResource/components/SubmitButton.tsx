import { memo } from "react";
import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import type { TSubmitButtonProps } from "./types";

export const SubmitButton = memo((props: TSubmitButtonProps) => {
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
      {pending ? "Sending..." : props.label || "Apply"}
    </Button>
  );
});
