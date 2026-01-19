import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type THookSubscribeEvent = {
  result: TResource | undefined;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};
export type THookControl = {
  handleTextInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  submitFormAction: (_: undefined, formData: FormData) => Promise<undefined>;
};
