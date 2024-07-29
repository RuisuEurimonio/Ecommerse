"use client"

import FormUser from "@/components/FormUser";
import { UserProps } from "@/types/Props";
import { useEffect, useState } from "react";
import DataNotFoundMessage from "@/components/DataNotFoundMessage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { closeSession, confirmAction, successAction } from "@/components/utils";

type MyAccountProps = {};

const MyAccount: React.FC<MyAccountProps> = () => {

    const [data, setData] = useState<UserProps | null>(null);

    const router = useRouter();

    function askForTheCloseTheSession(){
        confirmAction("¿Desea cerrar la sesión?", "Salir de la cuenta.")
        .then((response)=>{
            if(response){
                successAction("Cerrando sesión...");
                closeSession(router);
            }
        })
    }
    
    useEffect(()=>{
        const localData = localStorage.getItem("user");
        let userData = localData !== null ? JSON.parse(localData) : null;
        if(!userData){
            const sessionData = sessionStorage.getItem("user");
            userData = sessionData !== null ? JSON.parse(sessionData) : null;
        }
        setData(userData ? userData["Usuario: "] : null);
    }, [])

    return (
        <div className={`md:basis-[85%] ${(data != null) ? "" : "flex justify-center items-center"}`} >
            { data != null ? 
                <>
                    <div
                        className="w-11/12 m-auto flex justify-between flex-col-reverse
                                md:flex-row md:items-center
                                lg:w-4/5"
                    >
                        <div className="flex">
                            <span className="size-16 border-2 rounded-full flex justify-center items-center text-4xl font-bold mr-2">
                                {data.nombres.slice(0, 1)}
                            </span>
                            <div>
                                <h3 className="font-bold text-fifth-color text-lg tracking-tighter">
                                    {data.nombres} {data?.apellidos}
                                </h3>
                                <h4> {data.correo} </h4>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-2 justify-around h-4/6">
                            <Link href="/shopping-cart">
                                <button className="py-1 px-2 bg-secondary-color  rounded-sm text-third-color inline">
                                    Mi carrito
                                </button>
                            </Link>
                            <button className="py-1 px-2 bg-secondary-color  rounded-sm text-third-color inline"
                                onClick={askForTheCloseTheSession}
                            >
                                Cerrar sesión.
                            </button>
                        </div>
                    </div>
                    <div
                        className="w-11/12 m-auto
                                lg:w-4/5"
                    >
                        <h3> Personal. </h3>
                    </div>
                    <hr className="w-11/12 m-auto
                                lg:w-4/5"
                    />
                    <FormUser
                        className="w-11/12 mx-auto my-4
                                sm:w-3/4"
                                data={data}
                    />
                </>
                :
                <div className="w-4/5 m-auto">
                    <DataNotFoundMessage 
                        title="No has iniciado sesión." 
                        text="Ingresa sesión o registrate por medio del siguiente Link." 
                        redirectLink="/login"
                        redirectName="Iniciar sesión."/>
                </div>
            }
        </div>
    );
};

export default MyAccount;
