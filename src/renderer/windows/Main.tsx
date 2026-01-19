import { Button } from "../components/Button/Button";
import { useClosePreloadWindow } from "@hooks/closePreloadWindow";
import { AppVersion } from "@components/AppVersion";

const Main = () => {
  useClosePreloadWindow("window:main");

  const handleKey = () => {
    window.electron.send.windowMasterKey();
  };

  return (
    <div className="center">
      <AppVersion />
      <div>
        <Button type="submit" size="large" onClick={handleKey}>
          Open
        </Button>
        <Button type="submit" size="large" onClick={handleKey}>
          Open
        </Button>
      </div>
    </div>
  );
};

export default Main;
