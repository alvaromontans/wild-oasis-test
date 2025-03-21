import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { BookingInterface } from "../../interfaces/BookingInterface";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { SettingsInterface } from "../../interfaces/SettingsInterface";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isPending } = useBooking() as {
    booking: BookingInterface;
    isPending: boolean;
  };

  const { settings, isPending: isLoadingSettings } = useSettings() as {
    settings: SettingsInterface;
    isPending: boolean;
  };

  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  useEffect(() => {
    setConfirmPaid(booking?.is_paid ?? false);
  }, [booking]);

  const moveBack = useMoveBack();
  const { checkin, isCheckinIn } = useCheckin();

  if (isPending || isLoadingSettings) return <Spinner />;

  const optionalBreakfastPrice =
    settings?.breakfast_price * booking.num_nights * booking.num_guests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        id: booking.id!,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: booking.total_price + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ id: booking.id! });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            ¿Quieres añadir el desayuno por{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckinIn}
        >
          Confirmo que he pagado la cabaña a cuenta de{" "}
          {!addBreakfast
            ? formatCurrency(booking.total_price)
            : formatCurrency(booking.total_price + optionalBreakfastPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckinIn}>
          Check in reserva #{booking.id}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Volver
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
