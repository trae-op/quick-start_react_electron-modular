import { ReactNode } from "react";

export type TPropsProvider = {
  children: ReactNode;
  isMasterKey?: boolean;
  isDisabledActions?: boolean;
};

export type TPropsForm = {
  id: string;
};

export type TPropsItem = Pick<TResource, "id" | "name" | "key"> & {
  handleUpdate: () => void;
  handleDelete: () => void;
  handleKey: () => void;
};
