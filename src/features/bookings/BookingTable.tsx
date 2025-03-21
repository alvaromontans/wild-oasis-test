import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { BookingInterface } from "../../interfaces/BookingInterface";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, count, isPending } = useBookings();

  if (isPending) return <Spinner />;

  if (!bookings!.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabaña</div>
          <div>Huéspedes</div>
          <div>Fechas</div>
          <div>Estado</div>
          <div>Precio</div>
          <div></div>
        </Table.Header>

        <Table.Body<BookingInterface>
          data={bookings!}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count!} />
      </Table.Footer>
    </Menus>
  );
}

export default BookingTable;
