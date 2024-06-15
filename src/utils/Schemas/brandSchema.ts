import { z } from "zod";

export const brandSchequema = z
    .object({
        nombre: z
            .string()
            .min(5, "Ingrese una marca válida")
            .max(150, "Ingrese una marca valida"),
        descripcion: z
            .string()
            .min(5, "Ingrese una descripción válida")
            .max(200, "Ingrese una descripción válida")
            ,
    });
