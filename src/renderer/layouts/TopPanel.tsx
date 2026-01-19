import { ReactNode } from "react";
import Stack, { StackProps } from "@mui/material/Stack";

type TProps = StackProps & {
  children: ReactNode;
};

export const TopPanel = ({ children, ...other }: TProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} {...other}>
      {children}
    </Stack>
  );
};
