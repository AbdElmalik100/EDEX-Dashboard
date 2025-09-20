import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
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
import DeletePopup from "../DeletePopup"
import MembersTableToolbar from "./MembersTableToolbar"

const data = [
    {
        id: "m5gr8419",
        rank: 'عقيد',
        name: "احمد عبدالمنعم ",
        role: "رئيس الوفد",
        nationality: "امريكي",
    },
    {
        id: "m5gr8419",
        rank: 'مقدم',
        name: "احمد عباس",
        role: "رئيس الوفد",
        nationality: "امريكي",
    },
    {
        id: "m5gr8419",
        rank: 'نقيب',
        name: "محمود احمد خالد",
        role: "مسافر",
        nationality: "امريكي",
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
        accessorKey: "rank",
        header: () => <div className="text-start">الجنسية</div>,
    },
    {
        accessorKey: "name",
        header: () => <div className="text-start">عدد الاعضاء</div>,
    },
    {
        accessorKey: "role",
        header: () => <div className="text-start">المطار</div>,
    },
    {
        accessorKey: "nationality",
        header: () => <div className="text-start">الجنسية</div>,
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
const Members = () => {
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
        <div className='border p-4 mt-8 border-neutral-300 rounded-2xl bg-white'>
            <MembersTableToolbar table={table} data={data} />
            <DataTable table={table} columns={columns} />
        </div >
    )
}

export default Members