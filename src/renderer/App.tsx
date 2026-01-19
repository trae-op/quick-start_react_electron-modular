import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import {
  Provider as ProviderAuth,
  ContainerRoutes,
} from "@conceptions/AuthSocialNetwork";
import { Provider as ProviderUpdater } from "@conceptions/Updater";
import { Provider as ProviderTwoFactor } from "@conceptions/TwoFactor";
import { Provider as ProviderUser } from "@conceptions/User";
import { Provider as ProviderMasterKey } from "@conceptions/MasterKey";
import { MainLayout } from "@layouts/Main";
import { FormResourcesLayout } from "@layouts/FormResources";
import { PublicRoute } from "@composites/PublicRoute";
import { PrivateRoute } from "@composites/PrivateRoute";
import { LoadingSpinner } from "@components/LoadingSpinner";

const LazyHomeWindow = lazy(() => import("./windows/home/components/Home"));
const LazyUpdateResourceWindow = lazy(
  () => import("./windows/updateResource/UpdateResource"),
);
const LazyAddResourceWindow = lazy(
  () => import("./windows/addResource/AddResource"),
);
const LazyUpdaterWindow = lazy(() => import("./windows/updater/Updater"));
const LazyMasterKeyFormWindow = lazy(
  () => import("./windows/masterKey/MasterKeyForm"),
);
const LazyTwoFactorQRWindow = lazy(() => import("./windows/twoFactor/QR"));
const LazyTwoFactorVerifyWindow = lazy(
  () => import("./windows/twoFactor/Verify"),
);
const LazyConfirmDeleteResourceWindow = lazy(
  () => import("./windows/confirmDeleteResource/ConfirmDeleteResource"),
);
const LazyLogInWindow = lazy(() => import("./windows/logIn/LogIn"));

export const App = () => {
  return (
    <ProviderAuth>
      <ProviderUpdater>
        <ContainerRoutes>
          <HashRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route element={<PublicRoute />}>
                    <Route path="/sign-in" element={<LazyLogInWindow />} />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route
                      path="/window:main"
                      element={
                        <ProviderUser>
                          <ProviderMasterKey>
                            <LazyHomeWindow />
                          </ProviderMasterKey>
                        </ProviderUser>
                      }
                    />
                  </Route>

                  <Route element={<FormResourcesLayout />}>
                    <Route
                      path="/window/resource/add"
                      element={<LazyAddResourceWindow />}
                    />
                    <Route
                      path="/window/resource/update/:id"
                      element={<LazyUpdateResourceWindow />}
                    />
                  </Route>

                  <Route
                    path="/window/resource/delete/:id"
                    element={<LazyConfirmDeleteResourceWindow />}
                  />

                  <Route
                    path="/window:update-app"
                    element={<LazyUpdaterWindow />}
                  />

                  <Route
                    path="/window:master-key"
                    element={
                      <ProviderMasterKey>
                        <LazyMasterKeyFormWindow />
                      </ProviderMasterKey>
                    }
                  />

                  <Route element={<ProviderTwoFactor />}>
                    <Route
                      path="/window:two-factor-qa"
                      element={<LazyTwoFactorQRWindow />}
                    />
                    <Route
                      path="/window:two-factor-verify"
                      element={<LazyTwoFactorVerifyWindow />}
                    />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </HashRouter>
        </ContainerRoutes>
      </ProviderUpdater>
    </ProviderAuth>
  );
};
