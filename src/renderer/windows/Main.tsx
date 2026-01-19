import { Button } from "../components/Button/Button";
import { useClosePreloadWindow } from "@hooks/closePreloadWindow";
import { AppVersion } from "@components/AppVersion";

const Main = () => {
  useClosePreloadWindow("window:main");

  const handleKey = () => {
    window.electron.send.windowMasterKey();
  };

  return (
    <>
      <AppVersion />
      <Button type="submit" size="large" onClick={handleKey}>
        Open
      </Button>
    </>
  );
};

export default Main;
