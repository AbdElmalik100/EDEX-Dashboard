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


const AddEvent = ({ onEventAdded }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يمكن ان يكون فارغا"),
    })


    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = handleSubmit((data) => {
        setLoading(true)
        setTimeout(() => {
            toast.success("تم اضافة حدث جديد")
            reset()
            setLoading(false)
            setOpen(false)
            
            // إرسال البيانات للوالد إذا كان متوفراً
            if (onEventAdded) {
                onEventAdded(data)
            }
        }, 1500)
    })

    useEffect(() => reset(), [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <Icon icon="qlementine-icons:plus-16" />
                    <span>اضافة حدث جديد</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] [&_[data-slot='dialog-close']]:!right-[95%]">
                <DialogHeader className="!text-start !py-4">
                    <DialogTitle className="text-xl font-bold">إضافة حدث جديد</DialogTitle>
                    <DialogDescription className="text-neutral-600">
                        أدخل اسم الحدث الجديد لإضافته إلى النظام
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="py-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base font-medium">اسم الحدث</Label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="مثال: ايديكس 2025" 
                                    className="w-full p-3 border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-1 focus:ring-primary-200 transition-all duration-200"
                                    {...register('name')} 
                                />
                                {errors.name && (
                                    <div className="flex items-center gap-2 text-rose-400 text-sm">
                                        <Icon icon="material-symbols:error-rounded" fontSize={16} />
                                        <span>{errors.name.message}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-3 pt-4 border-t border-neutral-200">
                        <DialogClose asChild>
                            <Button disabled={loading} variant="outline" className="cursor-pointer flex-1 h-11">الغاء</Button>
                        </DialogClose>
                        <Button disabled={loading} type="button" className="cursor-pointer flex-1 h-11" onClick={onSubmit}>
                            {loading ? (
                                <>
                                    <Icon icon="jam:refresh" className="animate-spin mr-2" />
                                    <span>اضافة ...</span>
                                </>
                            ) : (
                                <>
                                    <Icon icon="material-symbols:add-rounded" className="mr-2" />
                                    <span>اضافة الحدث</span>
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default AddEvent