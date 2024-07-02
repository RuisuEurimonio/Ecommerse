"use client"

import Form from "@/components/Form";
import { authFormLogin } from "@/utils/Schemas/authFormLogin";
import Link from "next/link";
import image from "@/assets/img/imageNotFound.jpg"
import Image from "next/image";

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
        {type: "password", id: "password", name: "Contraseña"}
    ]

    return (
        <div className="w-11/12 min-h-[70vh] mx-auto my-5 flex flex-col-reverse justify-center border rounded-sm divide-y divide-y-reverse"> 
            <div className="bg-light-white-mafer p-3">
                <h2 className="font-bold text-center text-xl"> Iniciar sesión. </h2>
                <Form 
                    dataName="Iniciar sesión"
                    schequema={authFormLogin}
                    inputsList={inputsList}
                    modal>
                <div className="flex items-center flex-col my-4">
                    <label htmlFor="showPassword">
                        <input type="checkbox" id="showPassword"/>
                        Mostrar contraseña.
                    </label>
                    <label htmlFor="saveSession">
                        <input type="checkbox" id="saveSession"/>
                        Mantener sesión.
                    </label>
                    <p className="text-center text-sm mt-2"> ¿No tienes una cuenta? <button className=""> Registrate aquí. </button> </p>
                    <p className="text-center text-sm"> ¿Olvidaste la contraseña? <Link href=""> Recuperar contraseña. </Link> </p>
                </div>
                </Form>
            </div>
            <div className="bg-slate-900 h-full flex justify-center flex-col gap-3">
                <h2 className="text-center text-xl font-bold text-white"> Bienvenido a nuestro espacio de clientes. </h2>
                <div className="flex items-center justify-center"><Image src={image} alt="" width={150} height={150} className=""/></div>
                <ul className="flex w-3/4 mx-auto my-2 justify-around text-white text-2xl">
                    <li><span className="icon icon-truck"></span></li>
                    <li><span className="icon icon-ranking"></span></li>
                    <li><span className="icon icon-global"></span></li>
                </ul>
            </div>
        </div>
    )
}

export default AuthForm;