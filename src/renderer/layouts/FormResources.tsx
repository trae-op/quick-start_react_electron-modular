import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const FormResourcesLayout = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Outlet />
    </Box>
  );
};
