import { z } from "zod";


export const authFormLogin = z
    .object({
        correo: z.string().email("Ingrese un correo valido."),
        contrasena: z.string().min(4, "Ingrese una contraseña válida.").max(14, "Ingrese una contraseña válida.")
    })