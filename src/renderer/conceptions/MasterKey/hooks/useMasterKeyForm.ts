import { useActionState, useCallback } from "react";

import type { TFormState } from "../components/types";

const initialState: TFormState = {
  errors: {},
  message: "",
  success: false,
};

export const useMasterKeyForm = () => {
  const masterKeyAction = useCallback(
    async (_: TFormState, formData: FormData): Promise<TFormState> => {
      const key = (formData.get("key") || "") as string;

      try {
        await window.electron.invoke.postMasterKey({
          key,
        });

        return {
          ...initialState,
          success: true,
        };
      } catch (error) {
        return {
          ...initialState,
          message: "Failed to update master key",
          success: false,
        };
      }
    },
    []
  );

  const [state, formAction] = useActionState(masterKeyAction, initialState);

  return {
    state,
    formAction,
  };
};
