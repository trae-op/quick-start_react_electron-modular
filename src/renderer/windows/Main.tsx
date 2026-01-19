import { Button } from "../components/Button/Button";
import { useClosePreloadWindow } from "@hooks/closePreloadWindow";
import { AppVersion } from "@components/AppVersion";

const Main = () => {
  useClosePreloadWindow("window:main");

  const handleAdd = () => {
    window.electron.send.addWindow();
  };

  return (
    <div className="center">
      <AppVersion />
      <div className="button-group">
        <Button type="submit" size="large" onClick={handleAdd}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default Main;
