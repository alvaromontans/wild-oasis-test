import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isPending, isAuthenticated, isFetching } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending && !isFetching) navigate("/login");
    },
    [isAuthenticated, navigate, isPending, isFetching]
  );

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
