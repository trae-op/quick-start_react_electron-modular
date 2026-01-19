import { memo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Provider as ProviderResources,
  Items,
  useResourcesListSelector,
} from "@conceptions/Resources";
import { useControlContext as useControlContextSync } from "@conceptions/Sync";
import { TPropsHomeChildren } from "./types";

const Container = memo(({ children }: { children: React.ReactElement }) => {
  const list = useResourcesListSelector();

  if (list !== undefined && list.length === 0) {
    return (
      <Stack
        spacing={2}
        direction="row"
        sx={{ flexWrap: "wrap", width: "100%", height: "100%" }}
        useFlexGap
      >
        <Typography
          sx={{ textAlign: "center", width: "100%", margin: "auto" }}
          gutterBottom
          variant="h5"
        >
          Empty
        </Typography>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        overflowX: "hidden",
        p: 0,

        "&::-webkit-scrollbar": {
          width: "1px",
        },
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        sx={{ flexWrap: "wrap", width: "100%" }}
        useFlexGap
      >
        {children}
      </Stack>
    </Box>
  );
});

const Resources = memo(({ isMasterKey }: TPropsHomeChildren) => {
  const { isAuthenticated, isResources, isUser } = useControlContextSync();

  return (
    <ProviderResources
      isDisabledActions={
        isResources && isUser && isAuthenticated ? false : true
      }
      isMasterKey={isMasterKey}
    >
      <Container>
        <Items />
      </Container>
    </ProviderResources>
  );
});

export default Resources;
