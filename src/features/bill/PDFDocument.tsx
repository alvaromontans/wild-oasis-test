import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import { BookingInterface } from "../../interfaces/BookingInterface";

function PDFDocument({ booking }: { booking: BookingInterface }) {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundColor: "#fff",
      fontFamily: "Helvetica",
    },
    header: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: "center",
      color: "#4CAF50",
      fontWeight: "bold",
    },
    agencyInfo: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 20,
    },
    section: {
      marginBottom: 10,
      paddingBottom: 10,
      borderBottom: "1 solid #ddd",
    },
    text: {
      fontSize: 12,
      marginBottom: 4,
    },
    table: {
      display: "flex",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#ddd",
      marginTop: 10,
    },
    tableRow: {
      flexDirection: "row",
      backgroundColor: "#f2f2f2",
    },
    tableColHeader: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 5,
      fontWeight: "bold",
      backgroundColor: "#ddd",
    },
    tableCol: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 5,
    },
    totalSection: {
      marginTop: 10,
      textAlign: "right",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  return (
    <Document title={`Factura ${booking.guests.full_name}`}>
      <Page size="A4" style={styles.page}>
        <Image src="/logo-light.png" style={{ width: 100, height: 65 }} />
        <Text style={styles.header}>The Wild Oasis</Text>
        <Text style={styles.agencyInfo}>
          Email: hola@sitioincreible.com | Web:{" "}
          <Link src="http://localhost:5173/">Wild Oasis</Link>
        </Text>

        <View style={styles.section}>
          <Text style={styles.text}>Nombre: {booking.guests.full_name}</Text>
          <Text style={styles.text}>Email: {booking.guests.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Servicios Contratados:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Precio</Text>
              <Text style={styles.tableColHeader}>Extras</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>{booking.cabin_price} €</Text>
              <Text style={styles.tableCol}>{booking.extras_price} €</Text>
            </View>
          </View>
          <Text style={styles.totalSection}>
            Total: {booking.total_price} €
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;
