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
        sku: z
            .coerce
            .number()
            .min(1, "Ingresa un valor valido" )
        ,
        precio: z
            .coerce
            .number({message: "Ingresa un número sin puntos ni comas"})
            .min(1, "Ingresa un valor valido" ),
        imagen: z
            .any()
        ,
        marca: z
            .any(),
        clasificacion: z
            .any(),
        categoria: z
            .array(z.any()).min(1, "Debes seleccionar una categoria"),
            descuento: z
            .any().optional()
    });
