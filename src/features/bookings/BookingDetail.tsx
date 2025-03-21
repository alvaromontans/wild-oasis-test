import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { BookingInterface } from "../../interfaces/BookingInterface";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isPending } = useBooking() as {
    booking: BookingInterface;
    isPending: boolean;
  };
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isPending) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button
            $icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(booking.id!)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open
            opens="delete"
            render={(open) => (
              <Button onClick={open} $variation="danger">
                Eliminar
              </Button>
            )}
          />
          <Modal.Window
            name="delete"
            render={(close) => (
              <ConfirmDelete
                onConfirm={() =>
                  deleteBooking(booking.id!, { onSettled: () => navigate(-1) })
                }
                resourceName="booking"
                onCloseModal={close}
                disabled={isDeleting}
              />
            )}
          />
        </Modal>

        <Button size="medium" $variation="secondary" onClick={moveBack}>
          Volver
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
