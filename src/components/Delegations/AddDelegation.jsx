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
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { hallOptions, moveTypeOptions } from "../../constants"

const AddDelegation = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const validationSchema = yup.object({
        nationality: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        delegationHead: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        membersCount: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        hall: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        airline: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        flightNumber: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        moveType: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        date: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        time: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        receptor: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        destination: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        shipments: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
    })


    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            nationality: "",
            delegationHead: "",
            membersCount: null,
            hall: "",
            moveType: "",
            date: new Date().toLocaleDateString('en-CA'),
            time: new Date().toLocaleTimeString('en-GB'),
            receptor: "",
            destination: "",
            shipments: "",
        }
    })


    const onSubmit = handleSubmit((data) => {
        console.log(data);
        setLoading(true)
        setTimeout(() => {
            toast.success("تم اضافة وفد جديد")
            reset()
            setLoading(false)
            setOpen(false)
        }, 3000)
    })

    useEffect(() => reset(), [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer">
                        <Icon icon="qlementine-icons:plus-16" />
                        <span>اضافة وفد جديد</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] max-h-[675px] [&_[data-slot='dialog-close']]:!right-[95%] overflow-auto">
                    <DialogHeader className="!text-start !py-2">
                        <DialogTitle>إضافة وفد جديد</DialogTitle>
                        <DialogDescription>
                            يمكنك اضافة وفد جديد من هنا, حينما تنتهي من ملئ البيانات قم بضغط اضافة.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="nationality">الجنسية</Label>
                                <input type="text" id="nationality" name="nationality" placeholder="ادخل الجنسية" {...register('nationality')} />
                                {errors.nationality && <span className="text-sm text-rose-400 block">{errors.nationality.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="delegationHead">رئيس الوفد</Label>
                                <input type="text" id="delegationHead" name="delegationHead" placeholder="ادخل اسم رئيس الوفد" {...register('delegationHead')} />
                                {errors.delegationHead && <span className="text-sm text-rose-400 block">{errors.delegationHead.message}</span>}
                            </div>
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="membersCount">عدد الاعضاء</Label>
                                <input type="text" id="membersCount" name="membersCount" placeholder="ادخل عدد الاعضاء" {...register('membersCount')} />
                                {errors.membersCount && <span className="text-sm text-rose-400 block">{errors.membersCount.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="hall">المطار</Label>
                                <Select dir='rtl' value={watch('hall')} onValueChange={val => setValue('hall', val, { shouldValidate: true })}>
                                    <SelectTrigger className="w-full !ring-0 col-span-2">
                                        <SelectValue placeholder="اختر المطار" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            hallOptions.map((option, index) => (
                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                {errors.hall && <span className="text-sm text-rose-400 block">{errors.hall.message}</span>}
                            </div>
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="airline">شركة الطيران</Label>
                                <input type="text" id="airline" name="airline" placeholder="ادخل شركة الطيران" {...register('airline')} />
                                {errors.airline && <span className="text-sm text-rose-400 block">{errors.airline.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="flightNumber">رقم الرحلة</Label>
                                <input type="text" id="flightNumber" name="flightNumber" placeholder="ادخل رقم الرحلة" {...register('flightNumber')} />
                                {errors.flightNumber && <span className="text-sm text-rose-400 block">{errors.flightNumber.message}</span>}
                            </div>
                        </div>
                        <div className="grid gap-3 w-full">
                            <Label htmlFor="moveType">نوع الحركة</Label>
                            <Select dir='rtl' value={watch('moveType')} onValueChange={val => setValue('moveType', val, { shouldValidate: true })}>
                                <SelectTrigger className="w-full !ring-0 col-span-2">
                                    <SelectValue placeholder="اختر نوع الحركة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        moveTypeOptions.map((option, index) => (
                                            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            {errors.moveType && <span className="text-sm text-rose-400 block">{errors.moveType.message}</span>}
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="date">التاريخ</Label>
                                <input type="date" id="date" name="date" {...register('date')} />
                                {errors.date && <span className="text-sm text-rose-400 block">{errors.date.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="time">سعت</Label>
                                <input type="time" id="time" name="time" value={watch('time')} {...register('time')} />
                                {errors.time && <span className="text-sm text-rose-400 block">{errors.time.message}</span>}
                            </div>
                        </div>
                        <div className="grid gap-3 w-full">
                            <Label htmlFor="receptor">المستقبل</Label>
                            <input type="text" id="receptor" name="receptor" placeholder="ادخل اسم المستقبل" {...register('receptor')} />
                            {errors.receptor && <span className="text-sm text-rose-400 block">{errors.receptor.message}</span>}
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="destination">وجهة الرحلة</Label>
                                <input type="text" id="destination" name="destination" placeholder="ادخل وجهة الرحلة" {...register('destination')} />
                                {errors.destination && <span className="text-sm text-rose-400 block">{errors.destination.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="shipments">الشحنات</Label>
                                <input type="text" id="shipments" name="shipments" placeholder="ادخل الشحنات" {...register('shipments')} />
                                {errors.shipments && <span className="text-sm text-rose-400 block">{errors.shipments.message}</span>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} variant="outline" className="cursor-pointer">الغاء</Button>
                        </DialogClose>
                        <Button disabled={loading} type="submit" className="cursor-pointer" onClick={onSubmit}>
                            {
                                loading
                                    ?
                                    <>
                                        <Icon icon="jam:refresh" className="animate-spin" />
                                        <span>اضافة ...</span>
                                    </>
                                    :
                                    <span>اضافة</span>
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}


export default AddDelegation