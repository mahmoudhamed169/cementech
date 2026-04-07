import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendNotificationSchema, SendNotificationSchema } from "../_schema";

export function useSendNotificationForm() {
  const form = useForm<SendNotificationSchema>({
    resolver: zodResolver(sendNotificationSchema),
    defaultValues: {
      recipient: "allDrivers",
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
    },
  });

  return { form };
}
