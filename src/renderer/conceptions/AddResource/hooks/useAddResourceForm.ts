import { useActionState, useCallback } from "react";

import type { TFormState } from "../components/types";

const initialState: TFormState = {
  errors: {},
  message: "",
  success: false,
};

export const useAddResourceForm = () => {
  const addResourceAction = useCallback(
    async (_: TFormState, formData: FormData): Promise<TFormState> => {
      const name = formData.get("name");
      const key = formData.get("password");

      try {
        await window.electron.invoke.postResource({
          name,
          key,
        });

        return {
          ...initialState,
          success: true,
        };
      } catch (error) {
        return {
          ...initialState,
          message: "Failed to create resource",
          success: false,
        };
      }
    },
    []
  );

  const [state, formAction] = useActionState(addResourceAction, initialState);

  return {
    state,
    formAction,
  };
};
