import { useEffect, useState } from "react";
import type { THookInvoke } from "./types";

export const useInvoke = (): THookInvoke => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    window.electron.invoke.getVersion().then((value) => {
      setVersion((prevValue) => (prevValue === value ? prevValue : value));
    });
  }, []);

  return {
    version,
  };
};
