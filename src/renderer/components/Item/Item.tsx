import { memo } from "react";
import type { TItemProps } from "./types";

export const Item = memo((props: TItemProps) => {
  const { title, componentDelete } = props;

  return (
    <div className="todo-item">
      <span className="todo-item-title">{title}</span>
      {componentDelete && (
        <div className="todo-item-actions">{componentDelete}</div>
      )}
    </div>
  );
});
