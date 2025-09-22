import { exportToExcel, exportToPDF } from '../../utils'
import DelegationReportPDF from '../PDF Templates/DelegationReportPDF'
import { Icon } from '@iconify/react/dist/iconify.js'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { members } from '../../data'
import FullReport from '../PDF Templates/FullReport'
import CombinedReportPDF from '../PDF Templates/CombinedReportPDF'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from "file-saver";

const DelegationReportExport = ({data}) => {
    // console.log(data);
    
    const groupedByNationality = () => {
        // Step 1: collect all delegation nationalities from the data prop
        const validDelegationIds = new Set(data.map(d => d.id));
        
        
        // Step 2: filter members to only keep ones whose delegation nationality exists in data
        const filteredMembers = members.filter(member => validDelegationIds.has(member.delegation?.id));
        console.log(filteredMembers);

        // Step 3: group filtered members by nationality
        return filteredMembers.reduce((acc, member) => {
            const nat = member.delegation?.nationality;
            if (!nat) return acc;
            if (!acc[nat]) {
                acc[nat] = [];
            }
            acc[nat].push(member);
            return acc;
        }, {});
        
        // return members.reduce((acc, member) => {
            //     const nat = member.delegation.nationality;
            //     if (!acc[nat]) {
                //         acc[nat] = [];
        //     }
        //     acc[nat].push(member);
        //     return acc;
        // }, {});
    }
    console.log(groupedByNationality());
    

    const exportFullReport = async () => {
        const blob = await pdf(<FullReport data={groupedByNationality()} />).toBlob();
        saveAs(blob, "EDEX - Full report.pdf");
    }
    
    const exportDelegationReport = async () => {
        const blob = await pdf(<DelegationReportPDF data={data} />).toBlob();
        saveAs(blob, "EDEX - Delegations report.pdf");
    }


    return (
        <DropdownMenu dir='rtl'>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="!ring-0">
                    <Icon icon={'mi:export'} />
                    <span>تصدير تقرير</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={e => exportFullReport()}>
                    <Icon icon={'hugeicons:pdf-02'} className="text-[#ef5350]" />
                    <span>تقرير شامل</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={e => exportDelegationReport()}>
                    <Icon icon={'hugeicons:pdf-02'} className="text-[#ef5350]" />
                    <span>PDF ملف</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onSelect={e => exportToExcel(data)}>
                    <Icon icon={'hugeicons:xls-02'} className="text-[#33c481]" />
                    <span>Excel ملف</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DelegationReportExport