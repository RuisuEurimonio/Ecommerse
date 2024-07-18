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
            .max(500, "Ingrese una descripción válida"),
        porcentaje: z
            .coerce
            .number({message: "Ingrese un número"})
            .min(1, "Ingrese un número")
            .max(99, "Ingrese un número menor a 100")
            ,
        activo: z
            .boolean(),
    });
