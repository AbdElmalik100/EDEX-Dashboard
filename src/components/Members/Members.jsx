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
import { useState, useEffect } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import DataTable from "../DataTable"
import DeletePopup from "../DeletePopup"
import EditMember from "./EditMember"
import MembersTableToolbar from "./MembersTableToolbar"
import { members } from "../../data"

export const columns = [
    {
        accessorKey: "memberStatus",
        header: () => <div className="text-center">حالة العضو</div>,
        cell: ({ row }) => {
            const status = row.getValue("memberStatus")
            let statusIcon = ""
            let iconColor = ""
            
            switch(status) {
                case "departed":
                    statusIcon = "material-symbols:check-circle"
                    iconColor = "text-lime-600"
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
                <div className="flex justify-center">
                    <Icon icon={statusIcon} fontSize={20} className={iconColor} />
                </div>
            )
        },
    },
    {
        accessorKey: "rank",
        header: () => <div className="text-center">الرتبة</div>,
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center">الاسم</div>,
    },
    {
        accessorKey: "role",
        header: () => <div className="text-center">الدور</div>,
    },
    {
        accessorKey: "equivalentRole",
        header: () => <div className="text-center">الوظيفة المعادلة</div>,
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true
            const equivalentRole = row.getValue(columnId)
            return equivalentRole && equivalentRole.toLowerCase().includes(filterValue.toLowerCase())
        },
        enableHiding: false,
        meta: {
            isHidden: true
        }
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
                        <EditMember member={row.original}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Icon icon={'material-symbols:edit-outline-rounded'} />
                                <span>تعديل</span>
                            </DropdownMenuItem>
                        </EditMember>
                        <DeletePopup item={row}>
                            <DropdownMenuItem variant="destructive" onSelect={e => e.preventDefault()}>
                                <Icon icon={'material-symbols:delete-outline-rounded'} />
                                <span>حذف</span>
                            </DropdownMenuItem>
                        </DeletePopup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

const Members = ({ members: data = [], showDelegationInfo = false }) => {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("")

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
            <MembersTableToolbar table={table} data={data} showDelegationInfo={showDelegationInfo} />
            <DataTable table={table} columns={columns} clickableRow={true} />
        </div>
    )
}

export default Members
