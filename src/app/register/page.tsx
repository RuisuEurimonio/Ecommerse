"use client"

import Form from "@/components/Form";
import Link from "next/link";
import image from "@/assets/img/register.jpg"
import Image from "next/image";
import { useState } from "react";
import { AuthFormRegister } from "@/utils/Schemas/authFormRegister";

type AuthFormProps = {

}

const document = [
    { nombre: "Tarjeta de identidad", otherData: "TI", id: "tarjetaIdentidad" },
    { nombre: "Cedula de Ciudadania", otherData: "CC", id: "cedulaCiudadania"},
    { nombre: "Cedula de extranjeria", otherData: "CED", id: "cedulaExtranjeria" },
];

const AuthForm : React.FC<AuthFormProps> = () => {

    const [stateViewPasswordInput, setStateViewPasswordInput] = useState("password");

    const inputsList = [
        {type: "text", id: "name", name: "Nombre"},
        {type: "text", id: "lastName", name: "Apellido"},
        {type: "combined", id: "numeroDocumento", name: "Documento", extraData: document, secondId: "tipoDocumento"},
        {type: "text", id: "phone", name: "Telefono"},
        {type: "email", id: "email", name: "Correo"},
        {type: "text", id: "address", name: "Dirección"},
        {type: stateViewPasswordInput, id: "password", name: "Contraseña"},
        {type: stateViewPasswordInput, id: "repeatPassword", name: "Repetir contraseña"}

    ]

    function onChange(){
        if(stateViewPasswordInput === "password"){
            setStateViewPasswordInput("text")
        } else {
            setStateViewPasswordInput("password")
        }
    }

    return (
        <div className="w-11/12 min-h-[70vh] mx-auto flex items-center justify-center"> 
            <div className="flex flex-col-reverse justify-center my-5 border rounded-sm divide-y divide-y-reverse
                            md:flex-row-reverse md:w-10/12
                            xl:w-8/12
            ">
                <div className="bg-third-color p-3 flex justify-center flex-col w-full">
                    <h2 className="text-fifth-color font-bold text-center text-xl mb-4"> Crear cuenta. </h2>
                    <Form 
                        dataName="Iniciar sesión"
                        schequema={AuthFormRegister}
                        inputsList={inputsList}
                        modal
                        isLoginRegister>
                    <div className="flex items-center flex-col my-4">
                        <label htmlFor="showPassword">
                            <input type="checkbox" id="showPassword" onClick={onChange}/>
                            Mostrar contraseña.
                        </label>
                        <p className="text-center text-sm mt-2"> ¿Ya tienes una cuenta? <Link href="/login" className="font-bold underline text-fifth-color text-center"> Ingresa aquí. </Link> </p>
                    </div>
                    </Form>
                </div>
                <div className="bg-secondary-color flex justify-evenly flex-col gap-3 w-full rounded-l-sm">
                    <h2 className="text-center text-xl font-bold text-third-color"> Beneficios. </h2>
                    <div className="flex items-center justify-center">
                        <Image src={image} alt="" width={5472} height={3648} className="rounded-sm w-4/5 h-auto"/>
                    </div>
                    <ul className="flex w-3/4 mx-auto my-2 justify-around text-third-color text-2xl">
                        <li><span className="icon icon-truck"></span></li>
                        <li><span className="icon icon-ranking"></span></li>
                        <li><span className="icon icon-global"></span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AuthForm;
