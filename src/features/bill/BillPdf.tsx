import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { BookingInterface } from "../../interfaces/BookingInterface";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import PDFDocument from "./PDFDocument";
import ButtonGroup from "../../ui/ButtonGroup";

function BillPdf() {
  const { booking, isPending: isBookingLoading } = useBooking() as {
    booking: BookingInterface;
    isPending: boolean;
  };

  if (isBookingLoading) return <Spinner />;

  const fileName = booking.guests.full_name.toLowerCase().replace(" ", "_");

  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <PDFDocument booking={booking} />
      </PDFViewer>
      <ButtonGroup>
        <Button>
          <PDFDownloadLink
            document={<PDFDocument booking={booking} />}
            fileName={`factura_${fileName}.pdf`}
          >
            {({ loading }) =>
              loading ? "Cargando documento..." : "Descargar Factura"
            }
          </PDFDownloadLink>
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BillPdf;
