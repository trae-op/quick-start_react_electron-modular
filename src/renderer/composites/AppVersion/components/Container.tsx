import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useInvoke } from "../hooks";
import { memo } from "react";
import type { TPropsContainer } from "./types";
import logo from "../../../../assets/72x72.png";

export const Container = memo(({ ...other }: TPropsContainer) => {
  const { version } = useInvoke();

  if (version === "") {
    return null;
  }

  return (
    <>
      <Avatar
        sx={{ width: 28, height: 28 }}
        alt="logo of electron-gp"
        src={logo}
      />
      <Typography {...other}>v{version}</Typography>
    </>
  );
});
