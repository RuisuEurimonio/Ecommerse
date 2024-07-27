import { z } from "zod";

export const userSchequemaFull = z
    .object({
        tipoDocumento: z.any(),
        numeroDocumento: z
            .string()
            .min(8, "ingrese un número válido")
            .max(11, "ingrese un número válido"),
        nombres: z
            .string()
            .min(3, "Ingrese un apellido válido")
            .max(30, "Ingrese un apellido válido"),
        apellidos: z
            .string()
            .min(3, "Ingrese un apellido válido")
            .max(30, "Ingrese un apellido válido"),
        telefono: z
            .string()
            .min(6, "Ingrese un número válido")
            .max(7, "Ingrese un número válido"),
        celular: z
            .coerce
            .number({message: "Ingrese un número válido"})
            .min(1000000000, "Ingrese un número válido")
            .max(9999999999, "Ingrese un número válido"),
        direccion: z
            .string()
            .min(13, "Ingrese una dirección válida")
            .max(45, "Ingrese una dirección válida"),
        correo: z.string().email({ message: "ingrese un correo valido" }),
        permisos: z.any(),
        contrasena: z.string()
            .optional().refine((val) => !val || validatePasswords.safeParse(val).success,{
                message: "La coontraseña no cumple con los requisitos de seguridad"
            }),
        newPassword: z.string()
            .optional().refine((val) => !val || validatePasswords.safeParse(val).success,{
                message: "La coontraseña no cumple con los requisitos de seguridad"
        }),
        repeatPassword: z.string()
            .optional().refine((val) => !val || validatePasswords.safeParse(val).success,{
                message: "La coontraseña no cumple con los requisitos de seguridad"
        }),
    })
    .refine((data) => {
        if(data.newPassword || data.repeatPassword){
        return data.newPassword === data.repeatPassword
    }
        return true
} , {
        message: "Las contraseñas deben ser iguales.",
        path: ["repeatPassword"],
    });

    const validatePasswords = z.string()
    .min(8 )
    .regex(/[a-z]/ )
    .regex(/[A-Z]/ )
    .regex(/[0-9]/ )
    .regex(/[^a-zA-Z0-9]/ )
