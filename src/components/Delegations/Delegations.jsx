import {
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

const data = [
    {
        id: "m5gr54i9",
        nationality: 'قطري',
        delegationHead: "رائد / احمد الهجري",
        membersCount: "75",
        hall: "صالة 3",
        moveType: "مغادرة",
        date: new Date('9/9/2025').toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        receptor: 'ملازم اول / محمد العجمي',
        destination: 'مغرب',
        shipments: 'لا يوجد',
    },
    {
        id: "m5gr89i9",
        nationality: 'افريقي',
        delegationHead: "رائد / احمد الهجري",
        membersCount: "75",
        hall: "صالة 3",
        moveType: "وصول",
        date: new Date('9/12/2025').toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        receptor: 'ملازم اول / محمد العجمي',
        destination: 'مصر',
        shipments: 'لا يوجد',
    },
    {
        id: "m5gr8419",
        nationality: 'امريكي',
        delegationHead: "رائد / احمد الهجري",
        membersCount: "75",
        hall: "صالة 3",
        moveType: "مغادرة",
        date: new Date('9/12/2025').toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        receptor: 'ملازم اول / محمد العجمي',
        destination: 'سودان',
        shipments: 'لا يوجد',
    },
]


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
        header: () => <div className="text-start">الصالة</div>,
    },
    {
        accessorKey: "moveType",
        header: () => <div className="text-start">نوع الحركة</div>,
    },
    {
        accessorKey: "date",
        header: () => <div className="text-start">التاريخ</div>,
    },
    {
        accessorKey: "time",
        header: () => <div className="text-start">الساعة</div>,
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
        data,
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
        <div className='border p-4 border-neutral-300 rounded-2xl bg-white'>
            <DelegationTableToolbar table={table} data={data} />
            <DataTable table={table} columns={columns} />
        </div >
    )
}

export default Delegations