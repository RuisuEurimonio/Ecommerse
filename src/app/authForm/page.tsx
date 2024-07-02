"use client"

import Form from "@/components/Form";
import { authFormLogin } from "@/utils/Schemas/authFormLogin";
import Link from "next/link";

type AuthFormProps = {

}

const document = [
    { nombre: "Tarjeta de identidad", otherData: "TI", id: "tarjetaIdentidad" },
    { nombre: "Cedula de Ciudadania", otherData: "CC", id: "cedulaCiudadania"},
    { nombre: "Cedula de extranjeria", otherData: "CED", id: "cedulaExtranjeria" },
];

const AuthForm : React.FC<AuthFormProps> = () => {

    const inputsList = [
        {type: "combined", id: "numeroDocumento", name: "Documento", extraData: document, secondId: "tipoDocumento"},
        {type: "password", id: "password", name: "contraseña"}
    ]

    return (
        <div className="w-full h-[70vh]"> 
            <div>
                <h1> Iniciar sesión. </h1>
                <Form 
                    className="w-11/12 h-full"
                    dataName="Iniciar sesión"
                    schequema={authFormLogin}
                    inputsList={inputsList}
                />
                <label htmlFor="showPassword">
                    <input type="checkbox" id="showPassword"/>
                    Mostrar contraseña.
                </label>
                <label htmlFor="saveSession">
                    <input type="checkbox" id="saveSession"/>
                    Mantener sesión.
                </label>
                <p> ¿No tienes una cuenta? <button> Registrate aquí. </button> </p>
                <p> ¿Olvidaste la contraseña? <Link href=""> Recuperar contraseña. </Link> </p>
            </div>
        </div>
    )
}

export default AuthForm;