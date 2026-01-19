import { memo } from "react";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import { useUpdaterMessageSelector } from "../context";

export const Message = memo((props: TypographyProps) => {
  const message = useUpdaterMessageSelector();

  if (message === undefined) {
    return null;
  }

  return (
    <Typography
      component="h6"
      sx={{ color: "text.secondary" }}
      variant="h6"
      {...props}
    >
      {message}
    </Typography>
  );
});
