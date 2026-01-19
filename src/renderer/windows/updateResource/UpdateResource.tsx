import { Form, Provider } from "@conceptions/UpdateResource";
import { Form as FormGenerateCharacters } from "@conceptions/GenerateCharacters";

const UpdateResource = () => {
  return (
    <Provider renderGenerateCharacters={<FormGenerateCharacters />}>
      <Form />
    </Provider>
  );
};

export default UpdateResource;
