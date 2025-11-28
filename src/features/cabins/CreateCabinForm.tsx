import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import { useForm, FieldErrors } from "react-hook-form";
import { CabinInterface } from "../../interfaces/CabinInterface";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({
  cabinToEdit = {} as CabinInterface,
  onCloseModal,
  onShowForm,
}: {
  cabinToEdit?: CabinInterface;
  onCloseModal?: () => void;
  onShowForm?: () => void;
}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm<
    CabinInterface & { imageForm: FileList }
  >({ defaultValues: isEditSession ? editValues : {} });

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data: CabinInterface & { imageForm: FileList }) {
    const { imageForm, ...rest } = data;

    if (isEditSession) {
      editCabin(
        {
          newCabinData: { ...rest, image: imageForm[0] || data.image },
          id: cabinToEdit.id!,
        },
        {
          onSuccess: () => {
            onShowForm?.();
          },
        }
      );
    } else {
      createCabin(
        { ...rest, image: imageForm[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors: FieldErrors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
      <FormRow label="Nombre" error={formState.errors.name?.message as string}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          autoComplete="on"
          {...register("name", { required: "Este campo es obligatorio" })}
        />
      </FormRow>

      <FormRow
        label="Capacidad máxima"
        error={formState.errors.max_capacity?.message as string}
      >
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register("max_capacity", {
            required: "Este campo es obligatorio",
            min: {
              value: 1,
              message: "Capacidad mínima de 1 persona",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Precio"
        error={formState.errors.regular_price?.message as string}
      >
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register("regular_price", {
            required: "Este campo es obligatorio",
            min: {
              value: 1,
              message: "El precio debe ser mayor que 0",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Descuento"
        error={formState.errors.discount?.message as string}
      >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "Este campo es obligatorio",
            validate: (value) =>
              +value <= +getValues().regular_price ||
              "El descuento debe ser inferior al precio",
          })}
        />
      </FormRow>

      <FormRow
        label="Descripción"
        error={formState.errors.description?.message as string}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        error={formState.errors.imageForm?.message as string}
      >
        {typeof cabinToEdit.image === "string" && (
          <input type="hidden" value={cabinToEdit.image} autoComplete="off" />
        )}
        <FileInput
          id="imageForm"
          accept="image/*"
          {...register("imageForm", {
            required: isEditSession ? false : "La imagen es obligatoria",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={isEditSession ? onShowForm : onCloseModal}
        >
          Cancelar
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Editar cabaña" : "Añadir cabaña"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
