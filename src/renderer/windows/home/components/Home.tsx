import { useClosePreloadWindow } from "@hooks/closePreloadWindow";

const Home = () => {
  useClosePreloadWindow("window:main");

  return <>home</>;
};

export default Home;
