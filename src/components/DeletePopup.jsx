import { useState } from 'react'
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
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button } from "@/components/ui/button"

const DeletePopup = ({item, children}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = () => {
        console.log(item);
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setOpen(false)
        }, 1500)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] [&_[data-slot='dialog-close']]:!right-[95%]">
                <DialogHeader className="!text-start !py-2">
                    <DialogTitle>هل انت متأكد من حذفك لهذه البيانات ؟</DialogTitle>
                    <DialogDescription>
                        عند حذفك لتلك البيانات لن تستطيع استرجاعها ابدا , حيث سيتم محوها من قاعدة البيانات الخاصة بنا.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button disabled={loading} variant="outline" className="cursor-pointer !ring-0">الغاء</Button>
                    </DialogClose>
                    <Button disabled={loading} type="submit" variant="destructive" className="cursor-pointer" onClick={onSubmit}>
                        {
                            loading
                                ?
                                <>
                                    <Icon icon="jam:refresh" className="animate-spin" />
                                    <span>حذف ...</span>
                                </>
                                :
                                <span>حذف</span>
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeletePopup