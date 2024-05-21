import Link from "next/link";
import fakeUser from "@/utils/json/usersFake.json"
import { randomInt } from "crypto";
import FormUser from "@/components/FormUser";

type MyAccountProps = {}

const data = fakeUser.find((value) => value.id === 2);

const MyAccount : React.FC<MyAccountProps> = () => {
    return(
        <div>
            <div className="bg-blue-mafer h-8 mb-5 flex items-center pb-3">
                <div className="w-4/5 m-auto text-white-mafer">
                    <Link className="flex items-center gap-3" href="/">
                        <span className="icon icon-arrowl"></span>
                        <p className=""> Inicio. </p>
                    </Link>
                </div>
            </div>
            <div className="flex gap-5 flex-col-reverse 
                md:divide-x-2 md:flex-row
            ">
                <div className="mx-4 
                    md:basis-[15%] md:ml-10 md:my-16
                ">
                    <ul>
                        <li>
                            <p className="font-bold text-lg"> Personal. </p>
                            <ul className="list-disc">
                                <li className="ml-5 my-2"> Información </li>
                            </ul>
                        </li>
                        <li>
                            <p className="font-bold text-lg"> Empresa. </p>
                            <ul className="list-disc">
                                <li className="ml-5 my-2"> Configuración. </li>
                                <li className="ml-5 my-2"> Articulos. </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="
                    md:basis-[85%]
                ">
                    <div className="w-11/12 m-auto flex justify-between flex-col-reverse
                        md:flex-row md:items-center
                        lg:w-4/5
                    ">
                        <div className="flex">
                            <span className="size-16 border-2 rounded-full flex justify-center items-center text-4xl font-bold mr-2"> {data?.nombres.slice(0,1)} </span>
                            <div>
                                <h3 className="font-bold text-blue-mafer text-lg tracking-tighter"> {data?.nombres} {data?.apellidos} </h3>
                                <h4> {data?.correo} </h4>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-2 justify-around h-4/6">
                            <button className="py-1 px-2 bg-blue-mafer rounded-sm text-white-mafer inline"> Mi carrito </button>
                            <button className="py-1 px-2 bg-blue-mafer rounded-sm text-white-mafer inline"> Cerrar sesión. </button>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto
                        lg:w-4/5
                    ">
                        <h3> Personal. </h3>
                    </div>
                    <hr className="w-11/12 m-auto
                        lg:w-4/5
                    "/>
                    <FormUser className="w-11/12 mx-auto my-4
                        lg:w-4/5" />
                </div>
            </div>
        </div>
    )
}

export default MyAccount;