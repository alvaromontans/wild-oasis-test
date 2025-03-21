import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

interface BookingsProps {
  filter: { field: string; value: string, method: string } | null;
  sortBy: { field: string; direction: string };
  page: number;
}

export async function getBookings({ filter, sortBy, page }: BookingsProps) {
  let query = supabase
    .from("bookings").select("*,cabins(name),guests(full_name,email)",
      { count: "exact" });

  if (filter) {
    const methods = {
      eq: query.eq,
      neq: query.neq,
      lt: query.lt,
      lte: query.lte,
      gt: query.gt,
      gte: query.gte,
      like: query.like,
      ilike: query.ilike,
    } as const;

    const applyFilter = methods[filter.method as keyof typeof methods];
    if (applyFilter) {
      query = applyFilter.call(query, filter.field, filter.value);
    } else {
      throw new Error(`Unsupported filter method: ${filter.method}`);
    }
  }

  if (sortBy) query =
    query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Error fetching bookings')
  }

  return { data, count };
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.start_date))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.end_date)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(
  id: number,
  obj: { status: string, is_paid?: boolean }) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
