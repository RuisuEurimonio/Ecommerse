"use client"

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

type NavLinksProps = {

}

type LinkProps ={
    href: string,
    nameLink: string
}

const links=[
    {href:"/",nameLink:"Inicio"},
    {href:"/products",nameLink:"Productos"},
    {href:"/discounts",nameLink:"Descuentos"},
    {href:"/JOSC",nameLink:"JOSC"},
    {href:"/events",nameLink:"Eventos"},
    {href:"/about-us",nameLink:"Sobre nosotros"}
]

const NavLinks:React.FC<NavLinksProps> = () => {

    const [active, setActive] = useState(false);
    const pathName = usePathname();

    return(
        <>
            <button className="
                    mr-3 text-xl
                    md:hidden
                "
                onClick={()=>{setActive(!active)}}>
                    <span className="icon icon-bars" />
            </button>
            <div className={`fixed right-0 top-0 w-[320px] h-screen bg-light-white-mafer border-2 transition duration-500 z-40
                md:static md:translate-x-0 md:px-0 md:py-0 md:h-auto md:border-0 md:w-auto
                ${active ? "translate-x-0" : "translate-x-full"}
            `}
            >
                <div className=" w-full bg-red-mafer">
                    <div className="flex w-11/12 flex-row-reverse">
                        <button className="relative right-0 px-2 py-1 text-2xl
                        md:hidden"
                            onClick={()=>{setActive(!active)}}
                        >
                            <span className="icon icon-xmark"/>
                        </button>
                    </div>
                </div>
                <div className="px-6 py-2 
                md:bg-red-mafer md:px-0
                ">
                    <h3 className="md:hidden font-bold text-lg"> Menu: </h3>
                    <ul className="text-black-mafer text-center m-5 font-bold items-center gap-3 text-lg flex-col flex
                        md:flex md:flex-row md:text-sm md:m-0
                        lg:gap-3 lg:m-2 
                        2xl:text-base
                    ">
                        {links.map((link:LinkProps)=>{
                            const style = (pathName==link.href) ? "font-extrabold underline underline-offset-8" : "font-bold";
                        return(
                            <li key={link.nameLink}><Link onClick={()=>{setActive(!active)}} href={link.href} className={`hover:text-black-mafer font- hover:underline hover:underline-offset-8 ${style}`}> {link.nameLink} </Link></li>
                        )}
                        )}
                    </ul>
                    <hr className="md:hidden"/>
                    <ul className="md:hidden text-lg my-4 font-semibold">
                        <li> <Link href="/">Ingresar. </Link>  </li>
                        <li> <Link href="/my-account" onClick={()=>{setActive(!active)}}>Mi cuenta </Link>  </li>
                    </ul>
                    <hr className="md:hidden"/>
                    <ul className="md:hidden text-lg my-4 font-semibold">
                        <li> <Link href="/"> Carrito </Link>  </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavLinks;