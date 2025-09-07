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


const AddEvent = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        date: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
    })


    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            date: new Date().toLocaleDateString('en-ca')
        }
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        setLoading(true)
        setTimeout(() => {
            toast.success("تم اضافة حدث جديد")
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
                        <span>اضافة حدث جديد</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] [&_[data-slot='dialog-close']]:!right-[95%]">
                    <DialogHeader className="!text-start !py-2">
                        <DialogTitle>إضافة حدث جديد</DialogTitle>
                        <DialogDescription>
                            يمكنك اضافة حدث جديد من هنا, حينما تنتهي من ملئ البيانات قم بضغط اضافة.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">اسم الحدث</Label>
                            <input type="text" id="name" name="name" placeholder="ادخل اسم العميل" {...register('name')} />
                            {errors.name && <span className="text-sm text-rose-400 block">{errors.name.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="date">التاريخ</Label>
                            <input type="datetime-local" id="date" name="date" {...register('date')} />
                            {errors.date && <span className="text-sm text-rose-400 block">{errors.date.message}</span>}
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


export default AddEvent