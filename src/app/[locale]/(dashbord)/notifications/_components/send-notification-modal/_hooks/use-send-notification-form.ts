import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendNotificationSchema, SendNotificationSchema } from "../_schema";
import { SPECIFIC_RECIPIENTS } from "../_constants";

export function useSendNotificationForm() {
  const form = useForm<SendNotificationSchema>({
    resolver: zodResolver(sendNotificationSchema),
    defaultValues: {
      recipient: "allDrivers",
      search: "",
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
    },
  });

  const recipient = form.watch("recipient");
  const showSearch = SPECIFIC_RECIPIENTS.includes(recipient);

  return { form, showSearch };
}
