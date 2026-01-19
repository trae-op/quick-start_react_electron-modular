import { memo } from "react";
import Button from "@mui/material/Button";
import { useControl } from "../hooks";
import type { TPropsButtonProvider } from "./types";

export const ProviderButton = memo(
  ({ text, ...other }: TPropsButtonProvider) => {
    const { handleProvider } = useControl();

    return (
      <Button fullWidth variant="outlined" onClick={handleProvider} {...other}>
        {text}
      </Button>
    );
  }
);
