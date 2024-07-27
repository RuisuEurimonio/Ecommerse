"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { errorAction, InputErrorText, updateAlert } from "./utils";
import { TypeDocumentProps, typePayMethodProps, UserProps } from "@/types/Props";
import { userSchequemaFull } from "@/utils/Schemas/userSchemaFull";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getElementsApi, verifyPassword } from "@/data/api";
import Modal from "./Modal";
import Form from "./Form";
import { payMethodSchema } from "@/utils/Schemas/payMethodSchema";

type FormUserProps = {
    className?: string,
    modal?: boolean,
    data: UserProps;
};

type formProps = z.infer<typeof userSchequemaFull>;

const FormUser: React.FC<FormUserProps> = ({ className, modal = false, data}) => {

    const [dataDocument, setDataDocument] = useState<TypeDocumentProps[] | null>(null);
    const [dataTypePayMethods, setDataTypePayMethods] = useState<typePayMethodProps[] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [keyModal, setKeyModal] = useState("Main");

    const inputsForm = [
        {type: "text", id: "numero", name: "Número" },
        {type: "date", id: "expira", name: "Fecha de expiración" },
        {type: "text", id: "proveedor", name: "Proveedor" },
        {type: "select", id: "tipo_id", name: "Tipo", extraData: dataTypePayMethods },
    ]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formProps>({
        resolver: zodResolver(userSchequemaFull),
        defaultValues: {
            tipoDocumento: data.tipoDocumento.nombre,
            numeroDocumento: data.numeroDocumento,
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefono: data.telefono,
            celular: data.celular,
            direccion: data.direccion,
            correo: data.correo
        }
    });

    const route = useRouter();

    function openCloseModal(){
        setKeyModal(!modalVisible ? "main" : data.nombres)
        setModalVisible(!modalVisible);
        
    }

    function customFunction(){
        /* localStorage.clear()
        sessionStorage.clear()
        route.push("/login") */
    }

    const getDocuments = async () => {
        const response = await getElementsApi("usuario/documento");
        if(response){
            setDataDocument(response);
        }
    }

    const getTypePayMethods = async () => {
        const response = await getElementsApi("pago/metodo/tipo");
        if(response){
            setDataTypePayMethods(response);
        }
    }

    useEffect(()=>{
        getDocuments();
        getTypePayMethods();
    },[])

    const onSubmit: SubmitHandler<formProps> = async (dataInputs) => {
        let id = data.id
        let permisos = data.permisos;
        let dataWithId = {id, permisos, ...dataInputs};
        const {contrasena, newPassword, repeatPassword, ...dataSend} = dataWithId;
        if(dataInputs.correo && dataInputs.contrasena){
            verifyPassword(dataInputs.correo, dataInputs.contrasena).then((response)=>{
                if(response){
                    let contrasena = dataInputs.newPassword;
                    let arraySend = {contrasena, ...dataSend};
                    updateAlert("Usuario", arraySend, "usuario", customFunction);
                }else{
                    errorAction("Por favor verifique la contraseña actual ingresada.")
                }
            })
        } else {
            updateAlert("Usuario", dataSend, "usuario", customFunction);
        }
    };

    return (
        <div className={className}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                {...register("tipoDocumento.id")}
                            >
                                {dataDocument && dataDocument.map((item) => (
                                    <option
                                        key={item.abreviacion}
                                        value={item.id}
                                    >
                                        {item.abreviacion}
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
                        {errors.numeroDocumento && (
                            <InputErrorText
                                modal={modal}
                            >
                                {errors.numeroDocumento?.message}
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
                        <label htmlFor="telefono">
                            <p className="inline-block w-1/3">Celular*:</p>
                            <input
                                id="celular"
                                type="text"
                                className="border rounded-sm w-2/3"
                                {...register("celular")}
                            />
                        </label>
                        {errors.celular && (
                            <InputErrorText
                                modal={modal}
                            >
                                {" "}
                                {errors.celular.message}{" "}
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
                                <label htmlFor="contrasena" className="m-auto">
                                    <p className="sm:inline-block sm:w-1/3">Contraseña actual*:</p>
                                    <input
                                        id="contrasena"
                                        type="password"
                                        className="border rounded-sm
                                    sm:w-2/3"
                                        {...register("contrasena")}
                                    />
                                    {errors.contrasena && (
                                        <InputErrorText
                                            modal={modal}
                                        >
                                            {" "}
                                            {errors.contrasena.message}{" "}
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
                                            {errors.repeatPassword.message}
                                        </InputErrorText>
                                    )}
                                </label>
                            </div>
                        </>
                    }
                </div>

                <input
                    type="submit"
                    value="Actualizar datos"
                    className="bg-secondary-color text-white px-2 py-1 rounded-sm text-right cursor-pointer float-right"
                />
            </form>

            <div className="my-4">
                <h3 className="font-bold text-lg"> Pagos. </h3>
                <div className="flex justify-between ml-5 mb-3">
                    <p className="mr-5"> {data.metodoPago ? data.metodoPago : "No registra"} </p>
                    <div className="flex gap-5">
                        <button className="bg-secondary-color text-third-color py-1 px-2" onClick={openCloseModal}> Actualizar </button>
                        <button className="bg-secondary-color text-third-color py-1 px-2" disabled={data.metodoPago === null} style={{cursor: data.metodoPago ? "pointer" : "not-allowed"}}> Eliminar </button>
                    </div>
                </div>
            </div>

            <Modal key={keyModal} state={modalVisible} openCloseModal={openCloseModal}>
                <div className="w-full relative">
                    <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
                </div>
                <h2 className="font-bold text-blue-mafer text-xl m-2"> Actualizar método de pago. </h2>
                <Form className="w-11/12 h-full"
                    modal
                    dataName="Método de pago"
                    schequema={payMethodSchema}
                    urlFetch="pago/metodo"
                    inputsList={inputsForm}
                    data={data.metodoPago ? data.metodoPago : null}
                    />
            </Modal>
        </div>
    );
};

export default FormUser;
