import { Input } from "@/components/ui/input"
import MembersFilter from "./MembersFilter"
import MembersReportExport from "./MembersReportExport"
import AddMember from "./AddMember"

const MembersTableToolbar = ({ table, data }) => {
    return (
        <div className="flex items-center gap-4 justify-between py-4">
            <Input
                placeholder="بحث ..."
                // value={(table.getColumn("delegationHead")?.getFilterValue()) ?? ""}
                // onChange={(event) =>table.getColumn("delegationHead")?.setFilterValue(event.target.value)}
                value={table.getState().globalFilter ?? ""}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                className="max-w-sm !ring-0"
            />
            <div className="flex items-center gap-2">
                <MembersFilter table={table} data={data} />
                <MembersReportExport data={data} />
                <AddMember />
            </div>
        </div>
    )
}

export default MembersTableToolbar