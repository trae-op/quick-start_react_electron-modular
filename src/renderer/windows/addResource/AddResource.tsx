import { Form, Provider } from "@conceptions/AddResource";
import { Form as FormGenerateCharacters } from "@conceptions/GenerateCharacters";

const AddResource = () => {
  return (
    <Provider renderGenerateCharacters={<FormGenerateCharacters />}>
      <Form />
    </Provider>
  );
};

export default AddResource;
