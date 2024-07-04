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
        newPassword: z.string()
            .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
            .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
            .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
            .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
            .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." })
            .optional(),
        repeatPassword: z.string()
            .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
            .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
            .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
            .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
            .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." })
            .optional(),
    })
    .refine((data) => data.newPassword === data.repeatPassword, {
        message: "Las contraseñas deben ser iguales.",
        path: ["repeatPassword"],
    });
