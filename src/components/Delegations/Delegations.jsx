import {
    filterFns,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import DataTable from "../DataTable"
import DelegationTableToolbar from "./DelegationTableToolbar"
import DeletePopup from "../DeletePopup"
// import { dateRangeFilter } from "../../utils"
import { delegations } from "../../data"


export const columns = [
    {
        accessorKey: "delegationStatus",
        header: () => <div className="text-start">حالة الوفد</div>,
        cell: ({ row }) => {
            const status = row.getValue("delegationStatus")
            let statusIcon = ""
            let iconColor = ""
            
            switch(status) {
                case "all_departed":
                    statusIcon = "material-symbols:check-circle"
                    iconColor = "text-lime-600"
                    break
                case "partial_departed":
                    statusIcon = "material-symbols:schedule"
                    iconColor = "text-primary-600"
                    break
                case "not_departed":
                    statusIcon = "material-symbols:cancel"
                    iconColor = "text-red-600"
                    break
                default:
                    statusIcon = "material-symbols:cancel"
                    iconColor = "text-red-600"
            }
            
            return (
                <div className="px-1 py-1 rounded-lg text-lg font-medium text-center bg-gray-200 w-fit">
                    <Icon icon={statusIcon} fontSize={20} className={iconColor} />
                </div>
            )
        },
    },
    {
        accessorKey: "nationality",
        header: () => <div className="text-start">الجنسية</div>,
    },
    {
        accessorKey: "delegationHead",
        header: ({ column }) => {
            return (
                <div className="text-start">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        رئيس الوفد
                        <ArrowUpDown />
                    </Button>
                </div>
            )
        },
    },
    {
        accessorKey: "membersCount",
        header: () => <div className="text-start">عدد الاعضاء</div>,
    },
    {
        accessorKey: "arrivalInfo.arrivalHall",
        header: () => <div className="text-start">المطار</div>,
    },
    {
        accessorKey: "arrivalInfo.arrivalAirline",
        header: () => <div className="text-start">شركة الطيران</div>,
    },
    {
        accessorKey: "arrivalInfo.arrivalFlightNumber",
        header: () => <div className="text-start">رقم الرحلة</div>,
    },
    {
        accessorKey: "arrivalInfo.arrivalDate",
        header: () => <div className="text-start">التاريخ</div>,
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true
            const rowDate = new Date(row.getValue(columnId)).toLocaleDateString()
            // Date range
            if (filterValue.start || filterValue.end) {
                const { start, end } = filterValue                
                if (start && rowDate < start) return false
                if (end && rowDate > end) return false
                return true
            }
            // Single date
            if (filterValue) {
                return rowDate === filterValue
            }
            return true
        },
    },
    {
        accessorKey: "arrivalInfo.arrivalTime",
        header: () => <div className="text-start">سعت</div>,
    },
    {
        accessorKey: "arrivalInfo.arrivalReceptor",
        header: () => <div className="text-start">المستقبل</div>,
    },
    {
        accessorKey: "arrivalInfo.arrivalDestination",
        header: () => <div className="text-start">الوجهة</div>,
    },
    {
        accessorKey: "arrivalInfo.arrivalShipments",
        header: () => <div className="text-start">الشحنات</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu dir='rtl'>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 !ring-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Icon icon={'material-symbols:edit-outline-rounded'} />
                            <span>تعديل</span>
                        </DropdownMenuItem>
                        <DeletePopup item={row}>
                            <DropdownMenuItem variant="destructive" onSelect={e => e.preventDefault()}>
                                <Icon icon={'mynaui:trash'} />
                                <span>حذف</span>
                            </DropdownMenuItem>
                        </DeletePopup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
const Delegations = () => {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState('')
    
    const table = useReactTable({
        data: delegations,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'includesString', // or a custom filter fn

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    })
    
    return (
        <div className='border p-4 mt-8 border-neutral-300 rounded-2xl bg-white'>
            <DelegationTableToolbar table={table} data={delegations} />
            <DataTable table={table} columns={columns} clickableRow={true} />
        </div >
    )
}

export default Delegations