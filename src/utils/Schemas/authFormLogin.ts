import { z } from "zod";


export const authFormLogin = z
    .object({
        user: z.string().refine((number) => { return !isNaN(parseInt(number))}, "Ingrese un número valido sin caracteres especiales"),
        password: z.string().min(4, "Ingrese una contraseña válida.").max(14, "Ingrese una contraseña válida.")
    })