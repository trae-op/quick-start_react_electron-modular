import { memo } from "react";
import { useFormStatus } from "react-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export const SubmitButton = memo(({ ...other }: IconButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <IconButton loading={pending} type="submit" {...other}>
      <ContentCopyIcon fontSize="small" />
    </IconButton>
  );
});
