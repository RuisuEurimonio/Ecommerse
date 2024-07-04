import { z } from "zod";

export const AuthFormRegister = z.object({
    name: z.string().min(4, "Ingrese un nombre válido").max(26, "Ingrese un nombre válido"),
    lastName: z.string().min(4, "Ingrese un apellido válido").max(26, "Ingrese un apellido válido"),
    numeroDocumento: z.string().refine((input) => { return !isNaN(parseInt(input)) }, "Ingrese un número válido sin caracteres especiales"),
    phone: z.string().refine((input) => { return !isNaN(parseInt(input)) }, "Ingrese un número válido sin caracteres especiales"),
    email: z.string().email("Ingrese un correo valido"),
    address: z.string().min(8, "Ingrese una dirección válida").max(30, "Ingrese una dirección válida"),
    password: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
        .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
        .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
        .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
    repeatPassword:  z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
    .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." })
}).refine((data)=>data.password === data.repeatPassword,{
    message: "Las contraseñas deben ser iguales",
    path: ["repeatPassword"]
})