import { useEffect } from "react";
import { useSetResourcesListDispatch } from "../context";

export const useIpc = () => {
  const setList = useSetResourcesListDispatch();

  useEffect(() => {
    window.electron.send.resources();
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeResources(({ items }) => {
      setList(items);
    });
  }, [setList]);
};
