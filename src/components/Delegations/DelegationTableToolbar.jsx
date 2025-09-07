import AddDelegation from "./AddDelegation"
import { Input } from "@/components/ui/input"
import DelegationReportExport from "./DelegationReportExport"
import DelegationFilter from "./DelegationFilter"


const DelegationTableToolbar = ({ table, data }) => {
    

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
                <DelegationFilter table={table} data={data} />
                <DelegationReportExport data={data} />
                <AddDelegation />
            </div>
        </div>
    )
}

export default DelegationTableToolbar