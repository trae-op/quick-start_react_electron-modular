import { useEffect } from "react";
import { useSetUserDispatch } from "../context";

export const useIpc = () => {
  const setUser = useSetUserDispatch();

  useEffect(() => {
    const unSub = window.electron.receive.subscribeCheckUser(({ user }) => {
      setUser(user);
    });

    return unSub;
  }, [setUser]);

  useEffect(() => {
    window.electron.send.checkUser();
  }, []);
};
