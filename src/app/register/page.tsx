"use client"

import Form from "@/components/Form";
import { authFormLogin } from "@/utils/Schemas/authFormLogin";
import Link from "next/link";
import image from "@/assets/img/imageNotFound.jpg"
import Image from "next/image";
import { useState } from "react";

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
                            md:flex-row
            ">
                <div className="bg-light-white-mafer p-3 flex justify-center flex-col w-full">
                    <h2 className="font-bold text-center text-xl"> Crear cuenta. </h2>
                    <Form 
                        dataName="Iniciar sesión"
                        schequema={authFormLogin}
                        inputsList={inputsList}
                        modal>
                    <div className="flex items-center flex-col my-4">
                        <label htmlFor="showPassword">
                            <input type="checkbox" id="showPassword" onClick={onChange}/>
                            Mostrar contraseña.
                        </label>
                        <p className="text-center text-sm mt-2"> ¿Ya tienes una cuenta? <Link href="/login" className="font-bold underline text-blue-700 text-center"> Ingresa aquí. </Link> </p>
                    </div>
                    </Form>
                </div>
                <div className="bg-slate-900 flex justify-center flex-col gap-3 w-full">
                    <h2 className="text-center text-xl font-bold text-white"> Beneficios. </h2>
                    <div className="flex items-center justify-center"><Image src={image} alt="" width={150} height={150} className=""/></div>
                    <ul className="flex w-3/4 mx-auto my-2 justify-around text-white text-2xl">
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
