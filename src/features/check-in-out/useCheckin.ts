import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface breakfastOptions {
    has_breakfast: boolean,
    extras_price: number,
    total_price: number,
}

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isPending: isCheckinIn } = useMutation({
        mutationFn: ({ id, breakfast }: { id: number; breakfast?: breakfastOptions }) =>
            updateBooking(
                id!, { status: "checked-in", is_paid: true, ...breakfast }),
        onSuccess: (data) => {
            toast.success(`Cabaña #${data.id} ha pasado el check-in`);
            queryClient.invalidateQueries({ type: "active" });
            navigate(`/bill/${data.id}`);
        },
        onError: () =>
            toast.error("Ha habido un error mientras se realizaba el check-in")
    });

    return { checkin, isCheckinIn };
}