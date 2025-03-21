import styled from "styled-components";
import { CabinInterface } from "../../interfaces/CabinInterface";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: CabinInterface }) {
  const { isDeleting, mutate: deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copia de ${cabin.name}`,
      max_capacity: cabin.max_capacity,
      regular_price: cabin.regular_price,
      discount: cabin.discount,
      description: cabin.description,
      image: cabin.image,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={String(cabin.image)} alt={cabin.name} />
        <Cabin>{cabin.name}</Cabin>
        <div>Capacidad para {cabin.max_capacity} personas</div>
        <Price>{formatCurrency(cabin.regular_price)}</Price>
        {cabin.discount ? (
          <Discount>{formatCurrency(cabin.discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={String(cabin.id)} />
              <Menus.List id={String(cabin.id)}>
                <Menus.Button
                  onClick={handleDuplicate}
                  icon={<HiSquare2Stack />}
                >
                  Copiar
                </Menus.Button>

                <Modal.Open
                  opens="edit"
                  render={(showForm) => (
                    <Menus.Button onClick={showForm} icon={<HiPencil />}>
                      Editar
                    </Menus.Button>
                  )}
                />

                <Modal.Open
                  opens="delete"
                  render={(open) => (
                    <Menus.Button onClick={open} icon={<HiTrash />}>
                      Eliminar
                    </Menus.Button>
                  )}
                />
              </Menus.List>
              <Modal.Window
                name="edit"
                render={(showForm) => (
                  <CreateCabinForm cabinToEdit={cabin} onShowForm={showForm} />
                )}
              />

              <Modal.Window
                name="delete"
                render={(close) => (
                  <ConfirmDelete
                    onConfirm={() => deleteCabin(cabin.id!)}
                    resourceName="cabins"
                    disabled={isDeleting}
                    onCloseModal={close}
                  />
                )}
              />
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
