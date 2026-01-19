import { useEffect, useState } from "react";

export const AppVersion = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    window.electron.invoke.getVersion().then((value) => {
      setVersion(value);
    });
  }, []);

  if (version === "") {
    return null;
  }

  return <h1>v{version}</h1>;
};
