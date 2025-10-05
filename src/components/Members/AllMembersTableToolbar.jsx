import { Input } from "@/components/ui/input"
import AllMembersFilter from "./AllMembersFilter"
import MembersReportExport from "./MembersReportExport"

const AllMembersTableToolbar = ({ table, data }) => {
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
            </div>
        </div>
    )
}

export default AllMembersTableToolbar

