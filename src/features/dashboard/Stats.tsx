import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { BookingInterface } from "../../interfaces/BookingInterface";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface StatsProps {
  bookings: {
    created_at: string;
    extras_price: number;
    total_price: number;
  }[];
  confirmedStays: BookingInterface[];
  numDays: number;
  cabinCount: number;
}

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.num_nights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Reservas"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Ventas"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Ratio de ocupación"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={(occupation * 100).toFixed(2) + "%"}
      />
    </>
  );
}

export default Stats;
