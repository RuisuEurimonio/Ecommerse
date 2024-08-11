"use client"

import { InputErrorText } from "@/components/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type RecoveryPasswordProps ={}

const resetPasswordSchema = z.object({
    contrasena: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
        .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
        .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
        .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
    repeatContrasena: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
        .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
        .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
        .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
}).refine((values) => values.contrasena === values.repeatContrasena, {
    message: "Las contraseñas deben ser iguales.",
    path: ["repeatContrasena"], 
});

type FormInputsProps = z.infer<typeof resetPasswordSchema>;

const RecoveryPassword : React.FC<RecoveryPasswordProps> = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [inputsVisible, setInputsVisible] = useState<"text" | "password">("password");

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputsProps>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onChange = () => {
        inputsVisible === "text" ? setInputsVisible("password") : setInputsVisible("text");
    }

    const onSubmit: SubmitHandler<FormInputsProps> = async (dataInputs) => {
        
        
    };

    return(
        <div className="min-h-[50vh] w-full flex items-center justify-center">
            <div className="rounded-md border-secondary-color shadow-2xl shadow-secondary-color border-2 py-2 px-4">
                <h2 className="text-center text-secondary-color font-bold text-lg"> Recuperar contraseña. </h2>
                <p className="max-w-[20rem] text-center m-auto text-sm"> Escribe tu nueva contraseña. </p>
                <form className="my-3 text-center flex gap-5 flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="contrasena" className="text-sixth-color"> Contraseña*: </label>
                        <input id="contrasena" type={inputsVisible} className="border-2 border-sixth-color rounded-md outline-none px-2" {...register("contrasena")}/> 
                        {errors.contrasena && (
                            <InputErrorText>
                                {errors.contrasena.message as string}
                            </InputErrorText>
                        )}
                    </div>
                    <div>
                        <label htmlFor="repeatContrasena" className="text-sixth-color"> Repetir contraseña*: </label>
                        <input id="repeatContrasena" type={inputsVisible} className="border-2 border-sixth-color rounded-md outline-none px-2" {...register("repeatContrasena")} /> 
                        {errors.repeatContrasena && (
                            <InputErrorText>
                                {errors.repeatContrasena.message as string}
                            </InputErrorText>
                        )}
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="checkbox" id="visible" name="visible" checked={inputsVisible === "text"} onChange={onChange}/>
                        <label htmlFor="visible" className="ml-2"> Mostrar contraseñas. </label> 
                    </div>
                    <div className="text-center">
                        <input value="Confirmar." className="py-2 px-4 bg-fifth-color rounded-md hover:scale-105 cursor-pointer font-bold text-sm" type="submit"/> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RecoveryPassword;