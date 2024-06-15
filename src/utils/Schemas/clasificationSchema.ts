import { z } from "zod";

export const ClasificationSchequema = z
    .object({
        nombre: z
            .string()
            .min(5, "Ingrese una clasificación válida")
            .max(150, "Ingrese una clasificación valida"),
        descripcion: z
            .string()
            .min(5, "Ingrese una descripción válida")
            .max(200, "Ingrese una descripción válida")
            ,
    });
