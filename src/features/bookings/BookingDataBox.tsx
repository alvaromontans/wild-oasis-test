import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { BookingInterface } from "../../interfaces/BookingInterface";
import { es } from "date-fns/locale";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

interface PriceProps {
  $isPaid: boolean;
}

const Price = styled.div<PriceProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }: { booking: BookingInterface }) {
  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {booking.num_nights} noches en la cabaña{" "}
            <span>{booking.cabins.name}</span>
          </p>
        </div>

        <p>
          {format(new Date(booking.start_date), "EEE, dd MMM yyyy", {
            locale: es,
          })}{" "}
          (
          {isToday(new Date(booking.start_date))
            ? "Today"
            : formatDistanceFromNow(String(booking.start_date))}
          ) &mdash;{" "}
          {format(new Date(booking.end_date), "EEE, dd MMM yyyy", {
            locale: es,
          })}
        </p>
      </Header>

      <Section>
        <Guest>
          {booking.guests.country_flag && (
            <Flag
              src={booking.guests.country_flag}
              alt={`Bandera de ${booking.guests.nationality}`}
            />
          )}
          <p>
            {booking.guests.full_name}{" "}
            {booking.num_guests > 1
              ? `+ ${booking.num_guests - 1} huéspedes`
              : ""}
          </p>
          <span>&bull;</span>
          <p>{booking.guests.email}</p>
          {/* <span>&bull;</span>
          <p>National ID {booking.guests.national_ID}</p> */}
        </Guest>

        {booking.observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observaciones"
          >
            {booking.observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="¿Desayuno incluido?">
          {booking.has_breakfast ? "Sí" : "No"}
        </DataItem>

        <Price $isPaid={booking.is_paid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Precio total`}>
            {formatCurrency(booking.total_price)}

            {booking.has_breakfast &&
              ` (${formatCurrency(
                booking.cabin_price
              )} cabaña + ${formatCurrency(booking.extras_price)} desayuno)`}
          </DataItem>

          <p>{booking.is_paid ? "Pagado" : "Pago al llegar"}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          Reservado el{" "}
          {format(new Date(booking.created_at), "EEE, dd MMM yyyy, p", {
            locale: es,
          })}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
