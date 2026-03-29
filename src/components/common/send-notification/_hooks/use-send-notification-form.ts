import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendNotificationSchema, SendNotificationSchema } from "../_schema";

export function useSendNotificationForm() {
  const form = useForm<SendNotificationSchema>({
    resolver: zodResolver(sendNotificationSchema),
    defaultValues: {
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
    },
  });

  return form;
}
