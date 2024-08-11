"use client"

import Form from "@/components/Form";
import { authFormLogin } from "@/utils/Schemas/authFormLogin";
import Link from "next/link";
import image from "@/assets/img/login.jpg"
import Image from "next/image";
import { useEffect, useState } from "react";
import { TypeDocumentProps } from "@/types/Props";
import { getElementsApi } from "@/data/api";

type AuthFormProps = {

}

const URL_FETCH = "usuario"

const AuthForm : React.FC<AuthFormProps> = () => {

    const [stateViewPasswordInput, setStateViewPasswordInput] = useState("password");
    const [isChecked, setIsChecket] = useState<boolean>(false);

    const inputsList = [
        {type: "text", id: "correo", name:"Correo"},
        {type: stateViewPasswordInput, id: "contrasena", name: "Contraseña"}
    ]

    function onChange(){
        if(stateViewPasswordInput === "password"){
            setStateViewPasswordInput("text")
        } else {
            setStateViewPasswordInput("password")
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setIsChecket(event.target.checked);
    }

    return (
        <div className="w-11/12 min-h-[70vh] mx-auto flex items-center justify-center"> 
            <div className="flex flex-col-reverse justify-center my-5 border rounded-sm divide-y divide-y-reverse
                            md:flex-row
            ">
                <div className="bg-principal-color/5 p-3 flex justify-center flex-col w-full">
                    <h2 className="font-bold text-center text-xl mb-4 text-fifth-color"> Iniciar sesión. </h2>
                    <Form 
                        dataName="Iniciar sesión"
                        schequema={authFormLogin}
                        inputsList={inputsList}
                        urlFetch={URL_FETCH}
                        modal
                        isLoginRegister
                        isSaveSession={isChecked}
                        >
                    <div className="flex items-center flex-col my-4">
                        <label htmlFor="showPassword">
                            <input type="checkbox" id="showPassword" onClick={onChange}/>
                            Mostrar contraseña.
                        </label>
                        <label htmlFor="saveSession">
                            <input type="checkbox" id="saveSession" checked={isChecked} onChange={(e)=> handleChange(e)}/>
                            Mantener sesión.
                        </label>
                        <p className="text-center text-sm mt-2"> ¿No tienes una cuenta? <Link href="/register" className="font-bold underline text-fifth-color text-center"> Registrate aquí. </Link> </p>
                        <p className="text-center text-sm"> ¿Olvidaste la contraseña? <Link href="/recovery-password" className="font-bold underline text-fifth-color text-center"> Recuperar contraseña. </Link> </p>
                    </div>
                    </Form>
                </div>
                <div className="bg-secondary-color flex justify-center flex-col gap-3 w-full py-5">
                    <h2 className="text-center text-xl font-bold text-white"> Bienvenido a nuestro espacio de clientes. </h2>
                    <div className="flex items-center justify-center">
                        <Image src={image} alt="" 
                        width={4272} 
                        height={2848} 
                        className="w-4/5 h-64 rounded-lg object-cover"/>
                    </div>
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