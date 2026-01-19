import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useControlTwoFactorQA } from "../hooks/useControlTwoFactorQA";
import { useIpcQA } from "../hooks/useIpcQA";
import { useTwoFactorBase64Selector } from "../context";
import Button from "@mui/material/Button";

export const TwoFactorQRWindow = () => {
  useIpcQA();
  const base64 = useTwoFactorBase64Selector();
  const { handleNextStep } = useControlTwoFactorQA();

  return (
    <Stack spacing={1} alignItems="center">
      <Typography component="h1" sx={{ color: "text.secondary" }} variant="h6">
        Setting up two-factor authentication
      </Typography>
      <Typography
        component="p"
        sx={{ color: "text.secondary" }}
        variant="body1"
      >
        Scan this QR code to help your authenticator:
      </Typography>
      {Boolean(base64) && (
        <>
          <img src={base64} alt="QR Code" />
          <Button fullWidth variant="outlined" onClick={handleNextStep}>
            Next step
          </Button>
        </>
      )}
    </Stack>
  );
};
