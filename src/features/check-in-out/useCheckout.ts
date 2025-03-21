import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
    const queryClient = useQueryClient();

    const { mutate: checkout, isPending: isCheckingOut } = useMutation({
        mutationFn: (id: number) =>
            updateBooking(
                id!, { status: "checked-out" }),
        onSuccess: (data) => {
            toast.success(`Cabaña #${data.id} ha pasado el check-out`);
            queryClient.invalidateQueries({ type: "active" });
        },
        onError: () =>
            toast.error("Ha habido un error mientras se realizaba el check-out")
    });

    return { checkout, isCheckingOut };
}