import Image from "next/image";
import React from "react";
import logo from "@/assets/img/logo sin fondo.png";
import Link from "next/link";
import NavLinks from "./NavLinks";

type navProps = {};

const NavBar: React.FC<navProps> = () => {
    return (
        <nav className="bg-principal-color w-[100%] ">
            <div
                className="flex justify-between items-center w-full m-auto relative
                xl:w-[80%]"
            >
                <Link
                    className="m-2 w-1/3
                                lg:w-[288px]"
                    href="/"
                >
                    <Image
                        src={logo}
                        alt="Logo en movimiento de Centro Ferretero Mafer"
                        width={720 / 2.5}
                        height={140 / 2.5}
                        unoptimized={true}
                    />
                </Link>
                <div
                    className="
                    w-[50%]
                    md:w-[30%]"
                >
                    <form
                        className="w-[90%] m-auto flex 
                        md:h-7
                        xl:h-10 xl:w-full"
                    >
                        <input
                            className="w-4/5 rounded-l-3xl pl-5 outline-none text-base
                            md:h-full"
                            placeholder="Buscar"
                        />
                        <button
                            className="w-1/5 bg-fifth-color rounded-r-3xl h-full border-l-2 text-base
                            md:h-full"
                            name="Buscar"
                        >
                            <span className="icon icon-search"></span>
                        </button>
                    </form>
                </div>
                <NavLinks />
                <div
                    className="text-base text-nowrap h-7 hidden
                    xl:text-xl xl:h-full
                    md:block"
                >
                    <Link href="/shopping-cart">
                        <button className="h-full border-r-[0.5px] border-fifth-color">
                            <span className=" h-full px-3 icon icon-cart before:content-['\e906'] before:text-fourth-color"></span>
                        </button>
                    </Link>
                    <Link href="/my-account">
                        <button className="h-full border-l-[0.5px] border-fifth-color">
                            <span className="h-full px-3 icon icon-user before:content-['\e907'] before:text-fourth-color"></span>
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
