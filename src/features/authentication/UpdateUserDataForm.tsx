import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  console.log(user);

  const { email, user_metadata: { full_name: currentFullName } = {} } =
    user || {};

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName || !avatar) return;
    updateUser(
      { full_name: fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(undefined);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(undefined);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Correo electrónico">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Nombre de usuario">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            setAvatar(e.target.files![0]);
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button disabled={isUpdating}>Actualizar cuenta</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
