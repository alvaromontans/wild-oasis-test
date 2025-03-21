import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function Users() {
  return (
    <>
      <Heading as="h1">Crear un nuevo usuario</Heading>
      <SignupForm />
    </>
  );
}

export default Users;
