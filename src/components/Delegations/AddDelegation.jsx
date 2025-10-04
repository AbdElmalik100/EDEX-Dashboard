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
import { hallOptions } from "../../constants"

const AddDelegation = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const validationSchema = yup.object({
        nationality: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        delegationHead: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        membersCount: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        arrivalHall: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        arrivalAirline: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        arrivalFlightNumber: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        arrivalDate: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        arrivalTime: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        arrivalReceptor: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        arrivalDestination: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        arrivalShipments: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        moveType: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
    })


    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            nationality: "",
            delegationHead: "",
            membersCount: null,
            arrivalHall: "",
            arrivalAirline: "",
            arrivalFlightNumber: "",
            arrivalDate: new Date().toLocaleDateString('en-CA'),
            arrivalTime: "1430",
            arrivalReceptor: "",
            arrivalDestination: "",
            arrivalShipments: "",
            moveType: "",
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
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <Icon icon="qlementine-icons:plus-16" />
                    <span>تسجيل وصول وفد</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] max-h-[675px] [&_[data-slot='dialog-close']]:!right-[95%] overflow-auto">
                <DialogHeader className="!text-start !py-2">
                    <DialogTitle>إضافة وفد جديد</DialogTitle>
                    <DialogDescription>
                        يمكنك اضافة وفد جديد من هنا, حينما تنتهي من ملئ البيانات قم بضغط اضافة.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4">
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="delegationHead">رئيس الوفد</Label>
                                <input type="text" id="delegationHead" name="delegationHead" placeholder="ادخل اسم رئيس الوفد" {...register('delegationHead')} />
                                {errors.delegationHead && <span className="text-sm text-rose-400 block">{errors.delegationHead.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="nationality">الجنسية</Label>
                                <input type="text" id="nationality" name="nationality" placeholder="ادخل الجنسية" {...register('nationality')} />
                                {errors.nationality && <span className="text-sm text-rose-400 block">{errors.nationality.message}</span>}
                            </div>
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="arrivalHall">المطار</Label>
                                <Select dir='rtl' value={watch('arrivalHall')} onValueChange={val => setValue('arrivalHall', val, { shouldValidate: true })}>
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
                                {errors.arrivalHall && <span className="text-sm text-rose-400 block">{errors.arrivalHall.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="membersCount">عدد الاعضاء</Label>
                                <input type="text" id="membersCount" name="membersCount" placeholder="ادخل عدد الاعضاء" {...register('membersCount')} />
                                {errors.membersCount && <span className="text-sm text-rose-400 block">{errors.membersCount.message}</span>}
                            </div>
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="arrivalFlightNumber">رقم الرحلة</Label>
                                <input type="text" id="arrivalFlightNumber" name="arrivalFlightNumber" placeholder="ادخل رقم الرحلة" {...register('arrivalFlightNumber')} />
                                {errors.arrivalFlightNumber && <span className="text-sm text-rose-400 block">{errors.arrivalFlightNumber.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="arrivalAirline">شركة الطيران</Label>
                                <input type="text" id="arrivalAirline" name="arrivalAirline" placeholder="ادخل شركة الطيران" {...register('arrivalAirline')} />
                                {errors.arrivalAirline && <span className="text-sm text-rose-400 block">{errors.arrivalAirline.message}</span>}
                            </div>
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="arrivalTime">سعت (HHMM)</Label>
                                <input 
                                    type="text" 
                                    id="arrivalTime" 
                                    name="arrivalTime" 
                                    value={watch('arrivalTime')} 
                                    {...register('arrivalTime')} 
                                    placeholder="1430"
                                    maxLength="4"
                                    pattern="[0-9]{4}"
                                />
                                {errors.arrivalTime && <span className="text-sm text-rose-400 block">{errors.arrivalTime.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="arrivalDate">التاريخ</Label>
                                <input type="date" id="arrivalDate" name="arrivalDate" {...register('arrivalDate')} />
                                {errors.arrivalDate && <span className="text-sm text-rose-400 block">{errors.arrivalDate.message}</span>}
                            </div>
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="arrivalReceptor">المستقبل</Label>
                                <input type="text" id="arrivalReceptor" name="arrivalReceptor" placeholder="ادخل اسم المستقبل" {...register('arrivalReceptor')} />
                                {errors.arrivalReceptor && <span className="text-sm text-rose-400 block">{errors.arrivalReceptor.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="arrivalDestination">وجهة الرحلة</Label>
                                <input type="text" id="arrivalDestination" name="arrivalDestination" placeholder="ادخل وجهة الرحلة" {...register('arrivalDestination')} />
                                {errors.arrivalDestination && <span className="text-sm text-rose-400 block">{errors.arrivalDestination.message}</span>}
                            </div>
                        </div>
                        <div className="w-full items-start flex gap-4">
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="arrivalShipments">الشحنات</Label>
                                <input type="text" id="arrivalShipments" name="arrivalShipments" placeholder="ادخل الشحنات" {...register('arrivalShipments')} />
                                {errors.arrivalShipments && <span className="text-sm text-rose-400 block">{errors.arrivalShipments.message}</span>}
                            </div>
                            <div className="grid gap-3 w-full">
                                <Label htmlFor="moveType">نوع الحركة</Label>
                                <Select dir='rtl' value={watch('moveType')} onValueChange={val => setValue('moveType', val, { shouldValidate: true })}>
                                    <SelectTrigger className="w-full !ring-0 col-span-2">
                                        <SelectValue placeholder="اختر نوع الحركة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="arrival">وصول</SelectItem>
                                        <SelectItem value="departure">مغادرة</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.moveType && <span className="text-sm text-rose-400 block">{errors.moveType.message}</span>}
                            </div>
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
                                        <span>اضافة ...</span>
                                    </>
                                    :
                                    <span>اضافة</span>
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default AddDelegation