import { lazy, Suspense } from "react";
import Box from "@mui/material/Box";
import {
  useIpc as useIpcMasterKey,
  Provider as ProviderMasterKey,
  useControlContext as useControlContextMasterKey,
} from "@conceptions/MasterKey";
import { Provider as ProviderSync } from "@conceptions/Sync";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { useClosePreloadWindow } from "@hooks/closePreloadWindow";

const LazyTopPanel = lazy(() => import("./TopPanel"));
const LazyResources = lazy(() => import("./Resources"));

const Home = () => {
  useClosePreloadWindow("window:main");
  useIpcMasterKey();
  const { isMasterKey } = useControlContextMasterKey();

  return (
    <ProviderSync>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyTopPanel isMasterKey={isMasterKey} />
      </Suspense>

      <ProviderMasterKey>
        <Box sx={{ mt: 6, width: "100%" }}>
          <Suspense fallback={<LoadingSpinner />}>
            <LazyResources isMasterKey={isMasterKey} />
          </Suspense>
        </Box>
      </ProviderMasterKey>
    </ProviderSync>
  );
};

export default Home;
