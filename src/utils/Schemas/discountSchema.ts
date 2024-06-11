import { z } from "zod";

export const discountSchequema = z
    .object({
        nameDiscount: z
            .string()
            .min(5, "Ingrese una marca válida")
            .max(150, "Ingrese una marca valida"),
        description: z
            .string()
            .min(5, "Ingrese una descripción válida")
            .max(200, "Ingrese una descripción válida")
            ,
        porcentage: z
            .string()
            .refine((number) => !isNaN(parseInt(number)), {
                message: "Debe ser un número"
            }),
        active: z
            .boolean(),
    });
