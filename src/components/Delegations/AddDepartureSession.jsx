import { useState } from 'react'
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
import { Icon } from "@iconify/react/dist/iconify.js"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "sonner"
import { useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { hallOptions } from "../../constants"
import MembersSelector from './MembersSelector'

const AddDepartureSession = ({ delegation, onAdd, remainingMembers }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState([])

    const validationSchema = yup.object({
        date: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        time: yup.string()
            .required("هذا الحقل لا يمكن ان يكون فارغا")
            .matches(/^[0-9]{4}$/, "يجب أن يكون الوقت بصيغة HHMM (مثل: 1430)"),
        hall: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        airline: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        flightNumber: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        destination: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        receptor: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        shipments: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
    })

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            date: "",
            time: "",
            hall: "",
            airline: "",
            flightNumber: "",
            destination: "",
            receptor: "",
            shipments: "",
            notes: "",
        }
    })

    const onSubmit = handleSubmit((data) => {
        if (selectedMembers.length === 0) {
            toast.error("يجب اختيار عضو واحد على الأقل")
            return
        }

        if (remainingMembers === 0) {
            toast.error("لا يوجد أعضاء متاحين للمغادرة")
            return
        }

        // تحويل IDs إلى member objects كاملة
        const memberObjects = selectedMembers.map(memberId => {
            // البحث عن العضو في localStorage
            try {
                const savedMembers = localStorage.getItem('members')
                if (savedMembers) {
                    const members = JSON.parse(savedMembers)
                    return members.find(member => member.id === memberId)
                }
            } catch (error) {
                console.error('خطأ في تحميل بيانات الأعضاء:', error)
            }
            return null
        }).filter(member => member !== null)

        const newSession = {
            id: `dep_${Date.now()}`,
            date: data.date,
            time: data.time,
            hall: data.hall,
            airline: data.airline,
            flightNumber: data.flightNumber,
            destination: data.destination,
            receptor: data.receptor,
            shipments: data.shipments,
            members: memberObjects, // حفظ member objects كاملة
            notes: data.notes || ""
        }

        setLoading(true)
        
        // تحديث حالة الأعضاء في localStorage فوراً (بدون setTimeout)

        try {
            const savedMembers = localStorage.getItem('members')
            if (savedMembers) {
                const members = JSON.parse(savedMembers)

                
                const updatedMembers = members.map(member => {
                    if (selectedMembers.includes(member.id)) {

                        return { 
                            ...member, 
                            memberStatus: 'departed',
                            departureDate: data.date // تحديث تاريخ المغادرة
                        }
                    }
                    return member
                })
                localStorage.setItem('members', JSON.stringify(updatedMembers))
                
                // إرسال events لتحديث المكونات
                window.dispatchEvent(new CustomEvent('memberUpdated'))
                window.dispatchEvent(new CustomEvent('localStorageUpdated'))
            }
        } catch (error) {
            console.error('خطأ في تحديث حالة الأعضاء:', error)
        }
        
        setTimeout(() => {
            onAdd(newSession)
            toast.success("تم إضافة جلسة مغادرة جديدة")
            reset()
            setSelectedMembers([])
            setLoading(false)
            setOpen(false)
        }, 1500)
    })

    useEffect(() => {
        if (open) {
            reset()
            setSelectedMembers([])
        }
    }, [open, reset])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="cursor-pointer" 
                    disabled={remainingMembers === 0}
                    title={remainingMembers === 0 ? "لا يوجد أعضاء متاحين للمغادرة" : ""}
                >
                    <Icon icon="qlementine-icons:plus-16" />
                    <span>إضافة جلسة مغادرة</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] [&_[data-slot='dialog-close']]:!right-[95%] overflow-auto">
                <DialogHeader className="!text-start !py-2">
                    <DialogTitle>إضافة جلسة مغادرة جديدة</DialogTitle>
                    <DialogDescription>
                        يمكنك إضافة جلسة مغادرة جديدة للوفد {delegation.nationality}. 
                        الأعضاء المتاحون للمغادرة: {remainingMembers}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4">
                        {/* تفاصيل الرحلة */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="date">التاريخ</Label>
                                <input type="date" id="date" name="date" style={{ direction: 'ltr' }} {...register('date')} />
                                {errors.date && <span className="text-sm text-rose-400 block">{errors.date.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="time">سعت (HHMM)</Label>
                                <input 
                                    type="text" 
                                    id="time" 
                                    name="time" 
                                    {...register('time')} 
                                    placeholder="1430"
                                    maxLength="4"
                                    pattern="[0-9]{4}"
                                    onInput={(e) => {
                                        // إزالة أي حروف غير الأرقام
                                        let value = e.target.value.replace(/[^0-9]/g, '');
                                        // تحديد الحد الأقصى لـ 4 أرقام
                                        if (value.length > 4) {
                                            value = value.substring(0, 4);
                                        }
                                        e.target.value = value;
                                    }}
                                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-neutral-50 focus:bg-white"
                                />
                                {errors.time && <span className="text-sm text-rose-400 block">{errors.time.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="hall">المطار</Label>
                                <Select dir='rtl' value={watch('hall')} onValueChange={val => setValue('hall', val, { shouldValidate: true })}>
                                    <SelectTrigger className="w-full !ring-0">
                                        <SelectValue placeholder="اختر المطار" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hallOptions.map((option, index) => (
                                            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.hall && <span className="text-sm text-rose-400 block">{errors.hall.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="airline">شركة الطيران</Label>
                                <input type="text" id="airline" name="airline" placeholder="ادخل شركة الطيران" {...register('airline')} />
                                {errors.airline && <span className="text-sm text-rose-400 block">{errors.airline.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="flightNumber">رقم الرحلة</Label>
                                <input type="text" id="flightNumber" name="flightNumber" placeholder="ادخل رقم الرحلة" {...register('flightNumber')} />
                                {errors.flightNumber && <span className="text-sm text-rose-400 block">{errors.flightNumber.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="destination">وجهة الرحلة</Label>
                                <input type="text" id="destination" name="destination" placeholder="ادخل وجهة الرحلة" {...register('destination')} />
                                {errors.destination && <span className="text-sm text-rose-400 block">{errors.destination.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="receptor">المودع</Label>
                                <input type="text" id="receptor" name="receptor" placeholder="ادخل اسم المودع" {...register('receptor')} />
                                {errors.receptor && <span className="text-sm text-rose-400 block">{errors.receptor.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="shipments">الشحنات</Label>
                                <input type="text" id="shipments" name="shipments" placeholder="ادخل الشحنات" {...register('shipments')} />
                                {errors.shipments && <span className="text-sm text-rose-400 block">{errors.shipments.message}</span>}
                            </div>
                        </div>

                        <div className="grid gap-3 w-full">
                            <Label htmlFor="notes">ملاحظات</Label>
                            <textarea 
                                id="notes" 
                                name="notes" 
                                placeholder="ادخل أي ملاحظات إضافية" 
                                rows={3}
                                {...register('notes')} 
                            />
                        </div>

                        {/* اختيار الأعضاء */}
                        <div className="grid gap-3 w-full">
                            <Label>اختيار الأعضاء المغادرين</Label>
                            <MembersSelector 
                                delegation={delegation}
                                selected={selectedMembers}
                                onChange={setSelectedMembers}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} variant="outline" className="cursor-pointer">الغاء</Button>
                        </DialogClose>
                        <Button disabled={loading} type="button" className="cursor-pointer" onClick={onSubmit}>
                            {loading ? (
                                <>
                                    <Icon icon="jam:refresh" className="animate-spin" />
                                    <span>إضافة ...</span>
                                </>
                            ) : (
                                <span>إضافة جلسة مغادرة</span>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddDepartureSession
