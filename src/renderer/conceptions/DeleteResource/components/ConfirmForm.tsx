import { useActionState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useControl } from "../hooks/useControl";
import Typography from "@mui/material/Typography";
import { SubmitButton } from "./SubmitButton";

export const Confirm = () => {
  const { handleCancel, submitFormAction } = useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={2}>
        <Typography
          sx={{
            textAlign: "center",
          }}
          gutterBottom
          variant="h5"
        >
          Are you sure?
        </Typography>
        <Stack
          sx={{
            width: "100%",
          }}
          direction="row"
          spacing={2}
        >
          <Button fullWidth variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <SubmitButton />
        </Stack>
      </Stack>
    </form>
  );
};
