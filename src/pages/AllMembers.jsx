import { useState, useMemo, useEffect } from "react"
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import DataTable from "../components/DataTable"
import AllMembersTableToolbar from "../components/Members/AllMembersTableToolbar"
import DeletePopup from "../components/DeletePopup"
import EditMember from "../components/Members/EditMember"
import { members } from "../data"
import { toast } from "sonner"

const AllMembers = () => {
    const [data, setData] = useState([])
    
    // دالة تنظيف الأعضاء المعلقة
    const cleanupOrphanedMembers = () => {
        try {
            const savedDelegations = localStorage.getItem('delegations')
            const savedMembers = localStorage.getItem('members')
            
            if (savedDelegations && savedMembers) {
                const delegations = JSON.parse(savedDelegations)
                const members = JSON.parse(savedMembers)
                
                const delegationIds = delegations.map(d => d.id)
                const validMembers = members.filter(member => {
                    if (member.delegation && member.delegation.id) {
                        return delegationIds.includes(member.delegation.id)
                    }
                    return true
                })
                
                const deletedCount = members.length - validMembers.length
                
                if (deletedCount > 0) {
                    localStorage.setItem('members', JSON.stringify(validMembers))
                    window.dispatchEvent(new CustomEvent('memberDeleted'))
                    toast.success(`تم حذف ${deletedCount} عضو معلق`)
                    loadMembers() // إعادة تحميل البيانات
                } else {
                    toast.info('لا توجد أعضاء معلقة')
                }
            }
        } catch (error) {
            console.error('خطأ في تنظيف الأعضاء:', error)
            toast.error('حدث خطأ أثناء تنظيف الأعضاء')
        }
    }
    
    // تحميل الأعضاء من localStorage
    useEffect(() => {
        const loadMembers = () => {

            const savedMembers = localStorage.getItem('members')
            const savedDelegations = localStorage.getItem('delegations')

            
            if (savedMembers && savedMembers !== '[]') {
                try {
                    const parsedMembers = JSON.parse(savedMembers)
                    const parsedDelegations = savedDelegations ? JSON.parse(savedDelegations) : []

                    
                    // تحديث حالة الأعضاء بناءً على جلسات المغادرة
                    const updatedMembers = parsedMembers.map(member => {
                        if (member.delegation && member.delegation.id) {
                            const delegation = parsedDelegations.find(d => d.id === member.delegation.id)
                            if (delegation && delegation.departureInfo && delegation.departureInfo.departureSessions) {
                                // البحث عن العضو في جلسات المغادرة
                                let departureDate = null
                                let isInDepartureSession = false
                                
                                for (const session of delegation.departureInfo.departureSessions) {
                                    const memberInSession = session.members.find(sessionMember => {
                                        if (typeof sessionMember === 'object' && sessionMember.id) {
                                            return sessionMember.id === member.id
                                        }
                                        return sessionMember === member.id
                                    })
                                    
                                    if (memberInSession) {
                                        isInDepartureSession = true
                                        departureDate = session.date
                                        break
                                    }
                                }
                                
                                return {
                                    ...member,
                                    memberStatus: isInDepartureSession ? "departed" : "not_departed",
                                    departureDate: departureDate
                                }
                            }
                        }
                        return { ...member, memberStatus: "not_departed", departureDate: null }
                    })
                    
                    // عرض بيانات الوفد لكل عضو
                    updatedMembers.forEach(member => {
                        if (member.delegation) {

                        }
                    })
                    
                    if (Array.isArray(updatedMembers)) {
                        setData(updatedMembers)

                    } else {
                        setData([])
                    }
                } catch (error) {
                    console.error('خطأ في تحليل بيانات الأعضاء:', error)
                    setData([])
                }
            } else {

                setData([])
            }
        }
        
        loadMembers()
        
        // الاستماع لتغييرات localStorage
        const handleStorageChange = () => {
            loadMembers()
        }
        
        window.addEventListener('storage', handleStorageChange)
        
        // فحص دوري للتغييرات (للتطوير)
        const interval = setInterval(loadMembers, 1000)
        
        // إضافة event listener للتحديث عند إضافة عضو جديد
        const handleMemberAdded = () => {
            loadMembers()
        }
        
        window.addEventListener('memberAdded', handleMemberAdded)
        
        // إضافة event listener للتحديث عند تغيير localStorage
        const handleStorageUpdate = () => {
            loadMembers()
        }
        
        window.addEventListener('storage', handleStorageUpdate)
        
        // إضافة event listener إضافي
        const handleLocalStorageUpdate = () => {
            loadMembers()
        }
        
        window.addEventListener('localStorageUpdated', handleLocalStorageUpdate)
        
        // إضافة event listener لحذف العضو
        const handleMemberDeleted = () => {
            loadMembers()
        }
        
        window.addEventListener('memberDeleted', handleMemberDeleted)
        
        // إضافة event listener لتحديث العضو
        const handleMemberUpdated = () => {
            loadMembers()
        }
        
        window.addEventListener('memberUpdated', handleMemberUpdated)
        
        // إضافة event listener لتحديث الوفد
        const handleDelegationUpdated = () => {
            loadMembers()
        }
        
        window.addEventListener('delegationUpdated', handleDelegationUpdated)
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('storage', handleStorageUpdate)
            window.removeEventListener('memberAdded', handleMemberAdded)
            window.removeEventListener('localStorageUpdated', handleLocalStorageUpdate)
            window.removeEventListener('memberDeleted', handleMemberDeleted)
            window.removeEventListener('memberUpdated', handleMemberUpdated)
            window.removeEventListener('delegationUpdated', handleDelegationUpdated)
            clearInterval(interval)
        }
    }, [])
    
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({
        job: false, // إخفاء عمود الوظيفة افتراضياً
        equivalentRole: true // إظهار عمود المنصب المعادل افتراضياً
    })
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo(
        () => {
            const cols = [
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
                        <div className="flex justify-center">
                            <div className="px-1 py-1 rounded-lg text-lg font-medium text-center bg-gray-200 w-fit">
                                <Icon icon={statusIcon} fontSize={20} className={iconColor} />
                            </div>
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
                header: () => <div className="text-center">الرتبة</div>,
                cell: ({ row }) => (
                    <div className="text-center">
                        <span className="text-gray-700">{row.getValue("rank")}</span>
                    </div>
                ),
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    const rank = row.getValue(columnId)
                    return rank && rank.toLowerCase().includes(filterValue.toLowerCase())
                },
            },
            {
                accessorKey: "name",
                header: () => <div className="text-center">الاسم</div>,
                cell: ({ row }) => (
                    <div className="text-center">
                        <span className="font-medium">{row.getValue("name")}</span>
                    </div>
                ),
            },
            {
                accessorKey: "role",
                header: () => <div className="text-center">الوظيفة</div>,
                cell: ({ row }) => (
                    <div className="text-center">
                        <span className="text-gray-700">{row.getValue("role")}</span>
                    </div>
                ),
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    const role = row.getValue(columnId)
                    return role && role.toLowerCase().includes(filterValue.toLowerCase())
                },
            },
            {
                accessorKey: "equivalentRole",
                header: () => <div className="text-center">المنصب العسكري المعادل</div>,
                cell: ({ row }) => (
                    <div className="text-center">
                        <span className="text-gray-700 font-medium">{row.getValue("equivalentRole") || "غير محدد"}</span>
                    </div>
                ),
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    const equivalentRole = row.getValue(columnId)
                    return equivalentRole && equivalentRole.toLowerCase().includes(filterValue.toLowerCase())
                },
            },
            {
                accessorKey: "job",
                header: () => <div className="text-center">ما يعادلها (قديم)</div>,
                cell: ({ row }) => (
                    <div className="text-center">
                        <span className="text-gray-700">{row.getValue("job") || "غير محدد"}</span>
                    </div>
                ),
                filterFn: (row, columnId, filterValue) => {
                    if (!filterValue) return true
                    const job = row.getValue(columnId)
                    return job && job.toLowerCase().includes(filterValue.toLowerCase())
                },
                // إخفاء العمود من العرض
                enableHiding: false,
                meta: {
                    isHidden: true
                }
            },
            {
                accessorKey: "delegation.delegationHead",
                header: () => <div className="text-center">اسم الوفد</div>,
                cell: ({ row }) => {
                    const delegationData = row.original.delegation


                    
                    if (delegationData && delegationData.nationality && delegationData.delegationHead) {
                        const displayText = `${delegationData.nationality} - ${delegationData.delegationHead}`

                        return (
                            <div className="text-center">
                                <span className="text-gray-700">
                                    {displayText}
                                </span>
                            </div>
                        )
                    }

                    return (
                        <div className="text-center">
                            <span className="text-gray-400">بدون وفد</span>
                        </div>
                    )
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
                header: () => <div className="text-center">تاريخ الوصول</div>,
                cell: ({ row }) => (
                    <div className="text-center">
                        <span className="text-gray-700">{row.getValue("arrivalDate") || "غير محدد"}</span>
                    </div>
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
                header: () => <div className="text-center">تاريخ المغادرة</div>,
                cell: ({ row }) => {
                    const departureDate = row.getValue("departureDate")
                    const memberStatus = row.original.memberStatus

                    return (
                        <div className="text-center">
                            <span className="text-gray-700">{departureDate || "لم يغادر"}</span>
                        </div>
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
            {
                id: "actions",
                enableHiding: false,
                header: () => <div className="text-center">الإجراءات</div>,
                cell: ({ row }) => {
                    return (
                        <div className="flex justify-center">
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
                                            <Icon icon={'mynaui:trash'} />
                                            <span>حذف</span>
                                        </DropdownMenuItem>
                                    </DeletePopup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )
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
        <div className="content">
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
        </div>
    )
}

export default AllMembers
