import { memo } from "react";
import TextField from "@mui/material/TextField";

import { usePasswordField } from "../../hooks/usePasswordField";
import type { TPasswordFieldProps } from "../types";

export const PasswordField = memo((props: TPasswordFieldProps) => {
  const { value, handleChange } = usePasswordField();
  const isError = Boolean(props.error?.length);

  return (
    <TextField
      label="Made-up password"
      type="text"
      variant="outlined"
      name="password"
      value={value}
      onChange={handleChange}
      error={isError}
      helperText={isError ? props.error?.join(", ") : ""}
      fullWidth
    />
  );
});
