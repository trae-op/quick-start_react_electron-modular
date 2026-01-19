import { Button } from "../components/Button/Button";
import { useClosePreloadWindow } from "@hooks/closePreloadWindow";
import { AppVersion } from "@components/AppVersion";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";

const Home = () => {
  useClosePreloadWindow("window:main");

  const handleKey = () => {
    window.electron.send.windowMasterKey();
  };

  return (
    <>
      <AppVersion />
      <LoadingSpinner size="xl" />
      <Button type="submit" size="large" onClick={handleKey}>
        Open
      </Button>
    </>
  );
};

export default Home;
