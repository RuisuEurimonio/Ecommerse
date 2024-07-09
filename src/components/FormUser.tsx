"use client";

import { userSchequema } from "@/utils/Schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { InputErrorText, saveAlert } from "./utils";
import { UserProps } from "@/types/Props";

type FormUserProps = {
    className?: string,
    modal?: boolean,
    data?: UserProps | null;
};

type formProps = z.infer<typeof userSchequema>;

const document = [
    { nombre: "Tarjeta de identidad", abreviatura: "TI" },
    { nombre: "Cedula de Ciudadania", abreviatura: "CC" },
    { nombre: "Cedula de extranjeria", abreviatura: "CED" },
];

const FormUser: React.FC<FormUserProps> = ({ className, modal = false, data}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<formProps>({
        resolver: zodResolver(userSchequema),
        defaultValues: {
            numeroDocumento: data?.numeroDocumento,
            nombres: data?.nombres,
            apellidos: data?.apellidos,
            telefono: (data?.telefono ?? "") + "",
            direccion: data?.direccion,
            correo: data?.correo
        }
    });

    const onSubmit: SubmitHandler<formProps> = async (data) => {
        const response = await saveAlert("Usuario");
        if(response){
            reset();
            alert("Usuario guardado");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <div className="flex flex-col gap-4
                lg:gap-6
            ">
                <h3 className="font-bold text-lg"> Detalles. </h3>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="tipoDocumento">
                        <p className="inline-block w-5/12">Documento*:</p>
                        <select
                            className="border rounded-sm w-2/12"
                            {...register("tipoDocumento")}
                        >
                            {document.map((item) => (
                                <option
                                    key={item.abreviatura}
                                    value={item.nombre}
                                >
                                    {" "}
                                    {item.abreviatura}{" "}
                                </option>
                            ))}
                        </select>
                        <input
                            id="numeroDocumento"
                            type="text"
                            className="border rounded-sm w-5/12"
                            {...register("numeroDocumento")}
                        />
                    </label>
                    {errors.tipoDocumento && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.tipoDocumento?.message}{" "}
                        </InputErrorText>
                    )}
                    {errors.numeroDocumento && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.numeroDocumento?.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="nombres">
                        <p className="inline-block w-1/3">Nombres*:</p>
                        <input
                            id="nombres"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("nombres")}
                        />
                    </label>
                    {errors.nombres && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.nombres.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="apellidos">
                        <p className="inline-block w-1/3">Apellidos*:</p>
                        <input
                            id="apellidos"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("apellidos")}
                        />
                    </label>
                    {errors.apellidos && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.apellidos.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="telefono">
                        <p className="inline-block w-1/3">Teléfono*:</p>
                        <input
                            id="telefono"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("telefono")}
                        />
                    </label>
                    {errors.telefono && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.telefono.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="direccion">
                        <p className="inline-block w-1/3">Dirección*:</p>
                        <input
                            id="direccion"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("direccion")}
                        />
                    </label>
                    {errors.direccion && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.direccion.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <h3 className="font-bold text-lg"> Dirección de correo. </h3>
                <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="correo">
                        <p className="inline-block w-1/3">Correo*:</p>
                        <input
                            id="correo"
                            type="email"
                            className="border rounded-sm w-2/3"
                            {...register("correo")}
                        />
                    </label>
                    {errors.correo && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.correo.message}{" "}
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
                className="bg-secondary-color text-white px-2 py-1 rounded-sm text-right cursor-pointer float-right"
            />
        </form>
    );
};

export default FormUser;
