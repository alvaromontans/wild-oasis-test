import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "Ver todos" },
          { value: "discount", label: "Con descuento" },
          { value: "no-discount", label: "Sin descuento" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Ordenar por nombre (A-Z)" },
          { value: "name-desc", label: "Ordenar por nombre (Z-A)" },
          {
            value: "regular_price-asc",
            label: "Ordenar por precio (Menor a mayor)",
          },
          {
            value: "regular_price-desc",
            label: "Ordenar por precio (Mayor a menor)",
          },
          {
            value: "max_capacity-asc",
            label: "Ordenar por capacidad (Menor a mayor)",
          },
          {
            value: "max_capacity-desc",
            label: "Ordenar por capacidad (Mayor a menor)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
