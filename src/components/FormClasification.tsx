"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { InputErrorText, saveAlert } from "./utils";
import { ClasificationProps } from "@/types/Props";
import { ClasificationSchequema } from "@/utils/Schemas/clasificationSchema";

type FormClasificationProps = {
    className?: string,
    modal?: boolean,
    data?: ClasificationProps | null;
};

type formProps = z.infer<typeof ClasificationSchequema>;

const FormClasification: React.FC<FormClasificationProps> = ({ className, modal = false, data}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<formProps>({
        resolver: zodResolver(ClasificationSchequema),
        defaultValues: {
            nameClasification: data?.nombre,
            description: data?.descripcion,
        }
    });

    const onSubmit: SubmitHandler<formProps> = async (data) => {
        const response = await saveAlert("Clasificación");
        if(response){
            reset();
            alert("Clasificacion guardada");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <div className="flex flex-col gap-4
                lg:gap-6
            ">
                
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="nameClasification">
                        <p className="inline-block w-1/3">Nombre*:</p>
                        <input
                            id="nameClasification"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("nameClasification")}
                        />
                    </label>
                    {errors.nameClasification && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.nameClasification.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="description">
                        <p className="inline-block w-1/3">Descripción*:</p>
                        <input
                            id="description"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("description")}
                        />
                    </label>
                    {errors.description && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.description.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                

            </div>
            <input
                type="submit"
                value="Enviar"
                className="bg-blue-mafer text-white px-2 py-1 rounded-sm text-right cursor-pointer float-right mt-2"
            />
        </form>
    );
};

export default FormClasification;
