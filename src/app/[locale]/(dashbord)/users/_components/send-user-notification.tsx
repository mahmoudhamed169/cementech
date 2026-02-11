import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell } from "lucide-react";

export function SendUserNotification() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="
      w-87 h-12 bg-[#D08700] text-white p-2.5 rounded-xl
      flex items-center justify-center gap-2
      transition-all duration-200
      hover:bg-[#B87300] hover:shadow-lg hover:scale-[1.02]
      active:scale-[0.98]
      focus-visible:ring-2 focus-visible:ring-[#D08700]
    "
          >
            <Bell className="w-5 h-5" />
            ارسال اشعار
          </Button>
        </DialogTrigger>
        <DialogContent className="w-md bg-white border-0 px-0">
          <DialogHeader className="p-6">
            <DialogTitle>ارسال اشعار</DialogTitle>
            <DialogDescription>
              ارسال رسالة الى المستخدم محمد حسني مبارك
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="px-6 py-9 border-y border-[#E5E7EB]">
            <Field>
              <Label htmlFor="name-1">عنوان الرسالة</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="ادخل عنوان الإشعار.."
                className="rounded-xl border-[#D1D5DC] p-5"
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Textarea
                placeholder="ادخل نص الإشعار.."
                className="rounded-xl border-[#D1D5DC] p-5"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <div className="w-full flex items-center justify-center gap-3">
              <Button
                className="min-w-50 min-h-12 text-black rounded-xl border border-[#D1D5DC] "
                variant="outline"
              >
                الغاء
              </Button>

              <Button
                className="min-w-50 min-h-12 bg-[#4F39F6] text-white rounded-xl border-[#4F39F6]"
                type="submit"
              >
                ارسال
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
