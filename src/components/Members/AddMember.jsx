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

const AddMember = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const validationSchema = yup.object({
        rank: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        name: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
        role: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
    })


    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            rank: "",
            name: "",
            role: "",
        }
    })


    const onSubmit = handleSubmit((data) => {
        console.log(data);
        setLoading(true)
        setTimeout(() => {
            toast.success("تم اضافة عضو جديد")
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
                        <span>اضافة عضو جديد</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] max-h-[675px] [&_[data-slot='dialog-close']]:!right-[95%] overflow-auto">
                    <DialogHeader className="!text-start !py-2">
                        <DialogTitle>إضافة عضو جديد</DialogTitle>
                        <DialogDescription>
                            يمكنك اضافة عضو جديد من هنا, حينما تنتهي من ملئ البيانات قم بضغط اضافة.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
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
                        <div className="grid gap-3 w-full">
                            <Label htmlFor="role">الوظيفة</Label>
                            <input type="text" id="role" name="role" placeholder="ادخل وظيفة العضو" {...register('role')} />
                            {errors.role && <span className="text-sm text-rose-400 block">{errors.role.message}</span>}
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


export default AddMember