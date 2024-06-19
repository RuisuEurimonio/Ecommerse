import { z } from "zod";

export const userSchequema = z
    .object({
        tipoDocumento: z.enum([
            "Tarjeta de identidad",
            "Cedula de Ciudadania",
            "Cedula de extranjeria",
        ]),
        numeroDocumento: z
            .string()
            .refine((number) => !isNaN(parseInt(number)), {
                message: "El documento debe tener solo números",
            }),
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
            .refine((number) => !isNaN(parseInt(number)), {
                message: "Debe ingresar solo números",
            }),
        direccion: z
            .string()
            .min(13, "Ingrese una dirección válida")
            .max(45, "Ingrese una dirección válida"),
        correo: z.string().email({ message: "ingrese un correo valido" }),
        password: z
            .string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "La contraseña debe tener 1 letra minúscula, mayúscula, número y un caracter especial"
            ).optional(),
        newPassword: z
            .string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "La contraseña debe tener 1 letra minúscula, mayúscula, número y un caracter especial"
            ).optional(),
        repeatPassword: z
            .string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "La contraseña debe tener 1 letra minúscula, mayúscula, número y un caracter especial"
            ).optional(),
    })
    .refine((data) => data.newPassword === data.repeatPassword, {
        message: "Las contraseñas deben ser iguales.",
        path: ["repeatPassword"],
    });
