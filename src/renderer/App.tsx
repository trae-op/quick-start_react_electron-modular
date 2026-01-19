import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { MainLayout } from "@layouts/Main";
import { LoadingSpinner } from "@components/LoadingSpinner";

const LazyMainWindow = lazy(() => import("./windows/Main"));
const LazyMasterKeyWindow = lazy(() => import("./windows/Add"));
const LazyDeleteWindow = lazy(() => import("./windows/Delete"));

export const App = () => {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <LoadingSpinner
            size="xl"
            className="container-full-fixed container-bg-filled"
            inline
          />
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/window:main" element={<LazyMainWindow />} />
            <Route path="/window:add" element={<LazyMasterKeyWindow />} />
            <Route path="/window:delete/:id" element={<LazyDeleteWindow />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
