import { useClosePreloadWindow } from "@hooks/closePreloadWindow";
import { Container as ContainerAppVersion } from "@composites/AppVersion";
import IconButton from "@mui/material/IconButton";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";

const Home = () => {
  useClosePreloadWindow("window:main");

  const handleKey = () => {
    window.electron.send.windowMasterKey();
  };

  return (
    <>
      <ContainerAppVersion sx={{ width: "100%" }} variant="caption" />
      <IconButton size="small" onClick={handleKey}>
        <NoEncryptionGmailerrorredIcon fontSize="medium" />
      </IconButton>
    </>
  );
};

export default Home;
