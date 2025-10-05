import { useState, useMemo } from "react"
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"
import DataTable from "../components/DataTable"
import AllMembersTableToolbar from "../components/Members/AllMembersTableToolbar"
import { members } from "../data"

const AllMembers = () => {
    const [data] = useState(members)
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo(
        () => {
            const cols = [
            {
                accessorKey: "memberStatus",
                header: () => <div className="text-start">حالة العضو</div>,
                cell: ({ row }) => {
                    const status = row.getValue("memberStatus")
                    let statusIcon = ""
                    let iconColor = ""
                    
                    switch(status) {
                        case "departed":
                            statusIcon = "material-symbols:check-circle"
                            iconColor = "text-green-600"
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
                        <div className="flex items-center gap-2">
                            <Icon icon={statusIcon} fontSize={20} className={iconColor} />
                        </div>
                    )
                },
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    const status = row.getValue(columnId)
                    return status && status.toLowerCase().includes(filterValue.toLowerCase())
                },
            },
            {
                accessorKey: "rank",
                header: () => <div className="text-start">الرتبة</div>,
                cell: ({ row }) => (
                    <span className="text-gray-700">{row.getValue("rank")}</span>
                ),
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    const rank = row.getValue(columnId)
                    return rank && rank.toLowerCase().includes(filterValue.toLowerCase())
                },
            },
            {
                accessorKey: "name",
                header: () => <div className="text-start">الاسم</div>,
                cell: ({ row }) => (
                    <span className="font-medium">{row.getValue("name")}</span>
                ),
            },
            {
                accessorKey: "role",
                header: () => <div className="text-start">الدور</div>,
                cell: ({ row }) => (
                    <span className="text-gray-700">{row.getValue("role")}</span>
                ),
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    const role = row.getValue(columnId)
                    return role && role.toLowerCase().includes(filterValue.toLowerCase())
                },
            },
            {
                accessorKey: "job",
                header: () => <div className="text-start">الوظيفة</div>,
                cell: ({ row }) => (
                    <span className="text-gray-700">{row.getValue("job") || "غير محدد"}</span>
                ),
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    const job = row.getValue(columnId)
                    return job && job.toLowerCase().includes(filterValue.toLowerCase())
                },
            },
            {
                accessorKey: "delegation.delegationHead",
                header: () => <div className="text-start">اسم الوفد</div>,
                cell: ({ row }) => {
                    const delegationData = row.original.delegation
                    if (delegationData && delegationData.nationality && delegationData.delegationHead) {
                        return (
                            <span className="text-gray-700">
                                {delegationData.nationality} - {delegationData.delegationHead}
                            </span>
                        )
                    }
                    return <span className="text-gray-400">بدون وفد</span>
                },
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    
                    const delegationData = row.original.delegation
                    if (!delegationData || !delegationData.nationality || !delegationData.delegationHead) {
                        return false
                    }
                    
                    const delegationDisplayName = `${delegationData.nationality} - ${delegationData.delegationHead}`
                    return delegationDisplayName.toLowerCase().includes(filterValue.toLowerCase())
                },
            },
            {
                accessorKey: "arrivalDate",
                header: () => <div className="text-start">تاريخ الوصول</div>,
                cell: ({ row }) => (
                    <span className="text-gray-700">{row.getValue("arrivalDate") || "غير محدد"}</span>
                ),
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    
                    const rowDateString = row.getValue(columnId)
                    if (!rowDateString) return false
                    
                    const rowDate = new Date(rowDateString)
                    if (isNaN(rowDate.getTime())) return false
                    
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
                accessorKey: "departureDate",
                header: () => <div className="text-start">تاريخ المغادرة</div>,
                cell: ({ row }) => {
                    const departureDate = row.getValue("departureDate")
                    return (
                        <span className="text-gray-700">{departureDate || "لم يغادر"}</span>
                    )
                },
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    
                    const rowDateString = row.getValue(columnId)
                    if (!rowDateString) return false
                    
                    const rowDate = new Date(rowDateString)
                    if (isNaN(rowDate.getTime())) return false
                    
                    // Single date filter
                    if (typeof filterValue === 'string') {
                        const filterDate = new Date(filterValue)
                        if (isNaN(filterDate.getTime())) return false
                        return rowDate.toDateString() === filterDate.toDateString()
                    }
                    
                    return true
                },
            },
        ]
            return cols
        },
        []
    )

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
        globalFilterFn: 'includesString',
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    })

    // حساب الإحصائيات
    const totalMembers = data.length
    const departedMembers = data.filter(member => member.memberStatus === "departed").length
    const notDepartedMembers = data.filter(member => member.memberStatus === "not_departed").length

    return (
        <div className="p-6 space-y-6">

            {/* Statistics Cards */}
            <div className="flex gap-2 justify-between">
                <div className="box w-full bg-white p-6 rounded-2xl border border-neutral-300 flex items-center gap-2 justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-neutral-600">إجمالي الأعضاء</span>
                        <h2 className="text-blue-700 font-bold text-5xl">{totalMembers}</h2>
                        <span className="text-neutral-400 text-xs">
                            اخر تحديث منذ {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 grid place-items-center">
                        <Icon icon="fa:users" fontSize={28} className="text-blue-600" />
                    </div>
                </div>
                <div className="box w-full bg-white p-6 rounded-2xl border border-neutral-300 flex items-center gap-2 justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-neutral-600">الأعضاء المغادرين</span>
                        <h2 className="text-green-700 font-bold text-5xl">{departedMembers}</h2>
                        <span className="text-neutral-400 text-xs">
                            اخر تحديث منذ {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 grid place-items-center">
                        <Icon icon="material-symbols:check-circle" fontSize={28} className="text-green-600" />
                    </div>
                </div>
                <div className="box w-full bg-white p-6 rounded-2xl border border-neutral-300 flex items-center gap-2 justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-neutral-600">الأعضاء الذين لم يغادروا</span>
                        <h2 className="text-red-700 font-bold text-5xl">{notDepartedMembers}</h2>
                        <span className="text-neutral-400 text-xs">
                            اخر تحديث منذ {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-100 grid place-items-center">
                        <Icon icon="material-symbols:cancel" fontSize={28} className="text-red-600" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className='border p-4 mt-8 border-neutral-300 rounded-2xl bg-white'>
                <AllMembersTableToolbar table={table} data={data} />
                <DataTable table={table} columns={columns} clickableRow={false} />
            </div>
        </div>
    )
}

export default AllMembers
