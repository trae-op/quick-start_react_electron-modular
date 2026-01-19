import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@components/Button";

const Delete = () => {
  const { id } = useParams<{
    id?: string;
  }>();

  const handleCancel = () => {
    window.electron.send.closeDeleteWindow();
  };

  const handleDelete = useCallback(async () => {
    if (!id) {
      return;
    }

    await window.electron.invoke.deleteItem({ id });
    window.electron.send.closeDeleteWindow();
  }, [id]);

  return (
    <div className="center">
      <div className="confirm-card">
        <h2>Delete item</h2>
        <p className="confirm-text">
          {id ? "Are you sure you want to delete" : "No item selected."}
        </p>
        <div className="button-group">
          <Button variant="ghost" size="medium" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="medium" onClick={handleDelete} disabled={!id}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
