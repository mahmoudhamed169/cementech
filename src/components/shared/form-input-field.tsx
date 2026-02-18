import { Field, FieldLabel } from "@/components/ui/field";
import { Input, InputProps } from "@/components/ui/input";

interface FormInputFieldProps extends InputProps {
  id: string;
  label: string;
}

export default function FormInputField({
  id,
  label,
  className = "",
  value,
  ...props
}: FormInputFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        className={`bg-[#F9F9F9] py-2 px-4 rounded-xl border-[#F9F9F9] focus:ring-0 focus:border-[#F9F9F9] focus:ring-offset-0 ${
          props.readOnly ? "cursor-not-allowed" : ""
        } ${className}`}
        value={value}
        {...props}
      />
    </Field>
  );
}
