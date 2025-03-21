import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isPending, settings = {} } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  const [minBookingLength, setMinBookingLength] = useState<number>();
  const [maxBookingLength, setMaxBookingLength] = useState<number>();
  const [maxGuestsBooking, setMaxGuestsBooking] = useState<number>();
  const [breakfastPrice, setBreakfastPrice] = useState<number>();

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updates: { [key: string]: number | undefined } = {
      min_booking_length: minBookingLength,
      max_booking_length: maxBookingLength,
      max_guests_per_booking: maxGuestsBooking,
      breakfast_price: breakfastPrice,
    };

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        updateSetting({ [key]: updates[key] });
      }
    });

    setMinBookingLength(undefined);
    setMaxBookingLength(undefined);
    setMaxGuestsBooking(undefined);
    setBreakfastPrice(undefined);
  }

  if (isPending) return <Spinner />;

  return (
    <Form onSubmit={handleUpdate}>
      <FormRow label="Mínimo de noches">
        <Input
          type="number"
          id="min_booking_length"
          defaultValue={settings.min_booking_length}
          // onChange={(e) => handleUpdate(e, "min_booking_length")}
          onChange={(e) => setMinBookingLength(+e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Máximo noches">
        <Input
          type="number"
          id="max_booking_length"
          defaultValue={settings.max_booking_length}
          // onChange={(e) => handleUpdate(e, "max_booking_length")}
          onChange={(e) => setMaxBookingLength(+e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Máximo huéspedes">
        <Input
          type="number"
          id="max_guests_per_booking"
          defaultValue={settings.max_guests_per_booking}
          // onChange={(e) => handleUpdate(e, "max_guests_per_booking")}
          onChange={(e) => setMaxGuestsBooking(+e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Precio desayuno">
        <Input
          type="number"
          id="breakfast_price"
          defaultValue={settings.breakfast_price}
          // onChange={(e) => handleUpdate(e, "breakfast_price")}
          onChange={(e) => setBreakfastPrice(+e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>Actualizar opciones</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
