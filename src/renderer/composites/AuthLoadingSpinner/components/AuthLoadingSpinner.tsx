import { LoadingSpinner } from "@components/LoadingSpinner";
import { useControlContext } from "@conceptions/AuthSocialNetwork";

export const AuthLoadingSpinner = () => {
  const { isAuthenticated } = useControlContext();

  if (isAuthenticated === undefined) {
    return <LoadingSpinner />;
  }

  return null;
};
