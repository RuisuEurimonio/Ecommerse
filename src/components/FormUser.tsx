"use client"

import {useForm} from "react-hook-form"

type FormUserProps = {
    className?: string
}

const document = [
    {nombre : "Tarjeta de identidad", abreviatura: "TI"},
    {nombre : "Cedula de Ciudadania", abreviatura: "CC"},
    {nombre : "Cedula de extranjeria", abreviatura: "CED"}
]

const FormUser : React.FC<FormUserProps> = ({className}) => {

    const {register} = useForm();

    return(
        <form action="" className={className}>
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg"> Detalles. </h3>
                <div className="inline ml-5">
                    <label htmlFor="numberDocument">
                        <p className="inline-block">Documento:</p>
                        <select className="border" 
                            {...register("TypeDocument")}
                        >
                            {document.map((item) => (
                                <option key={item.abreviatura} value={item.nombre}> {item.abreviatura} </option>
                            ))}
                        </select>
                        <input id="numberDocument" type="text" className="border"
                        {...register("numberDocument")}
                        />
                    </label>
                </div>
                <div className="ml-5">
                    <label htmlFor="names">
                        Nombres:
                        <input id="names" type="text" className="border"
                            {...register("names")}
                        />
                    </label>
                </div>
                <div className="ml-5">
                    <label htmlFor="lastNames">
                        Apellidos:
                        <input id="lastNames" type="text" className="border"
                            {...register("lastNames")}
                        />
                    </label>
                </div>
                <div className="ml-5">
                    <label htmlFor="numberPhone">
                        Teléfono:
                        <input id="numberPhone" type="text" className="border" 
                            {...register("numberPhone")}
                        />
                    </label>    
                </div>
                <div className="ml-5">
                    <label htmlFor="address">
                        Dirección:
                        <input id="address" type="text" className="border" 
                            {...register("address")}
                        />
                    </label>
                </div>
                <h3 className="font-bold text-lg"> Dirección de correo. </h3>
                <div className="ml-5">
                    <label htmlFor="email">
                        Correo:
                        <input id="email" type="email" className="border" 
                            {...register("email")}
                        />
                    </label>
                </div>
                <h3 className="font-bold text-lg"> Seguridad. </h3>
                <div className="ml-5">
                    <label htmlFor="password">
                        Contraseña actual:
                        <input id="password" type="password" className="border" 
                            {...register("password")}
                        />
                    </label>
                </div>
                <div className="ml-5">
                    <label htmlFor="newPassword">
                        Nueva contraseña:
                        <input id="newPassword" type="password" className="border" 
                            {...register("newPassword")}
                        />
                    </label>
                </div>
                <div className="ml-5">
                    <label htmlFor="repeatPassword">
                        Confirmar nueva contraseña:
                        <input id="repeatPassword" type="password" className="border" 
                            {...register("repeatPassword")}
                        />
                    </label>
                </div>
                <h3 className="font-bold text-lg"> Pagos. </h3>
            </div>
        </form>
    )

}

export default FormUser;