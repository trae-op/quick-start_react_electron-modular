import { useEffect, useState } from "react";
import { Button } from "@components/Button";

const Delete = () => {
  const [target, setTarget] = useState<TItem | null>(null);

  useEffect(() => {
    window.electron.invoke.getDeleteTarget().then((value) => {
      setTarget(value ?? null);
    });
  }, []);

  const handleCancel = () => {
    window.electron.send.closeDeleteWindow();
  };

  const handleDelete = async () => {
    if (!target) {
      return;
    }

    await window.electron.invoke.deleteItem({ id: target.id });
    window.electron.send.closeDeleteWindow();
  };

  return (
    <div className="center">
      <div className="confirm-card">
        <h2>Delete item</h2>
        <p className="confirm-text">
          {target
            ? `Are you sure you want to delete “${target.title}”?`
            : "No item selected."}
        </p>
        <div className="button-group">
          <Button variant="ghost" size="medium" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="medium" onClick={handleDelete} disabled={!target}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
