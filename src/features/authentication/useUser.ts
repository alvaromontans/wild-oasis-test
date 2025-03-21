import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
    const { data: user, isPending, isFetching } = useQuery({
        queryKey: ["user"], queryFn: getCurrentUser
    });

    return {
        user,
        isPending,
        isAuthenticated: user?.role === "authenticated",
        isFetching
    };
}