import { z } from "zod";

export const userSchequema = z
    .object({
        tipoDocumento: z.any(),
        numeroDocumento: z
            .coerce
            .number({message: "Ingrese un numero válido"})
            .min(10000000, {message: "Ingrese un número válido"}),
        nombres: z
            .string()
            .min(3, "Ingrese un apellido válido")
            .max(30, "Ingrese un apellido válido"),
        apellidos: z
            .string()
            .min(3, "Ingrese un apellido válido")
            .max(30, "Ingrese un apellido válido"),
        telefono: z
            .coerce
            .number({message: "Ingrese un número válido"})
            .min(1000000, "Ingrese un número válido")
            .max(9999999, "Ingrese un número válido"),
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
    })
