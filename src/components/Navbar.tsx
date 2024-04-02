import Image from "next/image";
import React from "react"
import logoGif from "@/assets/img/LogoCompletoRojo.gif";
import Link from "next/link";

type navProps = {};

const NavBar : React.FC<navProps> = () => {
    return (
        <nav className="bg-red-mafer w-[100%]">
            <div className="flex justify-between items-center max-w-[80%] m-auto">
                <div className="m-2">
                    <Image
                        src={logoGif}
                        alt="Logo en movimiento de Centro Ferretero Mafer"
                        width={720/2.5}
                        height={140/2.5}
                        unoptimized={false}
                    />            
                </div>
                <div className="w-[30%]">
                    <form className="w-[100%] h-10">
                        <input className="w-4/5 rounded-l-3xl h-full pl-5 outline-none" placeholder="Buscar">
                        </input>
                        <button className="w-1/5 bg-white-mafer rounded-r-3xl h-full border-l-2 border-b-red-mafer ">
                            <span className="icon icon-search"></span>
                        </button>
                    </form>
                </div>
                <ul className="flex text-black-mafer gap-5 font-bold">
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Inicio </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Productos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Descuentos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> JOSC </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Eventos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Sobre Nosotros </Link></li>
                </ul>
                <div className="text-xl">
                    <button className="h-10 border-r-[0.5px]">
                        <span className=" h-full px-3 icon icon-cart before:content-['\e906'] before:text-black-mafer"></span>
                    </button>
                    <button className="h-10 border-l-[0.5px]">
                        <span className="h-full px-3 icon icon-user before:content-['\e907'] before:text-black-mafer"></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;

