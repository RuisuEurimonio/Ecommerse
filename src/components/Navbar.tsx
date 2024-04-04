import Image from "next/image";
import React from "react"
import logoGif from "@/assets/img/LogoCompletoRojo.gif";
import Link from "next/link";

type navProps = {};

const NavBar : React.FC<navProps> = () => {
    return (
        <nav className="bg-red-mafer w-[100%] p-2">
            <div className="flex justify-between items-center w-full m-auto
                xl:w-[80%]">
                <div className="m-2 w-1/3
                                lg:w-[288px]
                    ">
                    <Image
                        src={logoGif}
                        alt="Logo en movimiento de Centro Ferretero Mafer"
                        width={720/2.5}
                        height={140/2.5}
                        unoptimized={false}
                    />            
                </div>
                <div className="
                    w-[50%]
                    md:w-[30%]
                ">
                    <form className="w-[90%] m-auto flex 
                        md:h-7
                        xl:h-10 xl:w-full
                        ">
                        <input className="w-4/5 rounded-l-3xl pl-5 outline-none text-base
                            md:h-full 
                        " placeholder="Buscar"/>
                        <button className="w-1/5 bg-white-mafer rounded-r-3xl h-full border-l-2 text-base
                            md:h-full 
                        " name="Buscar">
                            <span className="icon icon-search"></span>
                        </button>
                    </form>
                </div>
                <button className="
                    mr-3 text-xl
                    md:hidden
                ">
                        <span className="icon icon-bars" />
                </button>
                <ul className="
                  text-black-mafer text-center m-5 font-bold items-center gap-1 text-xs hidden
                    lg:gap-3 lg:m-2 lg:text-sm 
                    md:flex
                ">
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Inicio </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Productos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Descuentos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> JOSC </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Eventos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Sobre Nosotros </Link></li>
                </ul>
                <div className="text-base text-nowrap h-7 hidden
                    xl:text-xl xl:h-full
                    md:block
                ">
                    <button className="h-full border-r-[0.5px]">
                        <span className=" h-full px-3 icon icon-cart before:content-['\e906'] before:text-black-mafer"></span>
                    </button>
                    <button className="h-full border-l-[0.5px]">
                        <span className="h-full px-3 icon icon-user before:content-['\e907'] before:text-black-mafer"></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;

