import { useEffect, useState } from "react";
import { Button } from "@components/Button";
import { Item } from "@components/Item";
import { useClosePreloadWindow } from "@hooks/closePreloadWindow";

const Main = () => {
  useClosePreloadWindow("window:main");
  const [items, setItems] = useState<TItem[]>([]);

  useEffect(() => {
    window.electron.invoke.getItems().then((payload) => {
      setItems(payload ?? []);
    });

    const unsubscribe = window.electron.receive.itemsSubscribe((payload) => {
      setItems(payload ?? []);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    window.electron.send.addWindow();
  };

  const handleDelete = (item: TItem) => {
    window.electron.send.deleteWindow(item);
  };

  return (
    <div className="center">
      <div className="todo-list">
        {items.length === 0 ? (
          <p className="todo-empty">No items yet. Add your first one.</p>
        ) : (
          items.map((item) => {
            const onClick = () => handleDelete(item);
            return (
              <Item
                key={item.id}
                title={item.title}
                componentDelete={
                  <Button variant="ghost" size="small" onClick={onClick}>
                    Delete
                  </Button>
                }
              />
            );
          })
        )}
      </div>
      <div className="button-group">
        <Button type="submit" size="medium" onClick={handleAdd}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default Main;
