import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { LoginInterface } from "../../interfaces/LoginInterface";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }: LoginInterface) =>
            loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            toast.success("Inicio de sesión satisfactorio");
            navigate("/dashboard", { replace: true });
        },
        onError: () => {
            toast.error("Credenciales incorrectas");
        }
    });

    return { login, isPending };
}