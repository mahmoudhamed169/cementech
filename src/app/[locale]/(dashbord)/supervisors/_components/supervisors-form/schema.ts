import { z } from "zod";

export const supervisorSchema = z.object({
  name: z.string().min(1, { message: "validation.name" }),
  phone: z.string().min(1, { message: "validation.phone" }),
  roles: z.array(z.string()).length(1, { message: "validation.roles" }),
});

export type SupervisorFormValues = z.infer<typeof supervisorSchema>;
