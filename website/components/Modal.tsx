"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
const Modal = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded">ดูเพิ่มเติม</DialogTrigger>
      <DialogContent className="max-w-6xl w-full max-h-max p-2">
        <DialogHeader className="hidden">
          <DialogTitle >My Modal</DialogTitle>
        </DialogHeader>
        <img  src="/0001.jpg" alt="ing" />
      </DialogContent>
    </Dialog>
  )
}
export default Modal