"use client"

import Link from "next/link";
import React, { useState } from "react";

type NavLinksProps = {

}

const NavLinks:React.FC<NavLinksProps> = () => {

    const [active, setActive] = useState(false);

    return(
        <>
            <button className="
                    mr-3 text-xl
                    md:hidden
                "
                onClick={()=>{setActive(!active)}}>
                    <span className="icon icon-bars" />
            </button>
            <div className={`fixed right-0 top-0 w-[320px] px-6 h-screen bg-red-mafer border-2 transition z-40
                md:static md:translate-x-0 md:px-0 md:py-0 md:h-auto md:border-0 md:w-auto
                ${active ? "translate-x-0" : "translate-x-full"}
            `}
            >
                <div className="flex w-full flex-row-reverse">
                    <button className="relative right-0 p-2 text-2xl
                    md:hidden"
                        onClick={()=>{setActive(!active)}}
                    >
                        <span className="icon icon-xmark"/>
                    </button>
                </div>
                <h3 className="md:hidden font-bold text-lg"> Menu: </h3>
                <ul className="text-black-mafer text-center m-5 font-bold items-center gap-3 text-lg flex-col flex
                    md:flex md:flex-row md:text-sm
                    lg:gap-3 lg:m-2 
                    2xl:text-base
                ">
                    <li><Link href="/" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Inicio </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Productos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Descuentos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> JOSC </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Eventos </Link></li>
                    <li><Link href="" className="hover:text-black-mafer hover:underline hover:underline-offset-8"> Sobre Nosotros </Link></li>
                </ul>
                <hr className="md:hidden"/>
                <ul className="md:hidden text-lg my-4 font-semibold">
                    <li> <Link href="/">Ingresar. </Link>  </li>
                    <li> <Link href="/">Mi cuenta </Link>  </li>
                </ul>
                <hr className="md:hidden"/>
                <ul className="md:hidden text-lg my-4 font-semibold">
                    <li> <Link href="/"> Carrito </Link>  </li>
                </ul>
            </div>
        </>
    )
}

export default NavLinks;