import { memo, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import type { TContainerProps } from "./types";

export const AppVersion = memo(({ ...other }: TContainerProps) => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    window.electron.invoke.getVersion().then((value) => {
      setVersion(value);
    });
  }, []);

  if (version === "") {
    return null;
  }

  return (
    <>
      <Typography {...other}>v{version}</Typography>
    </>
  );
});
