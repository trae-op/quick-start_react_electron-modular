import Stack from "@mui/material/Stack";
import Button, { ButtonProps } from "@mui/material/Button";
import { Circular } from "./CircularProgress";
import { DownloadedButton } from "./DownloadedButton";
import { useIpc } from "../hooks";
import { Provider as UpdaterProvider } from "../context";
import { Message } from "./Message";

const WindowContent = () => {
  useIpc();

  return (
    <Stack spacing={2} alignItems="center">
      <Message />
      <Circular />
      <DownloadedButton<ButtonProps> component={Button} variant="outlined">
        Update downloaded
      </DownloadedButton>
    </Stack>
  );
};

export const Window = () => {
  return (
    <UpdaterProvider>
      <WindowContent />
    </UpdaterProvider>
  );
};
