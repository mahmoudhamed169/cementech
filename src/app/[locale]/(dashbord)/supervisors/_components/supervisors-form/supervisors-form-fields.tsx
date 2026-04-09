import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Control, useController } from "react-hook-form";
import { SupervisorFormValues } from "./schema";

interface FieldProps {
  name: keyof Omit<SupervisorFormValues, "roles">;
  control: Control<SupervisorFormValues>;
  label: string;
  placeholder: string;
  type?: string;
}

function FormField({
  name,
  control,
  label,
  placeholder,
  type = "text",
}: FieldProps) {
  const { field, fieldState } = useController({ name, control });
  const t = useTranslations("supervisorsPage.form");

  return (
    <div className="space-y-1.5">
      <label className="text-sm text-[#4A5565]">{label}</label>
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`h-11 bg-white border rounded-lg text-[#101828] placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-[#155DFC]/30 ${
          fieldState.error ? "border-red-500" : "border-[#E5E7EB]"
        }`}
      />
      {fieldState.error && (
        <p className="text-xs text-red-500">
          {t(fieldState.error.message!)} 
        </p>
      )}
    </div>
  );
}

interface Props {
  control: Control<SupervisorFormValues>;
}

export default function SupervisorsFormFields({ control }: Props) {
  const t = useTranslations("supervisorsPage.form");

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        name="name"
        control={control}
        label={t("fields.name")}
        placeholder={t("fields.namePlaceholder")}
      />
      <FormField
        name="phone"
        control={control}
        label={t("fields.phone")}
        placeholder={t("fields.phonePlaceholder")}
      />
    </div>
  );
}
