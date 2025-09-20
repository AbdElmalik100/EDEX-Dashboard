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
import { dateRangeFilter } from "../../utils"
import { delegations } from "../../data"

delegations

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="text-start ps-2">
                <Checkbox
                    className="cursor-pointer"
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-start ps-2">
                <Checkbox
                    className="cursor-pointer"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
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
        accessorKey: "hall",
        header: () => <div className="text-start">المطار</div>,
    },
    {
        accessorKey: "airline",
        header: () => <div className="text-start">شركة الطيران</div>,
    },
    {
        accessorKey: "flightNumber",
        header: () => <div className="text-start">رقم الرحلة</div>,
    },
    {
        accessorKey: "moveType",
        header: () => <div className="text-start">نوع الحركة</div>,
    },
    {
        accessorKey: "date",
        header: () => <div className="text-start">التاريخ</div>,
        filterFn: dateRangeFilter,
    },
    {
        accessorKey: "time",
        header: () => <div className="text-start">سعت</div>,
    },
    {
        accessorKey: "receptor",
        header: () => <div className="text-start">المستقبل</div>,
    },
    {
        accessorKey: "destination",
        header: () => <div className="text-start">وجهة الرحلة</div>,
    },
    {
        accessorKey: "shipments",
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