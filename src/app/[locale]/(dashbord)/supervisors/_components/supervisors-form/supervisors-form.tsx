"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { supervisorSchema, SupervisorFormValues } from "./schema";
import SupervisorsFormFields from "./supervisors-form-fields";
import SupervisorsRoles from "./supervisors-roles";
import { ApiSupervisor } from "@/src/lib/types/admin/admin";
import { useCreateSupervisor } from "../../_hooks/use-create-supervisor";
import { useUpdateSupervisor } from "../../_hooks/use-update-supervisor";

interface Props {
  supervisor?: ApiSupervisor;
  onClose: () => void;
}

export default function SupervisorsForm({ supervisor, onClose }: Props) {
  const t = useTranslations("supervisorsPage.form");
  const isEdit = !!supervisor;

  const { mutateAsync: createMutate, isPending: isCreating } =
    useCreateSupervisor();
  const { mutateAsync: updateMutate, isPending: isUpdating } =
    useUpdateSupervisor();

  const isPending = isCreating || isUpdating;

  const form = useForm<SupervisorFormValues>({
    resolver: zodResolver(supervisorSchema),
    defaultValues: {
      name: supervisor?.name ?? "",
      phone: supervisor?.phone ?? "",
      roles: supervisor?.permission_id ? [supervisor.permission_id] : [],
    },
  });

  const onSubmit = async (values: SupervisorFormValues) => {
    try {
      if (isEdit) {
        await updateMutate({
          id: supervisor.id,
          data: values,
          original: {
            name: supervisor.name,
            phone: supervisor.phone,
            permission_id: supervisor.permission_id,
          },
        });
      } else {
        await createMutate(values);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <SupervisorsFormFields control={form.control} />
      <SupervisorsRoles control={form.control} />

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 h-11 bg-[#155DFC] hover:bg-[#1449CC] text-white rounded-lg font-medium"
        >
          {isPending ? t("submitting") : isEdit ? t("update") : t("add")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1 h-11 border-[#E5E7EB] text-[#4A5565] rounded-lg font-medium"
        >
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
