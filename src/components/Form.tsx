"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodType, z } from "zod";
import { InputErrorText, saveAlert } from "./utils";

type FormProps<T, U> = {
    className?: string,
    modal?: boolean,
    data?: T | null,
    dataName: string,
    schequema: ZodType,
    inputsList: {
        type?: string,
        id: string,
        name: string,
        extraData?: U[] | null,
        className?: String
    }[]
};

const document = [
    { nombre: "Tarjeta de identidad", abreviatura: "TI" },
    { nombre: "Cedula de Ciudadania", abreviatura: "CC" },
    { nombre: "Cedula de extranjeria", abreviatura: "CED" },
];

const Form = <T, U> ({ className, modal = false, data, dataName, schequema, inputsList} : FormProps<T, U>) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<formProps>({
        resolver: zodResolver(schequema),
        defaultValues: data ?? {} as T,
    });

    const selectComponent = <U extends {id: number, nombre: string} >(id: string, name: string, type: string, subList  : U[] = []) => {
        switch(type){
            case ("select"):
                return selectInput(id, name, type, subList);
            default:
                return defaultInput(id, name, type);
        }
    }

    const defaultInput = (id: string, name: string, type: string) => {
        return(
            <div key={id+name} className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor={id}>
                        <p className="inline-block w-1/3"> {name}*:</p>
                        <input
                            id={id}
                            type={type}
                            className="border rounded-sm w-2/3"
                            {...register(id)}
                        />
                    </label>
                    {errors[id] && (
                        <InputErrorText
                            modal={modal}
                        >
                            {errors[id]?.message as string}
                        </InputErrorText>
                    )}
                </div>
        )
    }

    const selectInput = <U extends {id: number, nombre: string}>(id: string, name: string, type: string, subList: U[]) => {
        return(
            <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <p> {name} </p>
                    <select
                            className="border rounded-sm w-full"
                            {...register("category")}
                            defaultValue={id || ""}
                        >
                            {subList.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.nombre}
                                >
                                    {item.nombre}
                                </option>
                            ))}
                            </select>
                            {errors[id] && (
                        <InputErrorText
                            modal={modal}
                        >
                            {errors[id]?.message as string}
                        </InputErrorText>
                    )}
                </div>
        )
    }

    const formvalues = watch();

    type formProps = z.infer<typeof schequema>;

    const onSubmit: SubmitHandler<formProps> = async (data) => {
        console.log("aaaaaaaaaaaa")
        const response = await saveAlert(dataName);
        if(response){
            reset();
            alert(`${dataName} guardado`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <div className="flex flex-col gap-4
                lg:gap-6
            ">
                <h3 className="font-bold text-lg"> Detalles. </h3>
                {/* <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="numberDocument">
                        <p className="inline-block w-5/12">Documento*:</p>
                        <select
                            className="border rounded-sm w-2/12"
                            {...register("TypeDocument")}
                            defaultValue={data?.tipoDocumento || ""}
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
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.TypeDocument?.message}{" "}
                        </InputErrorText>
                    )}
                    {errors.numberDocument && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.numberDocument?.message}{" "}
                        </InputErrorText>
                    )}
                </div> */}
                {inputsList.map((item)=>{
                    return(
                        selectComponent(item.id, item.name, item.type ? item.type : "")
                )})}
                
                {/* {!modal &&
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
                
*/}
            </div>
            <input
                type="submit"
                value="Enviar"
                className="bg-blue-mafer text-white mt-2 px-2 py-1 rounded-sm text-right cursor-pointer float-right"
            />
            <p>{JSON.stringify(formvalues, null, 2)}</p>
        </form>
    );
};

export default Form;