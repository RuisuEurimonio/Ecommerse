"use client";

import { userSchequema } from "@/utils/Schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { InputErrorText } from "./utils";
import { CardProductProps } from "@/types/Props";
import Swal from "sweetalert2";

type FormArticleProps = {
    className?: string,
    modal?: boolean,
    data?: CardProductProps | null;
};

const alertFire = ():Promise<boolean> => {
    return Swal.fire({
        title: "Guardar artículo.",
        text: "Desea guardar este artículo con los datos ingresados?",
        icon: "question",
        showCancelButton: true
    }).then((response)=>{
        if(response.isConfirmed){
            let Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                icon: "success",
                timer: 1500,
                title: "Articulo guardado."
            })
            Toast.fire();
            return true;
        } else { return false}
    })
}

type formProps = z.infer<typeof userSchequema>;

const FormArticle: React.FC<FormArticleProps> = ({ className, modal = false, data}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<formProps>({
        resolver: zodResolver(),
        defaultValues: {
            nameArticle: data?.,
            names: data?.nombres,
            lastNames: data?.apellidos,
            numberPhone: (data?.celular ?? "") + "",
            address: data?.direccion,
            email: data?.correo
        }
    });

    const onSubmit: SubmitHandler<formProps> = async (data) => {
        const response = await alertFire();
        if(response){
            reset();
            alert("Articulo guardado");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <div className="flex flex-col gap-4
                lg:gap-6
            ">
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="nameArticle">
                        <p className="inline-block w-5/12">Nombre*:</p>    
                        <input
                            id="nameArticle"
                            type="text"
                            className="border rounded-sm w-5/12"
                            {...register("nameArticle")}
                        />
                    </label>
                    {errors.TypeDocument && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.TypeDocument?.message}{" "}
                        </InputErrorText>
                    )}
                    {errors.nameArticle && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.nameArticle?.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="names">
                        <p className="inline-block w-1/3">Nombres*:</p>
                        <input
                            id="names"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("names")}
                        />
                    </label>
                    {errors.names && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.names.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="lastNames">
                        <p className="inline-block w-1/3">Apellidos*:</p>
                        <input
                            id="lastNames"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("lastNames")}
                        />
                    </label>
                    {errors.lastNames && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.lastNames.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="numberPhone">
                        <p className="inline-block w-1/3">Teléfono*:</p>
                        <input
                            id="numberPhone"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("numberPhone")}
                        />
                    </label>
                    {errors.numberPhone && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.numberPhone.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="address">
                        <p className="inline-block w-1/3">Dirección*:</p>
                        <input
                            id="address"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("address")}
                        />
                    </label>
                    {errors.address && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.address.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <h3 className="font-bold text-lg"> Dirección de correo. </h3>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="email">
                        <p className="inline-block w-1/3">Correo*:</p>
                        <input
                            id="email"
                            type="email"
                            className="border rounded-sm w-2/3"
                            {...register("email")}
                        />
                    </label>
                    {errors.email && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.email.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                {!modal &&
                    <>
                        <h3 className="font-bold text-lg"> Seguridad. </h3>
                        <div className="flex text-center
                    sm:inline sm:text-left sm:ml-5
                    lg:max-w-[35vw] lg:relative
                ">
                            <label htmlFor="password" className="m-auto">
                                <p className="sm:inline-block sm:w-1/3">Contraseña actual*:</p>
                                <input
                                    id="password"
                                    type="password"
                                    className="border rounded-sm
                                sm:w-2/3"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <InputErrorText
                                        modal={modal}
                                    >
                                        {" "}
                                        {errors.password.message}{" "}
                                    </InputErrorText>
                                )}
                            </label>
                        </div>
                        <div className="flex text-center
                    sm:inline sm:text-left sm:ml-5
                    lg:max-w-[35vw] lg:relative
                ">
                            <label htmlFor="newPassword" className="m-auto">
                                <p className="sm:inline-block sm:w-1/3">Nueva contraseña*:</p>
                                <input
                                    id="newPassword"
                                    type="password"
                                    className="border rounded-sm 
                                sm:w-2/3"
                                    {...register("newPassword")}
                                />
                                {errors.newPassword && (
                                    <InputErrorText
                                        modal={modal}
                                    >
                                        {" "}
                                        {errors.newPassword.message}{" "}
                                    </InputErrorText>
                                )}
                            </label>
                        </div>
                        <div className="flex text-center
                    sm:inline sm:text-left sm:ml-5
                    lg:max-w-[35vw] lg:relative
                ">
                            <label htmlFor="repeatPassword" className="m-auto">
                                <p className="sm:inline-block sm:w-1/3">Confirmar nueva contraseña*:</p>
                                <input
                                    id="repeatPassword"
                                    type="password"
                                    className="border rounded-sm 
                                sm:w-2/3 sm:translate-y-[-50%]"
                                    {...register("repeatPassword")}
                                />
                                {errors.repeatPassword && (
                                    <InputErrorText
                                        modal={modal}
                                    >
                                        {" "}
                                        {errors.repeatPassword.message}{" "}
                                    </InputErrorText>
                                )}
                            </label>
                        </div>
                    </>
                }
                <h3 className="font-bold text-lg"> Pagos. </h3>
            </div>

            <input
                type="submit"
                value="Enviar"
                className="bg-blue-mafer text-white px-2 py-1 rounded-sm text-right cursor-pointer float-right"
            />
        </form>
    );
};

export default FormArticle;
