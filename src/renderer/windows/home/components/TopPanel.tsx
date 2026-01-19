import { lazy, memo, Suspense, useEffect, useMemo } from "react";
import Stack from "@mui/material/Stack";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { grey } from "@mui/material/colors";
import {
  UserPopover,
  useSetUserIsNewVersionAppDispatch,
  useSetUserRenderButtonLogoutDispatch,
  useSetUserRenderButtonUpdateAppDispatch,
} from "@conceptions/User";
import { LogoutButton } from "@conceptions/AuthSocialNetwork";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useIpc as useIpcUpdate,
  DownloadedButton,
  useUpdaterStatusSelector,
} from "@conceptions/Updater";
import { TopPanel } from "@layouts/TopPanel";
import { Container as ContainerAppVersion } from "@composites/AppVersion";
import { PreloadStatusTopPanel } from "./PreloadStatusTopPanel";
import { useIpc as useIpcSync } from "@conceptions/Sync";
import { TPropsHomeChildren } from "./types";

const LazyAddResource = lazy(() => import("./AddResource"));
const LazyActionsKey = lazy(() => import("./ActionsKey"));

const ContainerTopPanel = memo(({ isMasterKey }: TPropsHomeChildren) => {
  useIpcSync();
  useIpcUpdate();
  const status = useUpdaterStatusSelector();
  const setIsNewVersionApp = useSetUserIsNewVersionAppDispatch();
  const setRenderButtonLogout = useSetUserRenderButtonLogoutDispatch();
  const setRenderButtonUpdateApp = useSetUserRenderButtonUpdateAppDispatch();

  const renderButtonLogout = useMemo(
    () => (
      <LogoutButton<ListItemButtonProps> component={ListItemButton}>
        Logout
      </LogoutButton>
    ),
    [],
  );

  const renderButtonUpdateApp = useMemo(
    () => (
      <DownloadedButton<ListItemButtonProps> component={ListItemButton}>
        Update
      </DownloadedButton>
    ),
    [],
  );

  useEffect(() => {
    setIsNewVersionApp(status === "update-downloaded");
  }, [setIsNewVersionApp, status]);

  useEffect(() => {
    setRenderButtonLogout(renderButtonLogout);
  }, [renderButtonLogout, setRenderButtonLogout]);

  useEffect(() => {
    setRenderButtonUpdateApp(renderButtonUpdateApp);
  }, [renderButtonUpdateApp, setRenderButtonUpdateApp]);

  return (
    <TopPanel
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        paddingTop: 0.5,
        paddingBottom: 0.5,
        paddingRight: 1,
        paddingLeft: 1,
        backgroundColor: grey[900],
      }}
    >
      <ContainerAppVersion sx={{ width: "100%" }} variant="caption" />
      <Stack
        spacing={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <PreloadStatusTopPanel />

        <Suspense fallback={<CircularProgress size={20} />}>
          <LazyActionsKey isMasterKey={isMasterKey} />
        </Suspense>

        <Suspense fallback={<CircularProgress size={20} />}>
          <LazyAddResource isMasterKey={isMasterKey} />
        </Suspense>

        <UserPopover />
      </Stack>
    </TopPanel>
  );
});

export default ContainerTopPanel;
