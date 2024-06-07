"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavBarAccountProps = {};

const NavBarAccount: React.FC<NavBarAccountProps> = () => {
    const pathName = usePathname().split("/")[2];

    console.log(pathName);

    return (
        <ul>
            <li>
                <p className="font-bold text-lg"> Personal. </p>
                <ul className="list-disc">
                    <li
                        className="ml-5 my-2"
                        style={{
                            textDecoration:
                                pathName === undefined ? "underline" : "none",
                        }}
                    >
                        {" "}
                        <Link href="/my-account">Información.</Link>{" "}
                    </li>
                </ul>
            </li>
            <li>
                <p className="font-bold text-lg">
                    {" "}
                    Configuración empresarial.{" "}
                </p>
                <ul className="list-disc">
                    <li
                        className="ml-5 my-2"
                        style={{
                            textDecoration:
                                pathName === "configuration-users"
                                    ? "underline"
                                    : "none",
                        }}
                    >
                        {" "}
                        <Link href="/my-account/configuration-users">
                            Usuarios.
                        </Link>{" "}
                    </li>
                    <li className="ml-5 my-2"
                        style={{
                            textDecoration:
                                pathName === "configuration-articles"
                                    ? "underline"
                                    : "none",
                        }}
                    >
                        {" "}
                        <Link href="/my-account/configuration-articles">
                            {" "}
                            Articulos.{" "}
                        </Link>{" "}
                    </li>
                    <li className="ml-5 my-2"
                        style={{
                            textDecoration:
                                pathName === "configuration-brand"
                                    ? "underline"
                                    : "none",
                        }}
                    >
                        {" "}
                        <Link href="/my-account/configuration-brand">
                            {" "}
                            Marcas.{" "}
                        </Link>{" "}
                    </li>
                    <li className="ml-5 my-2"> Imagenes. </li>
                </ul>
            </li>
        </ul>
    );
};

export default NavBarAccount;
