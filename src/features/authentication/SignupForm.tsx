import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { SignupInterface } from "../../interfaces/SignupInterface";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<SignupInterface>();
  const { errors } = formState;

  function onSubmit({ full_name, email, password }: SignupInterface) {
    signup({ full_name, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Nombre de usuario"
        error={errors.full_name?.message as string}
      >
        <Input
          type="text"
          id="full_name"
          disabled={isPending}
          {...register("full_name", { required: "Este campo es obligatorio" })}
        />
      </FormRow>

      <FormRow
        label="Correo electrónico"
        error={errors.email?.message as string}
      >
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Introduce un correo electrónico válido",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Contraseña (Min 8 longitud)"
        error={errors.password?.message as string}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 8,
              message: "La contraseña debe ser de 8 caracteres como mínimo",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repetir contraseña"
        error={errors.password_confirm?.message as string}
      >
        <Input
          type="password"
          id="password_confirm"
          disabled={isPending}
          {...register("password_confirm", {
            required: "Este campo es obligatorio",
            validate: (value) =>
              value === getValues().password ||
              "No se corresponde la contraseña",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => reset()} $variation="secondary" type="reset">
          Cancelar
        </Button>
        <Button>Crear nuevo usuario</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
