import { z } from "zod";


export const authFormLogin = z
    .object({
        tipoDocumento: z.enum([
            "Tarjeta de identidad",
            "Cedula de Ciudadania",
            "Cedula de extranjeria",
        ]),
        numeroDocumento: z.string().refine((number) => { return !isNaN(parseInt(number))}, "Ingrese un número valido sin caracteres especiales"),
        password: z.string().min(4, "Ingrese una contraseña válida.").max(14, "Ingrese una contraseña válida.")
    })