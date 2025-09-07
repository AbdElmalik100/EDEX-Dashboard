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


export const exportToPDF = async (PDFComponent, fileName = 'EDEX - Delegations report.pdf') => {
    const blob = await pdf(PDFComponent).toBlob();
    saveAs(blob, fileName);
};


