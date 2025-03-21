import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Edita tu cuenta</Heading>

      <Row type="vertical">
        <Heading as="h3">Actualiza datos de usuario</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading as="h3">Actualiza contraseña</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
