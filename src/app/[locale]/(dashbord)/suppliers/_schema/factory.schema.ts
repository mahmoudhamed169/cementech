import { z } from "zod";

export const factoryDataSchema = (t: (key: string) => string) =>
  z.object({
    nameAr: z
      .string()
      .min(2, { message: t("addFactory.validation.nameArRequired") }),
    nameEn: z
      .string()
      .min(2, { message: t("addFactory.validation.nameEnRequired") })
      .regex(/^[a-zA-Z\s]+$/, {
        message: t("addFactory.validation.nameEnInvalid"),
      }),
    locationAr: z
      .string()
      .min(1, { message: t("addFactory.validation.regionRequired") }),
    locationEn: z
      .string()
      .min(1, { message: t("addFactory.validation.regionRequired") }),
    phone: z
      .string()
      .min(9, { message: t("addFactory.validation.phoneRequired") })
      .regex(/^[0-9+\s\-()]+$/, {
        message: t("addFactory.validation.phoneInvalid"),
      }),
    status: z.boolean().default(true),
    location: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
    products: z
      .array(
        z.object({
          nameAr: z
            .string()
            .min(
              1,
              t("addFactory.productsManagement.validation.nameArRequired"),
            ),
          nameEn: z
            .string()
            .min(
              1,
              t("addFactory.productsManagement.validation.nameEnRequired"),
            ),
          price: z
            .string()
            .min(1, t("addFactory.productsManagement.validation.priceRequired"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
              message: t(
                "addFactory.productsManagement.validation.priceInvalid",
              ),
            }),
          isActive: z.boolean(),
        }),
      )
      .optional(),
  });

export type FactoryDataFormValues = z.infer<
  ReturnType<typeof factoryDataSchema>
>;
