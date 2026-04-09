
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupervisorAction } from "../_actions/supervisors-create-action";
import { SupervisorFormValues } from "../_components/supervisors-form/schema";


export function useCreateSupervisor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SupervisorFormValues) => createSupervisorAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supervisors"] });
    },
  });
}
