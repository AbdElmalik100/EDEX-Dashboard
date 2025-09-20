import * as XLSX from "xlsx"
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

export const exportToExcel = (data, fileName = "EDEX - Delegations report.xlsx") => {
    // Create a mapping from English keys → Arabic headers
    const headerMap = {
        nationality: "الجنسية",
        delegationHead: "رئيس الوفد",
        membersCount: "عدد الاعضاء",
        hall: "الصالة",
        moveType: "نوع الحركة",
        date: "التاريخ",
        time: "الساعة",
        receptor: "المستقبل",
        destination: "وجهة الرحلة",
        shipments: "الشحنات",
    };

    // Convert data keys to Arabic headers
    const arabicData = data.map((item) => {
        let newItem = {};
        for (const key in item) {
            if (headerMap[key]) {
                newItem[headerMap[key]] = item[key];
            }
        }
        return newItem;
    });

    // Generate worksheet
    const worksheet = XLSX.utils.json_to_sheet(arabicData);

    // Generate workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "الجدول");

    // Export to Excel
    XLSX.writeFile(workbook, fileName);
};


export const exportToPDF = async (PDFComponent, fileName = 'EDEX - report.pdf') => {
    const blob = await pdf(PDFComponent).toBlob();
    saveAs(blob, fileName);
};


export const dateRangeFilter = (row, columnId, filterValue) => {
    if (!filterValue) return true
    const rowDate = new Date(row.getValue(columnId)).toLocaleDateString()
    const start = filterValue.start ? new Date(filterValue.start).toLocaleDateString() : null
    const end = filterValue.end ? new Date(filterValue.end).toLocaleDateString() : null

    if (start && rowDate < start) return false
    if (end && rowDate > end) return false
    return true
}

export const formatArabicDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    // Return as Arabic numerals
    return `${year}/${month}/${day}`
        .replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]); // Convert to Arabic digits
};