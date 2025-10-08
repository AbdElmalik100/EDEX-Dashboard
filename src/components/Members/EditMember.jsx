import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { militaryPositions } from "../../utils/militaryPositions"

const EditMember = ({ member, children }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [selectedEquivalentPosition, setSelectedEquivalentPosition] = useState("")
    const [showAddPosition, setShowAddPosition] = useState(false)
    const [newPosition, setNewPosition] = useState("")
    const [availablePositions, setAvailablePositions] = useState(militaryPositions)
    const [searchTerm, setSearchTerm] = useState("")

    const validationSchema = yup.object({
        rank: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        name: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        role: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        equivalentRole: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
    })

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            rank: "",
            name: "",
            role: "",
            equivalentRole: "",
        }
    })

    const handleEquivalentPositionChange = (value) => {
        setSelectedEquivalentPosition(value)
        setValue('equivalentRole', value)
    }

    const handleAddNewPosition = () => {
        if (newPosition.trim() && !availablePositions.includes(newPosition.trim())) {
            const updatedPositions = [...availablePositions, newPosition.trim()].sort((a, b) => a.localeCompare(b, 'ar'))
            setAvailablePositions(updatedPositions)
            setSelectedEquivalentPosition(newPosition.trim())
            setValue('equivalentRole', newPosition.trim())
            setNewPosition("")
            setShowAddPosition(false)
            toast.success("تم إضافة المنصب الجديد بنجاح")
        } else if (availablePositions.includes(newPosition.trim())) {
            toast.error("هذا المنصب موجود بالفعل")
        } else {
            toast.error("يرجى إدخال اسم المنصب")
        }
    }

    // تصفية المناصب حسب البحث
    const filteredPositions = availablePositions.filter(position =>
        position.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const onSubmit = handleSubmit((data) => {
        setLoading(true)
        
        try {
            // جلب الأعضاء الحاليين من localStorage
            const savedMembers = localStorage.getItem('members')
            if (savedMembers) {
                const members = JSON.parse(savedMembers)
                const memberIndex = members.findIndex(m => m.id === member.id)
                
                if (memberIndex !== -1) {
                    // تحديث بيانات العضو
                    members[memberIndex] = {
                        ...members[memberIndex],
                        rank: data.rank,
                        name: data.name,
                        role: data.role,
                        equivalentRole: data.equivalentRole,
                        job: data.equivalentRole, // للتوافق مع النظام الحالي
                    }
                    
                    // حفظ القائمة المحدثة
                    localStorage.setItem('members', JSON.stringify(members))
                    
                    // إرسال event لتحديث الصفحة
                    window.dispatchEvent(new CustomEvent('memberUpdated'))
                    window.dispatchEvent(new CustomEvent('localStorageUpdated'))
                    
                    toast.success('تم تحديث بيانات العضو بنجاح')
                }
            }
        } catch (error) {
            console.error('خطأ في تحديث العضو:', error)
            toast.error('حدث خطأ أثناء تحديث العضو')
        }
        
        setTimeout(() => {
            setLoading(false)
            setOpen(false)
        }, 1500)
    })

    // تحديث البيانات عند فتح الحوار
    useEffect(() => {
        if (open && member) {
            setValue('rank', member.rank || '')
            setValue('name', member.name || '')
            setValue('role', member.role || '')
            setValue('equivalentRole', member.equivalentRole || '')
            setSelectedEquivalentPosition(member.equivalentRole || '')
        }
    }, [open, member, setValue])

    useEffect(() => {
        if (!open) {
            reset()
            setSelectedEquivalentPosition("")
            setShowAddPosition(false)
            setNewPosition("")
            setSearchTerm("")
        }
    }, [open, reset])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] max-h-[675px] [&_[data-slot='dialog-close']]:!right-[95%] overflow-auto">
                <DialogHeader className="!text-start !py-2">
                    <DialogTitle>تعديل بيانات العضو</DialogTitle>
                    <DialogDescription>
                        يمكنك تعديل بيانات العضو من هنا, حينما تنتهي من التعديل قم بضغط حفظ.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4">
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="rank">الرتبة</Label>
                                <input type="text" id="rank" name="rank" placeholder="ادخل رتبة العضو" {...register('rank')} />
                                {errors.rank && <span className="text-sm text-rose-400 block">{errors.rank.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="name">الاسم</Label>
                                <input type="text" id="name" name="name" placeholder="ادخل اسم العضو" {...register('name')} />
                                {errors.name && <span className="text-sm text-rose-400 block">{errors.name.message}</span>}
                            </div>
                        </div>
                        <div className="grid gap-3 w-full">
                            <Label htmlFor="role">الوظيفة المدنية</Label>
                            <input 
                                type="text" 
                                id="role" 
                                name="role" 
                                placeholder="مثال: مهندس، طبيب، محاسب، مدير" 
                                {...register('role')} 
                            />
                            {errors.role && <span className="text-sm text-rose-400 block">{errors.role.message}</span>}
                        </div>
                        
                        <div className="grid gap-3 w-full">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="equivalentRole">المنصب العسكري المعادل</Label>
                                <Button 
                                    type="button"
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setShowAddPosition(!showAddPosition)}
                                    className="text-xs"
                                >
                                    <Icon icon="qlementine-icons:plus-16" fontSize={14} />
                                    <span>إضافة منصب جديد</span>
                                </Button>
                            </div>
                            
                            {showAddPosition && (
                                <div className="flex gap-2 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                                    <input 
                                        type="text" 
                                        placeholder="أدخل اسم المنصب الجديد"
                                        value={newPosition}
                                        onChange={(e) => setNewPosition(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
                                    />
                                    <Button 
                                        type="button"
                                        size="sm"
                                        onClick={handleAddNewPosition}
                                        disabled={!newPosition.trim()}
                                    >
                                        <Icon icon="material-symbols:check" fontSize={16} />
                                    </Button>
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setShowAddPosition(false)
                                            setNewPosition("")
                                        }}
                                    >
                                        <Icon icon="material-symbols:close" fontSize={16} />
                                    </Button>
                                </div>
                            )}
                            
                            <Select value={selectedEquivalentPosition} onValueChange={handleEquivalentPositionChange}>
                                <SelectTrigger className="w-full text-right" dir="rtl">
                                    <SelectValue placeholder="ابحث واختر المنصب العسكري المعادل" />
                                </SelectTrigger>
                                <SelectContent className="text-right" dir="rtl">
                                    <div className="p-2 border-b border-neutral-200">
                                        <input 
                                            type="text" 
                                            placeholder="ابحث في المناصب العسكرية..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        {filteredPositions.length > 0 ? (
                                            filteredPositions.map((position, index) => (
                                                <SelectItem key={index} value={position} className="text-right" dir="rtl">
                                                    {position}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-2 text-sm text-neutral-500 text-center">
                                                لا توجد نتائج للبحث
                                            </div>
                                        )}
                                    </div>
                                </SelectContent>
                            </Select>
                            {errors.equivalentRole && <span className="text-sm text-rose-400 block">{errors.equivalentRole.message}</span>}
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button disabled={loading} variant="outline" className="cursor-pointer">الغاء</Button>
                        </DialogClose>
                        <Button disabled={loading} type="button" className="cursor-pointer" onClick={onSubmit}>
                            {
                                loading
                                    ?
                                    <>
                                        <Icon icon="jam:refresh" className="animate-spin" />
                                        <span>حفظ ...</span>
                                    </>
                                    :
                                    <span>حفظ التغييرات</span>
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditMember
