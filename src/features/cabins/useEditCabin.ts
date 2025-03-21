import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { CabinInterface } from "../../interfaces/CabinInterface";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isPending: isEditing } = useMutation({
        mutationFn: (data: { newCabinData: CabinInterface; id: number }) =>
            createEditCabin(data.newCabinData, data.id),
        onSuccess: () => {
            toast.success("Cabaña editada correctamente");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { editCabin, isEditing };
}