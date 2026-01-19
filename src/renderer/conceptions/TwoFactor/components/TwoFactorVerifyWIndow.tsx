import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useControlTwoFactorVerify } from "../hooks/useControlTwoFactorVerify";
import { useTwoFactorPendingSelector } from "../context";
import { useIpcVerify } from "../hooks/useIpcVerify";
import { messages } from "@config/config";

export const TwoFactorVerifyWindow = () => {
  useIpcVerify();
  const pending = useTwoFactorPendingSelector();
  const {
    handleChange,
    handleSubmit,
    twoFactorCode,
    isInvalid,
    handleFocus,
    isValid,
  } = useControlTwoFactorVerify();

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Stack spacing={1} alignItems="center">
        <TextField
          fullWidth
          required
          value={twoFactorCode}
          onChange={handleChange}
          onFocus={handleFocus}
          error={isInvalid}
          helperText={messages.auth.errorIncorrectTwoFactorCode}
        />
        <Button
          disabled={!isValid || pending}
          fullWidth
          type="submit"
          variant="contained"
        >
          Apply
        </Button>
      </Stack>
    </form>
  );
};
