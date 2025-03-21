import BillPdf from "../features/bill/BillPdf";
import Heading from "../ui/Heading";

function Bill() {
  return (
    <>
      <Heading as="h1">Ver factura</Heading>
      <BillPdf />
    </>
  );
}

export default Bill;
