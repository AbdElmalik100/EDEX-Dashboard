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
import { formatArabicDate } from "../../utils";

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
    textAlign: "center",
    width: '100%'
  },
  headerCell: {
    backgroundColor: "#f0f0f0",
    fontSize: 12,
    fontWeight: "bold"
  },
  delegationInfo: {
    marginTop: 10,
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
    alignSelf: "flex-end" // makes width shrink to fit content
  },
  nationalityBox: {
    marginBottom: 20
  },
  sectionDivider: {
    marginTop: 30,
    marginBottom: 20,
    borderTop: 2,
    borderTopColor: "#333",
    borderTopStyle: "solid",
    paddingTop: 20
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
    color: "#333"
  }
});

// ✅ Headers for Delegation Report
const delegationHeaders = [
  "الجنسية",
  "رئيس الوفد",
  "عدد الاعضاء",
  "الصالة",
  "شركة الطيران",
  "رقم الرحلة",
  "نوع الحركة",
  "التاريخ",
  "الساعة",
  "المستقبل",
  "وجهة الرحلة",
  "الشحنات"
];

// ✅ Headers for Full Report
const fullReportHeaders = [
  "الرتبة",
  "الاسم",
  "الوظيفة",
  "الوصول من / المغادرة الى",
  "تاريخ الوصول / المغادرة",
  "سعت الوصول / المغادرة",
  "رقم الرحلة",
  "شركة الطيران",
];

const CombinedReportPDF = ({ 
  delegationData, 
  fullReportData, 
  showDelegationReport = true, 
  showFullReport = true 
}) => {
  return (
    <Document key={'combined-report'}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Logos + Title Row */}
        <View style={styles.headerRow}>
          <Image src="/images/logo.png" style={styles.logo} />
          <View style={{ flexDirection: "column", alignItems: 'flex-end', marginLeft: 20, marginRight: 20, fontSize: 12, fontWeight: "bold" }}>
            <Text>
              ادارة النقــــــــــــــــــــــــــــل
            </Text>
            <Text>
              فوج تشهيلات مطــارات ق.م
            </Text>
            <View style={{ flexDirection: "row-reverse", gap: '8px' }} >
              <Text>
                : التـــــــــــــاريخ
              </Text>
              <Text>
                {formatArabicDate(new Date())}
              </Text>
            </View>
          </View>
        </View>

        {/* Delegation Report Section */}
        {showDelegationReport && delegationData && (
          <>
            <Text style={styles.header}>تقرير الوفود</Text>
            
            <View style={styles.table}>
              <View style={styles.row}>
                {delegationHeaders.map((h, i) => (
                  <Text key={i} style={[styles.cell, styles.headerCell, { width: '10%' }]}>
                    {h}
                  </Text>
                ))}
              </View>

              {delegationData.map((row, i) => (
                <View style={styles.row} key={i}>
                  <Text style={[styles.cell]}>{row.nationality}</Text>
                  <Text style={[styles.cell]}>{row.delegationHead}</Text>
                  <Text style={[styles.cell]}>{row.membersCount}</Text>
                  <Text style={[styles.cell]}>{row.hall}</Text>
                  <Text style={[styles.cell]}>{row.airline}</Text>
                  <Text style={[styles.cell]}>{row.flightNumber}</Text>
                  <Text style={[styles.cell]}>{row.moveType}</Text>
                  <Text style={[styles.cell]}>{row.date}</Text>
                  <Text style={[styles.cell]}>{row.time}</Text>
                  <Text style={[styles.cell]}>{row.receptor}</Text>
                  <Text style={[styles.cell]}>{row.destination}</Text>
                  <Text style={[styles.cell]}>{row.shipments}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Section Divider */}
        {/* {showDelegationReport && showFullReport && (
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>═══════════════════════════════════════</Text>
          </View>
        )} */}

        {/* Full Report Section */}
        {showFullReport && fullReportData && (
          <>
            <Text style={styles.header}>تقرير شامل باعضاء الوفود</Text>
            
            {/* Loop over nationalities */}
            {Object.entries(fullReportData).map(([nationality, members], idx) => (
              <View key={idx} style={styles.nationalityBox}>
                <Text style={styles.delegationInfo}>
                  {`الوفد: ${nationality} - ${members[0].delegation.delegationHead}`}
                </Text>

                <View style={styles.table}>
                  <View style={styles.row}>
                    {fullReportHeaders.map((h, i) => (
                      <Text
                        key={i}
                        style={[styles.cell, styles.headerCell]}
                      >
                        {h}
                      </Text>
                    ))}
                  </View>

                  {members.map((row, i) => (
                    <View style={styles.row} key={i}>
                      <Text style={styles.cell}>{row.rank}</Text>
                      <Text style={styles.cell}>{row.name}</Text>
                      <Text style={styles.cell}>{row.role}</Text>
                      <Text style={styles.cell}>{row.delegation.destination}</Text>
                      <Text style={styles.cell}>{row.delegation.date}</Text>
                      <Text style={styles.cell}>{row.delegation.time}</Text>
                      <Text style={styles.cell}>{row.delegation.flightNumber}</Text>
                      <Text style={styles.cell}>{row.delegation.airline}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  )
}

export default CombinedReportPDF
