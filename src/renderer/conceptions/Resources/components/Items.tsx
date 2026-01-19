import { memo } from "react";
import { useResourcesListSelector } from "../context";
import { useIpc } from "../hooks/useIpc";
import { Item } from "./Item";

export const Items = memo(() => {
  useIpc();
  const list = useResourcesListSelector();

  if (list === undefined) {
    return null;
  }

  return list.map((item) => {
    const handleUpdate = () => {
      window.electron.send.windowOpenUpdateResource({
        id: item.id + "",
      });
    };

    const handleDelete = () => {
      window.electron.send.windowOpenDeleteResource({
        id: item.id + "",
      });
    };

    const handleKey = () => {
      window.electron.send.windowMasterKey();
    };

    return (
      <Item
        key={item.id + ""}
        id={item.id}
        name={item.name}
        handleKey={handleKey}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    );
  });
});
