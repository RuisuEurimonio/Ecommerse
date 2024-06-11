"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { InputErrorText, saveAlert } from "./utils";
import { discountProps } from "@/types/Props";
import { discountSchequema } from "@/utils/Schemas/discountSchema";

type FormBrandProps = {
    className?: string,
    modal?: boolean,
    data?: discountProps | null;
};

type formProps = z.infer<typeof discountSchequema>;

const FormBrand: React.FC<FormBrandProps> = ({ className, modal = false, data}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<formProps>({
        resolver: zodResolver(discountSchequema),
        defaultValues: {
            nameDiscount: data?.nombre,
            description: data?.descripcion,
            porcentage: typeof data?.porcentaje == "number" ? data.porcentaje.toString() : "0",
            active: typeof data?.active == "boolean" ? data.active : false,
        }
    });

    const onSubmit: SubmitHandler<formProps> = async (data) => {
        const response = await saveAlert("Usuario");
        if(response){
            reset();
            alert("marca guardada");
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
                    <label htmlFor="nameDiscount">
                        <p className="inline-block w-1/3">Nombre*:</p>
                        <input
                            id="nameDiscount"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("nameDiscount")}
                        />
                    </label>
                    {errors.nameDiscount && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.nameDiscount.message}{" "}
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
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="porcentage">
                        <p className="inline-block w-1/3">Porcentaje*:</p>
                        <input
                            id="porcentage"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("porcentage")}
                        />
                    </label>
                    {errors.porcentage && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.porcentage.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="active">
                        <p className="inline-block w-1/3">Activo*:</p>
                        <input
                            id="active"
                            type="checkbox"
                            className="border rounded-sm w-2/3"
                            {...register("active")}
                        />
                    </label>
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

export default FormBrand;
