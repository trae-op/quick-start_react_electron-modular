import { memo } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { TPropsLoadingSpinner } from "./types";

export const LoadingSpinner = memo(
  ({ containerProps, circularProgressProps }: TPropsLoadingSpinner) => {
    return (
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
          backgroundColor: "rgba(24, 24, 24)",
        }}
        alignItems="center"
        justifyContent="center"
        {...containerProps}
      >
        <CircularProgress size={70} {...circularProgressProps} />
      </Stack>
    );
  },
);
