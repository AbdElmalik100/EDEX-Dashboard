import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { moveTypeOptions } from "../../constants"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const DelegationFilter = ({ table, data }) => {
    const [filters, setFilters] = useState({
        nationality: '',
        destination: '',
        moveType: '',
        date: '',
        startDate: '',
        endDate: '',
    })

    const applyFilter = (val, fieldName) => {
        table.getColumn(fieldName)?.setFilterValue(val === "" ? undefined : val)
        setFilters({ ...filters, [fieldName]: val })
    }

    const applyDateRangeFilter = (start, end) => {
        const range = (!start && !end) ? undefined : { start: new Date(start).toLocaleDateString(), end: new Date(end).toLocaleDateString() }
        table.getColumn("date")?.setFilterValue(range)
        setFilters({ ...filters, startDate: start, endDate: end, date: '' })        
    }

    const clearFilter = () => {
        setFilters({
            nationality: '',
            destination: '',
            moveType: '',
            date: '',
            startDate: '',
            endDate: '',
        })
        table.resetColumnFilters()
    }
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="mr-auto !ring-0">
                    <Icon icon={'fluent:filter-32-filled'} />
                    <span>فلتر</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="end">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">فلتر</h4>
                        <p className="text-muted-foreground text-sm">
                            يمكنك تصفية الجدول حسب هذة الاعمدة.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4 w-full">
                            <Label htmlFor="width">الجنسية</Label>
                            <Select dir='rtl' value={filters.nationality} onValueChange={val => applyFilter(val, 'nationality')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="الجنسية" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        data
                                            .map(el => el[table.getColumn("nationality").id])
                                            .map((nationality, index) => (
                                                <SelectItem key={index} value={nationality} >{nationality}</SelectItem>
                                            ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">وجهة الرحلة</Label>
                            <Select dir='rtl' value={filters.destination} onValueChange={val => applyFilter(val, 'destination')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="وجهة الرحلة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        data
                                            .map(el => el[table.getColumn("destination").id])
                                            .map((destination, index) => (
                                                <SelectItem key={index} value={destination}>{destination}</SelectItem>
                                            ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">نوع الحركة</Label>
                            <Select dir='rtl' value={filters.moveType} onValueChange={val => applyFilter(val, 'moveType')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="نوع الحركة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        moveTypeOptions.map((option, index) => (
                                            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">التاريخ</Label>
                            <input 
                                className="col-span-2" 
                                type="date" 
                                id="date" 
                                name="date" 
                                value={filters.date} 
                                onChange={(e) => {
                                    const formattedDate = e.target.value
                                    setFilters({ ...filters, date: formattedDate, startDate: '', endDate: '' });
                                    table.getColumn('date')?.setFilterValue(formattedDate === "" ? undefined : new Date(formattedDate).toLocaleDateString())
                                }} 
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="date">التاريخ من / الي</Label>
                            <div className="col-span-2 flex gap-2">
                                <input
                                    className="w-full border rounded px-2 py-1"
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => applyDateRangeFilter(e.target.value, filters.endDate)}
                                />
                                <input
                                    className="w-full border rounded px-2 py-1"
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => applyDateRangeFilter(filters.startDate, e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {isFiltered && <Button className="w-full cursor-pointer" onClick={clearFilter}>حذف جميع الفلاتر</Button>}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DelegationFilter