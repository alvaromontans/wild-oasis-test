import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open
        opens="cabin-form"
        render={(open) => <Button onClick={open}>Añadir cabaña</Button>}
      />
      <Modal.Window
        name="cabin-form"
        render={(close) => <CreateCabinForm onCloseModal={close} />}
      />
    </Modal>
  );
}

export default AddCabin;
