import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
    const { id } = useParams();

    const {
        isPending,
        data: booking,
    } = useQuery({
        queryKey: ["booking", id],
        queryFn: () => getBooking(Number(id!)),
        retry: false
    });

    return { isPending, booking };
}