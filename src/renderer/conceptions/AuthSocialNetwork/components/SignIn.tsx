import Stack from "@mui/material/Stack";
import { ProviderButton } from "./ProviderButton";

export const SignIn = () => {
  return (
    <Stack spacing={2} alignItems="center">
      <ProviderButton data-provider="google" text="Enter by Google" />
    </Stack>
  );
};
