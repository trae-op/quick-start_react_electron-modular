import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { MainLayout } from "@layouts/Main";
import { LoadingSpinner } from "@components/LoadingSpinner";

const LazyHomeWindow = lazy(() => import("./windows/Home"));
const LazyMasterKeyWindow = lazy(() => import("./windows/MasterKey"));

export const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/window:main" element={<LazyHomeWindow />} />

            <Route
              path="/window:master-key"
              element={<LazyMasterKeyWindow />}
            />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
