import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { BookingInterface } from "../../interfaces/BookingInterface";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { es } from "date-fns/locale";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }: { booking: BookingInterface }) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row role="row">
      <Cabin>{booking.cabins.name}</Cabin>

      <Stacked>
        <span>{booking.guests.full_name}</span>
        <span>{booking.guests.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking.start_date))
            ? "Today"
            : formatDistanceFromNow(booking.start_date.toString())}{" "}
          &rarr; {booking.num_nights} noches
        </span>
        <span>
          {format(new Date(booking.start_date), "dd MMMM yyyy", {
            locale: es,
          })}{" "}
          &mdash;
          {format(new Date(booking.end_date), "dd MMMM yyyy", {
            locale: es,
          })}
        </span>
      </Stacked>

      <Tag type={statusToTagName[booking.status]}>
        {booking.status.replace("unconfirmed", "Sin confirmar")}
      </Tag>

      <Amount>{formatCurrency(booking.total_price)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={String(booking.id)} />
          <Menus.List id={String(booking.id)}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${booking.id}`)}
            >
              Ver detalles
            </Menus.Button>

            {booking.status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${booking.id}`)}
              >
                Check in
              </Menus.Button>
            )}

            {booking.status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(booking.id!)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open
              opens="delete"
              render={(open) => (
                <Menus.Button onClick={open} icon={<HiTrash />}>
                  Eliminar
                </Menus.Button>
              )}
            />
          </Menus.List>
        </Menus.Menu>

        <Modal.Window
          name="delete"
          render={(close) => (
            <ConfirmDelete
              onConfirm={() => deleteBooking(booking.id!)}
              resourceName="reserva"
              onCloseModal={close}
              disabled={isDeleting}
            />
          )}
        />
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
