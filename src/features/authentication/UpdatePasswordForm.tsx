import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";

interface FormData {
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormData>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: { password: string }) {
    console.log(password);
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Nueva contraseña (min 8 caracteres)"
        error={errors?.password?.message as string}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 8,
              message: "La contraseña debe ser de mínimo 8 caracteres",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirmar contraseña"
        error={errors?.passwordConfirm?.message as string}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Este campo es obligatorio",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={() => reset()} type="reset" $variation="secondary">
          Cancelar
        </Button>
        <Button disabled={isUpdating}>Actualizar contraseña</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
