import { z } from "zod";

export const articleSchequema = z
    .object({
        nombre: z
            .string()
            .min(5, "Ingrese un nombre válido")
            .max(150, "Ingrese un nombre valido"),
        descripcion: z
            .string()
            .min(5, "Ingrese una descripción válida")
            .max(1000, "Ingrese una descripción válida")
        ,
        SKU: z
            .string()
            .refine((number) => !isNaN(parseInt(number)), {
                message: "Debe ser un número"
            })
        ,
        precio: z
            .string()
            .refine((number) => !isNaN(parseInt(number)), {
                message: "Debe ser un número sin puntos"
            }),
        image: z
            .string()
            .regex(new RegExp("^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?\\.(jpg|jpeg|png|gif|bmp)$"), "Debe ser una URL valida.")
        ,
        brand: z
            .string(),
        clasification: z
            .string(),
        category: z
            .string()
    });
