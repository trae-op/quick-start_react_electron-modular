import { memo } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useUpdateResourceGenerateKeyField } from "../../hooks/useUpdateResourceGenerateKeyField";
import { useUpdateResourceRenderGenerateCharactersSelector } from "../../context";
import type { TGenerateKeyFieldProps } from "../types";
import { PasswordField } from "./PasswordField";

export const GenerateKeyField = memo((props: TGenerateKeyFieldProps) => {
  const { isChecked, handleChange } = useUpdateResourceGenerateKeyField();
  const renderGenerateCharacters =
    useUpdateResourceRenderGenerateCharactersSelector();

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            name="generate-key"
          />
        }
        label={props.label || "Generate key"}
      />

      {isChecked ? renderGenerateCharacters : <PasswordField />}
    </>
  );
});
