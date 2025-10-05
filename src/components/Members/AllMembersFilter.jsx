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

const AllMembersFilter = ({ table, data }) => {
    const [filters, setFilters] = useState({
        rank: '',
        role: '',
        job: '',
        memberStatus: '',
        delegation: '',
        arrivalDate: '',
        departureDate: '',
    })

    const applyFilter = (val, fieldName) => {
        table.getColumn(fieldName)?.setFilterValue(val === "" ? undefined : val)
        setFilters({ ...filters, [fieldName]: val })
    }

    const applyDelegationFilter = (val) => {
        if (val === "") {
            table.getColumn("delegation_delegationHead")?.setFilterValue(undefined)
        } else {
            table.getColumn("delegation_delegationHead")?.setFilterValue(val)
        }
        setFilters({ ...filters, delegation: val })
    }


    const clearFilter = () => {
        setFilters({
            rank: '',
            role: '',
            job: '',
            memberStatus: '',
            delegation: '',
            arrivalDate: '',
            departureDate: '',
        })
        table.resetColumnFilters()
    }

    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <Popover modal={false}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="mr-auto !ring-0">
                    <Icon icon={'fluent:filter-32-filled'} />
                    <span>فلتر</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="end" side="bottom" sideOffset={5} avoidCollisions={false} forceMount>
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">فلتر</h4>
                        <p className="text-muted-foreground text-sm">
                            يمكنك تصفية الجدول حسب هذة الاعمدة.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        {/* الرتبة */}
                        <div className="grid grid-cols-3 items-center gap-4 w-full">
                            <Label htmlFor="rank">الرتبة</Label>
                            <Select dir='rtl' value={filters.rank} onValueChange={val => applyFilter(val, 'rank')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="الرتبة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        [...new Set(data.map(el => el.rank))]
                                            .map((rank, index) => (
                                                <SelectItem key={index} value={rank}>
                                                    {rank}
                                                </SelectItem>
                                            ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        {/* الدور */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="role">الوظيفة</Label>
                            <Select dir='rtl' value={filters.role} onValueChange={val => applyFilter(val, 'role')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="الوظيفة" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="رئيس الوفد">رئيس الوفد</SelectItem>
                                    <SelectItem value="مسافر">مسافر</SelectItem>
                                    <SelectItem value="مرافق">مرافق</SelectItem>
                                    <SelectItem value="مترجم">مترجم</SelectItem>
                                    <SelectItem value="طبيب">طبيب</SelectItem>
                                    <SelectItem value="أمن">أمن</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* الوظيفة */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="job">ما يعادلها</Label>
                            <Select dir='rtl' value={filters.job} onValueChange={val => applyFilter(val, 'job')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="ما يعادلها" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ضابط">ضابط</SelectItem>
                                    <SelectItem value="جندي">جندي</SelectItem>
                                    <SelectItem value="مدني">مدني</SelectItem>
                                    <SelectItem value="دبلوماسي">دبلوماسي</SelectItem>
                                    <SelectItem value="طبيب">طبيب</SelectItem>
                                    <SelectItem value="مهندس">مهندس</SelectItem>
                                    <SelectItem value="مترجم">مترجم</SelectItem>
                                    <SelectItem value="أمن">أمن</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* حالة العضو */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="status">حالة العضو</Label>
                            <Select dir='rtl' value={filters.memberStatus} onValueChange={val => applyFilter(val, 'memberStatus')}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="حالة العضو" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="departed">غادر</SelectItem>
                                    <SelectItem value="not_departed">لم يغادر</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* الوفد */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="delegation">اسم الوفد</Label>
                            <Select dir='rtl' value={filters.delegation} onValueChange={applyDelegationFilter}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="اسم الوفد" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        [...new Set(data.map(el => {
                                            if (el.delegation?.nationality && el.delegation?.delegationHead) {
                                                return `${el.delegation.nationality} - ${el.delegation.delegationHead}`
                                            }
                                            return null
                                        }).filter(Boolean))]
                                            .map((delegationDisplayName, index) => (
                                                <SelectItem key={index} value={delegationDisplayName}>
                                                    {delegationDisplayName}
                                                </SelectItem>
                                            ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        {/* تاريخ الوصول */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="arrivalDate">تاريخ الوصول</Label>
                            <input 
                                className="col-span-2 !ring-0" 
                                type="date" 
                                id="arrivalDate" 
                                name="arrivalDate" 
                                value={filters.arrivalDate} 
                                onChange={(e) => {
                                    const formattedDate = e.target.value
                                    setFilters({ ...filters, arrivalDate: formattedDate });
                                    table.getColumn('arrivalDate')?.setFilterValue(formattedDate === "" ? undefined : formattedDate)
                                }} 
                            />
                        </div>

                        {/* تاريخ المغادرة */}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="departureDate">تاريخ المغادرة</Label>
                            <input 
                                className="col-span-2 !ring-0" 
                                type="date" 
                                id="departureDate" 
                                name="departureDate" 
                                value={filters.departureDate} 
                                onChange={(e) => {
                                    const formattedDate = e.target.value
                                    setFilters({ ...filters, departureDate: formattedDate });
                                    table.getColumn('departureDate')?.setFilterValue(formattedDate === "" ? undefined : formattedDate)
                                }} 
                            />
                        </div>

                    </div>
                    {isFiltered && <Button className="w-full cursor-pointer" onClick={clearFilter}>حذف جميع الفلاتر</Button>}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default AllMembersFilter
