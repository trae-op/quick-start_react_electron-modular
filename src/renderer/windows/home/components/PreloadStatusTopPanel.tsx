import CircularProgress from "@mui/material/CircularProgress";
import { useControlContext } from "@conceptions/Sync";

export const PreloadStatusTopPanel = () => {
  const { isAuthenticated, isResources, isUser } = useControlContext();

  if (isResources && isUser && isAuthenticated) {
    return null;
  }

  return <CircularProgress size={20} />;
};
