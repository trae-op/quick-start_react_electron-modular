import { useActionState, useCallback } from "react";
import { useParams } from "react-router-dom";

import type { TFormState } from "../components/types";

const initialState: TFormState = {
  errors: {},
  message: "",
  success: false,
};

export const useUpdateResourceForm = () => {
  const { id } = useParams<{ id: string }>();

  const updateResourceAction = useCallback(
    async (_: TFormState, formData: FormData): Promise<TFormState> => {
      const name = formData.get("name");
      const key = formData.get("password");

      try {
        if (name !== null) {
          await window.electron.invoke.putResource({
            id,
            name,
            ...(key !== null ? { key } : {}),
          });
        }

        return {
          ...initialState,
          success: true,
        };
      } catch (error) {
        return {
          ...initialState,
          message: "Failed to update resource",
          success: false,
        };
      }
    },
    [id]
  );

  const [state, formAction] = useActionState(
    updateResourceAction,
    initialState
  );

  return {
    state,
    formAction,
  };
};
