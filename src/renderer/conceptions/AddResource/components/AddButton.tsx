import { memo } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { useControl } from "../hooks/useControl";
import type { TPropsButtonProvider } from "./types";

export const AddButton = memo(({ ...other }: TPropsButtonProvider) => {
  const { handleAdd } = useControl();

  return (
    <IconButton onClick={handleAdd} {...other}>
      <AddCircleIcon fontSize="medium" />
    </IconButton>
  );
});
