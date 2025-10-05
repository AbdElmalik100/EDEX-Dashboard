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
            
            const rowDateString = row.getValue(columnId)
            if (!rowDateString) return false
            
            const rowDate = new Date(rowDateString)
            if (isNaN(rowDate.getTime())) return false
            
            // Date range filter
            if (filterValue.start || filterValue.end) {
                const { start, end } = filterValue
                
                if (start) {
                    const startDate = new Date(start)
                    if (isNaN(startDate.getTime())) return false
                    if (rowDate < startDate) return false
                }
                
                if (end) {
                    const endDate = new Date(end)
                    if (isNaN(endDate.getTime())) return false
                    if (rowDate > endDate) return false
                }
                
                return true
            }
            
            // Single date filter
            if (typeof filterValue === 'string') {
                const filterDate = new Date(filterValue)
                if (isNaN(filterDate.getTime())) return false
                return rowDate.toDateString() === filterDate.toDateString()
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
        filterFns: {
            ...filterFns,
            dateRange: (row, columnId, value) => {
                if (!value || (!value.start && !value.end)) return true
                
                const cellValue = row.getValue(columnId)
                const cellDate = new Date(cellValue)
                const startDate = value.start ? new Date(value.start) : null
                const endDate = value.end ? new Date(value.end) : null
                
                if (startDate && endDate) {
                    return cellDate >= startDate && cellDate <= endDate
                } else if (startDate) {
                    return cellDate >= startDate
                } else if (endDate) {
                    return cellDate <= endDate
                }
                return true
            },
            exactDate: (row, columnId, value) => {
                if (!value) return true
                
                const cellValue = row.getValue(columnId)
                const cellDate = new Date(cellValue)
                const filterDate = new Date(value)
                
                return cellDate.toDateString() === filterDate.toDateString()
            }
        },
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