import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
  Image
} from "@react-pdf/renderer";

// ✅ Register Arabic font
Font.register({
  family: "Cairo",
  src: "/fonts/Cairo-Regular.ttf", // ⬅️ put your Cairo font file inside /public/fonts/
});

// ✅ Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Cairo",
    direction: "rtl" // Right-to-left for Arabic
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // logo left + logo right
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    width: 80,
    // height: 80
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold"
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  row: {
    flexDirection: "row-reverse" // ✅ make it RTL
  },
  cell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 10,
    textAlign: "center"
  },
  headerCell: {
    backgroundColor: "#f0f0f0",
    fontSize: 12,
    fontWeight: "bold"
  }
});

// Example: distribute widths evenly (10 columns → 10%)
const cellWidths = ["10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%"];


// ✅ Headers in Arabic
const headers = [
  "الجنسية",
  "رئيس الوفد",
  "عدد الاعضاء",
  "الصالة",
  "نوع الحركة",
  "التاريخ",
  "الساعة",
  "المستقبل",
  "وجهة الرحلة",
  "الشحنات"
];

const DelegationReportPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Logos + Title Row */}
        <View style={styles.headerRow}>
          <Image src="/images/logo.png" style={styles.logo} />
          {/* <Text style={styles.header}>تقرير الوفود</Text> */}
          <Image
            src="/images/EDEX-logo.jpg"
            style={{
              width: 125
            }}
          />
        </View>
        <Text style={styles.header}>تقرير الوفود</Text>

        <View style={styles.table}>
          {/* Header row */}
          <View style={styles.row}>
            {headers.map((h, i) => (
              <Text key={i} style={[styles.cell, styles.headerCell, { width: cellWidths[i] }]}>
                {h}
              </Text>
            ))}
          </View>

          {/* Data rows */}
          {data.map((row, i) => (
            <View style={styles.row} key={i}>
              <Text style={[styles.cell, { width: cellWidths[0] }]}>{row.nationality}</Text>
              <Text style={[styles.cell, { width: cellWidths[1] }]}>{row.delegationHead}</Text>
              <Text style={[styles.cell, { width: cellWidths[2] }]}>{row.membersCount}</Text>
              <Text style={[styles.cell, { width: cellWidths[3] }]}>{row.hall}</Text>
              <Text style={[styles.cell, { width: cellWidths[4] }]}>{row.moveType}</Text>
              <Text style={[styles.cell, { width: cellWidths[5] }]}>{row.date}</Text>
              <Text style={[styles.cell, { width: cellWidths[6] }]}>{row.time}</Text>
              <Text style={[styles.cell, { width: cellWidths[7] }]}>{row.receptor}</Text>
              <Text style={[styles.cell, { width: cellWidths[8] }]}>{row.destination}</Text>
              <Text style={[styles.cell, { width: cellWidths[9] }]}>{row.shipments}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  )
}

export default DelegationReportPDF