import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import AllMembersFilter from "./AllMembersFilter"
import MembersReportExport from "./MembersReportExport"
import { toast } from "sonner"

const AllMembersTableToolbar = ({ table, data, onCleanup }) => {
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
                    if (onCleanup) onCleanup()
                } else {
                    toast.info('لا توجد أعضاء معلقة')
                }
            }
        } catch (error) {
            console.error('خطأ في تنظيف الأعضاء:', error)
            toast.error('حدث خطأ أثناء تنظيف الأعضاء')
        }
    }

    return (
        <div className="flex items-center gap-4 justify-between py-4">
            <Input
                placeholder="بحث ..."
                value={table.getState().globalFilter ?? ""}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                className="max-w-sm !ring-0"
            />
            <div className="flex items-center gap-2">
                <AllMembersFilter table={table} data={data} />
                <MembersReportExport data={data} />
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={cleanupOrphanedMembers}
                    className="text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                    <Icon icon="material-symbols:cleaning-services" className="mr-2" />
                    تنظيف الأعضاء المعلقة
                </Button>
            </div>
        </div>
    )
}

export default AllMembersTableToolbar

