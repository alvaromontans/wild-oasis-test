import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "Todas" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Sin confirmar" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "start_date-desc",
            label: "Ordenar por fecha (Desc)",
          },
          {
            value: "start_date-asc",
            label: "Ordenar por fecha (Asc)",
          },
          {
            value: "total_price-desc",
            label: "Ordenar por precio (Desc)",
          },
          { value: "total_price-asc", label: "Ordenar por precio (Asc)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
