"use client";

import { userSchequema } from "@/utils/Schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

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

    const onSubmit : SubmitHandler<formProps> = (data) => {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={className}
        >
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg"> Detalles. </h3>
                <div className="inline ml-5">
                    <label htmlFor="numberDocument">
                        <p className="inline-block">Documento:</p>
                        <select
                            className="border rounded-sm ml-2"
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
                            className="border rounded-sm"
                            {...register("numberDocument")}
                        />
                    </label>
                    {errors.TypeDocument && (
                        <p> {errors.TypeDocument.message} </p>
                    )}
                    {errors.numberDocument && (
                        <p> {errors.numberDocument.message} </p>
                    )}
                </div>
                <div className="ml-5">
                    <label htmlFor="names">
                        Nombres:
                        <input
                            id="names"
                            type="text"
                            className="border rounded-sm ml-2"
                            {...register("names")}
                        />
                    </label>
                    {errors.names && <p> {errors.names.message} </p>}
                </div>
                <div className="ml-5">
                    <label htmlFor="lastNames">
                        Apellidos:
                        <input
                            id="lastNames"
                            type="text"
                            className="border rounded-sm ml-2"
                            {...register("lastNames")}
                        />
                    </label>
                    {errors.lastNames && <p> {errors.lastNames.message} </p>}
                </div>
                <div className="ml-5">
                    <label htmlFor="numberPhone">
                        Teléfono:
                        <input
                            id="numberPhone"
                            type="text"
                            className="border rounded-sm ml-2"
                            {...register("numberPhone")}
                        />
                    </label>
                    {errors.numberPhone && (
                        <p> {errors.numberPhone.message} </p>
                    )}
                </div>
                <div className="ml-5">
                    <label htmlFor="address">
                        Dirección:
                        <input
                            id="address"
                            type="text"
                            className="border rounded-sm ml-2"
                            {...register("address")}
                        />
                    </label>
                    {errors.address && <p> {errors.address.message} </p>}
                </div>
                <h3 className="font-bold text-lg"> Dirección de correo. </h3>
                <div className="ml-5">
                    <label htmlFor="email">
                        Correo:
                        <input
                            id="email"
                            type="email"
                            className="border rounded-sm ml-2"
                            {...register("email")}
                        />
                    </label>
                    {errors.email && <p> {errors.email.message} </p>}
                </div>
                <h3 className="font-bold text-lg"> Seguridad. </h3>
                <div className="ml-5">
                    <label htmlFor="password">
                        Contraseña actual:
                        <input
                            id="password"
                            type="password"
                            className="border rounded-sm ml-2"
                            {...register("password")}
                        />
                    </label>
                    {errors.password && <p> {errors.password.message} </p>}
                </div>
                <div className="ml-5">
                    <label htmlFor="newPassword">
                        Nueva contraseña:
                        <input
                            id="newPassword"
                            type="password"
                            className="border rounded-sm ml-2"
                            {...register("newPassword")}
                        />
                    </label>
                    {errors.newPassword && (
                        <p> {errors.newPassword.message} </p>
                    )}
                </div>
                <div className="ml-5">
                    <label htmlFor="repeatPassword">
                        Confirmar nueva contraseña:
                        <input
                            id="repeatPassword"
                            type="password"
                            className="border rounded-sm ml-2"
                            {...register("repeatPassword")}
                        />
                    </label>
                    {errors.repeatPassword && (
                        <p> {errors.repeatPassword.message} </p>
                    )}
                </div>
                <h3 className="font-bold text-lg"> Pagos. </h3>
            </div>
            <input
                type="submit"
                value="Enviar"
                className="bg-blue-mafer text-white px-2 py-1 rounded-sm text-right cursor-pointer"
            />
            {JSON.stringify(watch(), null, 2)}
        </form>
    );
};

export default FormUser;
