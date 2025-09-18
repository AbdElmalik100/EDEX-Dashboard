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
    })

    const applyFilter = (val, fieldName) => {
        table.getColumn(fieldName)?.setFilterValue(val === "" ? undefined : val)
        setFilters({ ...filters, [fieldName]: val })
    }

    const clearFilter = () => {
        setFilters({
            nationality: '',
            destination: '',
            moveType: '',
            date: '',
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
            <PopoverContent className="w-80" align="end">
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
                                            .map(el => ({ label: el[table.getColumn("nationality").id], value: el[table.getColumn("nationality").id] }))
                                            .map((option, index) => (
                                                <SelectItem key={index} value={option.value} >{option.label}</SelectItem>
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
                                            .map(el => ({ label: el[table.getColumn("destination").id], value: el[table.getColumn("destination").id] }))
                                            .map((option, index) => (
                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
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
                            {/* <Select dir='rtl' value={filters.moveType} onValueChange={val => applyFilter(val, 'date')}>
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
                            </Select> */}
                            <input className="col-span-2" type="date" id="date" name="date" value={filters.date} onChange={e => {
                                setFilters({...filters, date: new Date(e.target.value).toLocaleDateString()})
                                console.log(new Date(e.target.value).toLocaleDateString())
                                applyFilter(new Date(e.target.value).toLocaleDateString(), 'date')
                            }} />
                        </div>
                    </div>
                    {isFiltered && <Button className="w-full cursor-pointer" onClick={clearFilter}>حذف جميع الفلاتر</Button>}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DelegationFilter