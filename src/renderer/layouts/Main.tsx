import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { Container as ContainerAllowedRouters } from "@composites/AllowedRoutes";
import { useClosePreloadWindow } from "@hooks/closePreloadWindow";
import { AuthLoadingSpinner } from "@composites/AuthLoadingSpinner";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowY: "auto",
          overflowX: "hidden",
          "& #root": {
            width: "100%",
          },
        },
      },
    },
  },
  colorSchemes: {
    dark: true,
  },
});

export const MainLayout = () => {
  useClosePreloadWindow("sign-in");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <ContainerAllowedRouters routes={["window:main", "sign-in"]}>
            <AuthLoadingSpinner />
          </ContainerAllowedRouters>

          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
