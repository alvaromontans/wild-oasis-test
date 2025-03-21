import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Stats from "./Stats";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending: isLoadingBookings } = useRecentBookings();
  const { cabins, isPending: isLoadingCabins } = useCabins();
  const {
    isPending: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings!}
        confirmedStays={confirmedStays!}
        numDays={numDays}
        cabinCount={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays!} />
      <SalesChart bookings={bookings!} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
