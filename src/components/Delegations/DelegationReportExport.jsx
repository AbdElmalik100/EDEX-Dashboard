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

const DelegationReportExport = ({data}) => {
    const groupedByNationality = () => {
        return members.reduce((acc, member) => {
            const nat = member.delegation.nationality;
            if (!acc[nat]) {
                acc[nat] = [];
            }
            acc[nat].push(member);
            return acc;
        }, {});
    }
    console.log(groupedByNationality());
    
    return (
        <DropdownMenu dir='rtl'>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="!ring-0">
                    <Icon icon={'mi:export'} />
                    <span>تصدير تقرير</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={e => exportToPDF(<FullReport data={groupedByNationality()} />, "EDEX - Full report.pdf")}>
                    <Icon icon={'hugeicons:pdf-02'} className="text-[#ef5350]" />
                    <span>تقرير شامل</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={e => exportToPDF(<DelegationReportPDF data={data} />, "EDEX - Delegations report.pdf")}>
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