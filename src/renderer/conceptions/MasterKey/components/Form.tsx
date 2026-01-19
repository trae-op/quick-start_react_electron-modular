import Stack from "@mui/material/Stack";
import { useIpc } from "../hooks/useIpc";
import { SubmitButton } from "./SubmitButton";
import { useControl } from "../hooks/useControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMasterKeyForm } from "../hooks/useMasterKeyForm";
import { MasterKeyField } from "./fields/MasterKeyField";
import { useMasterKeyIsMasterKeySelector } from "../context";

export const Form = () => {
  useIpc();
  const { handleDeleteMasterKey } = useControl();
  const { formAction } = useMasterKeyForm();
  const isMasterKey = useMasterKeyIsMasterKeySelector();

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={2}>
        <Typography variant="h6" gutterBottom>
          Add or update master key
        </Typography>
        <MasterKeyField />
        <SubmitButton />
        {isMasterKey && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleDeleteMasterKey}
          >
            Delete master key
          </Button>
        )}
      </Stack>
    </form>
  );
};
