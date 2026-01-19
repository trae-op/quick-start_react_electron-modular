import { memo } from "react";
import TextField from "@mui/material/TextField";

import { useMasterKeyField } from "../../hooks/useMasterKeyField";
import type { TMasterKeyFieldProps } from "../types";

export const MasterKeyField = memo((props: TMasterKeyFieldProps) => {
  const { value, handleChange } = useMasterKeyField();
  const isError = Boolean(props.error?.length);

  return (
    <TextField
      label="Master key"
      variant="outlined"
      name="key"
      type="password"
      value={value}
      onChange={handleChange}
      error={isError}
      helperText={isError ? props.error?.join(", ") : ""}
      fullWidth
    />
  );
});
