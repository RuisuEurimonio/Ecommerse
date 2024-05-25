"use client";

import { userSchequema } from "@/utils/Schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { InputErrorText } from "./utils";

type FormUserProps = {
    className?: string;
};

type formProps = z.infer<typeof userSchequema>;

const document = [
    { nombre: "Tarjeta de identidad", abreviatura: "TI" },
    { nombre: "Cedula de Ciudadania", abreviatura: "CC" },
    { nombre: "Cedula de extranjeria", abreviatura: "CED" },
];

const FormUser: React.FC<FormUserProps> = ({ className }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<formProps>({
        resolver: zodResolver(userSchequema),
    });

    const onSubmit: SubmitHandler<formProps> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <div className="flex flex-col gap-4
                lg:gap-6
            ">
                <h3 className="font-bold text-lg"> Detalles. </h3>
                <div className="inline ml-5
                lg:max-w-[35vw] lg:relative">
                    <label htmlFor="numberDocument">
                        <p className="inline-block w-5/12">Documento*:</p>
                        <select
                            className="border rounded-sm w-2/12"
                            {...register("TypeDocument")}
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
                            id="numberDocument"
                            type="text"
                            className="border rounded-sm w-5/12"
                            {...register("numberDocument")}
                        />
                    </label>
                    {errors.TypeDocument && (
                        <InputErrorText>
                            {" "}
                            {errors.TypeDocument?.message}{" "}
                        </InputErrorText>
                    )}
                    {errors.numberDocument && (
                        <InputErrorText>
                            {" "}
                            {errors.numberDocument?.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className="ml-5
                lg:max-w-[35vw] lg:relative">
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
                        <InputErrorText>
                            {" "}
                            {errors.names.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className="ml-5
                lg:max-w-[35vw] lg:relative">
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
                        <InputErrorText>
                            {" "}
                            {errors.lastNames.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className="ml-5
                lg:max-w-[35vw] lg:relative">
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
                        <InputErrorText>
                            {" "}
                            {errors.numberPhone.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className="ml-5
                lg:max-w-[35vw] lg:relative">
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
                        <InputErrorText>
                            {" "}
                            {errors.address.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <h3 className="font-bold text-lg"> Dirección de correo. </h3>
                <div className="ml-5
                lg:max-w-[35vw] lg:relative">
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
                        <InputErrorText>
                            {" "}
                            {errors.email.message}{" "}
                        </InputErrorText>
                    )}
                </div>
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
                            <InputErrorText>
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
                            <InputErrorText>
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
                            <InputErrorText>
                                {" "}
                                {errors.repeatPassword.message}{" "}
                            </InputErrorText>
                        )}
                    </label>
                </div>
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

export default FormUser;