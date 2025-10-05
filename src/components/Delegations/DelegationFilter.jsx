import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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
        delegationStatus: '',
        date: '',
        startDate: '',
        endDate: '',
    })


    const applyFilter = (val, fieldName) => {
        table.getColumn(fieldName)?.setFilterValue(val === "" ? undefined : val)
        setFilters({ ...filters, [fieldName]: val })
    }

    const applyDateRangeFilter = (start, end) => {
        setFilters({ ...filters, startDate: start, endDate: end, date: '' })
        
        // تطبيق فلتر النطاق الزمني
        if (!start && !end) {
            const column = table.getColumn('arrivalInfo_arrivalDate')
            if (column) {
                column.setFilterValue(undefined)
            }
        } else {
            // التأكد من أن التواريخ صحيحة قبل تطبيق الفلتر
            const startDate = start ? new Date(start) : null
            const endDate = end ? new Date(end) : null
            
            if ((!start || !isNaN(startDate.getTime())) && (!end || !isNaN(endDate.getTime()))) {
                const column = table.getColumn('arrivalInfo_arrivalDate')
                if (column) {
                    column.setFilterValue({ 
                        start: start, 
                        end: end 
                    })
                }
            }
        }
    }

    const clearFilter = () => {
        setFilters({
            nationality: '',
            destination: '',
            delegationStatus: '',
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
                            <Label htmlFor="maxWidth">وجهة الوصول</Label>
                            <Select dir='rtl' value={filters.destination} onValueChange={val => applyFilter(val, 'arrivalInfo.arrivalDestination')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="وجهة الوصول" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        data
                                            .map(el => el.arrivalInfo?.arrivalDestination)
                                            .filter(Boolean)
                                            .map((destination, index) => (
                                                <SelectItem key={index} value={destination}>{destination}</SelectItem>
                                            ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">حالة الوفد</Label>
                            <Select dir='rtl' value={filters.delegationStatus} onValueChange={val => applyFilter(val, 'delegationStatus')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="حالة الوفد" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all_departed">تم مغادرة الوفد</SelectItem>
                                    <SelectItem value="partial_departed">لم يغادر جزء من الوفد</SelectItem>
                                    <SelectItem value="not_departed">لم يغادر أحد</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">تاريخ الوصول</Label>
                            <input 
                                className="col-span-2 !ring-0" 
                                type="date" 
                                id="date" 
                                name="date" 
                                value={filters.date} 
                                onChange={(e) => {
                                    const formattedDate = e.target.value
                                    setFilters({ ...filters, date: formattedDate, startDate: '', endDate: '' });
                                    
                                    if (formattedDate === "") {
                                        table.getColumn('arrivalInfo_arrivalDate')?.setFilterValue(undefined)
                                    } else {
                                        // التأكد من أن التاريخ صحيح قبل تطبيق الفلتر
                                        const testDate = new Date(formattedDate)
                                        if (!isNaN(testDate.getTime())) {
                                            const column = table.getColumn('arrivalInfo_arrivalDate')
                                            if (column) {
                                                column.setFilterValue(formattedDate)
                                            }
                                        }
                                    }
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