import { z } from "zod";

export const discountSchequema = z
    .object({
        nombre: z
            .string()
            .min(5, "Ingrese una marca válida")
            .max(150, "Ingrese una marca valida"),
        descripcion: z
            .string()
            .min(5, "Ingrese una descripción válida")
            .max(500, "Ingrese una descripción válida")
            ,
        porcentaje: z
            .string()
            .refine((number) => !isNaN(parseFloat(number)), {
                message: "Debe ser un número"
            }),
        active: z
            .boolean(),
    });
