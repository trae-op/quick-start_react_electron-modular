import { memo } from "react";
import TextField from "@mui/material/TextField";

import { useUpdateResourceNameField } from "../../hooks/useUpdateResourceNameField";
import type { TNameFieldProps } from "../types";

export const NameField = memo((props: TNameFieldProps) => {
  const { value, handleChange } = useUpdateResourceNameField();
  const isError = Boolean(props.error?.length);

  return (
    <TextField
      label="Resource name"
      variant="outlined"
      name="name"
      value={value}
      onChange={handleChange}
      error={isError}
      helperText={isError ? props.error?.join(", ") : ""}
      fullWidth
    />
  );
});
