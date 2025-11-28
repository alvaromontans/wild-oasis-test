import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    const { mutate: signup, isPending } = useMutation(
        {
            mutationFn: signupApi,
            onSuccess: () => {
                toast.success("Cuenta creada correctamente. A continuación verifica la nueva cuenta con el correo electrónico")
            },
            onError: (error: Error) => {
                toast.error(error.message);
            }
        }
    );

    return { signup, isPending }
}