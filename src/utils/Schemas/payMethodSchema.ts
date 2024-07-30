import { z } from "zod";

export const payMethodSchema = z.object({
    numero: z
        .string()
        .min(14, "Ingrese un número válido")    
        .max(14, "Ingrese un número válido"),
    expira: z.coerce.date(),
    proveedor: z.string(),
    tipo: z.any()
})