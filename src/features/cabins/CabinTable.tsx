import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { CabinInterface } from "../../interfaces/CabinInterface";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (!cabins!.length) return <Empty resource="cabins" />;

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins: typeof cabins = cabins || [];

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins!.filter((cabin) => cabin.discount === 0);
  if (filterValue === "discount")
    filteredCabins = cabins!.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "start_date-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins!.sort(
    (a, b) =>
      (a[field as keyof typeof a] > b[field as keyof typeof b] ? 1 : -1) *
      modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabaña</div>
          <div>Capacidad</div>
          <div>Precio</div>
          <div>Descuento</div>
          <div></div>
        </Table.Header>
        <Table.Body<CabinInterface>
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
