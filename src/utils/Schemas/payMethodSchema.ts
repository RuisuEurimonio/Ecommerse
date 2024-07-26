import { z } from "zod";

export const payMethodSchema = z.object({
    numero: z
        .string()
        .min(14, "Ingrese un número válido")    
        .max(14, "Ingrese un número válido"),
    expira: z.date(),
    proveedor: z.string(),
    tipo_id: z.any()
})