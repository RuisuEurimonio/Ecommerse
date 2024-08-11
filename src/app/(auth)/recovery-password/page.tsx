"use client"

import { successAction } from "@/components/utils";
import { sendMessageRecoveryPassword } from "@/data/api";
import { useRouter } from "next/navigation";

type RecoveryPasswordProps ={}

const RecoveryPassword : React.FC<RecoveryPasswordProps> = () => {

    const router = useRouter();

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const email = formData.get("email") as string;

        if(email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")){
            sendMessageRecoveryPassword({"correo": email});
            successAction("Verifica tu correo por favor.");
            router.push("/login");
        }

    }

    return(
        <div className="min-h-[50vh] w-full flex items-center justify-center">
            <div className="rounded-md border-secondary-color shadow-2xl shadow-secondary-color border-2 py-2 px-4">
                <h2 className="text-center text-secondary-color font-bold text-lg"> Recuperar contraseña. </h2>
                <p className="max-w-[20rem] text-center m-auto text-sm"> Si el correo coincide, recibira un enlace para el cambio de contraseña. </p>
                <form className="my-3 text-center" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-sixth-color"> Correo*: </label>
                    <input id="email" name="email" type="email" className="border-2 border-sixth-color rounded-md outline-none px-2"/> 
                    <div className="text-center">
                        <input value="Confirmar." className="mt-4 py-2 px-4 bg-fifth-color rounded-md hover:scale-105 cursor-pointer font-bold text-sm" type="submit"/> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RecoveryPassword;