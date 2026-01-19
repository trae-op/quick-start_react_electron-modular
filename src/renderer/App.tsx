import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { Provider as ProviderMasterKey } from "@conceptions/MasterKey";
import { MainLayout } from "@layouts/Main";
import { LoadingSpinner } from "@components/LoadingSpinner";
const LazyHomeWindow = lazy(() => import("./windows/Home"));
const LazyMasterKeyFormWindow = lazy(
  () => import("./windows/masterKey/MasterKeyForm"),
);

export const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/window:main" element={<LazyHomeWindow />} />

            <Route
              path="/window:master-key"
              element={
                <ProviderMasterKey>
                  <LazyMasterKeyFormWindow />
                </ProviderMasterKey>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
