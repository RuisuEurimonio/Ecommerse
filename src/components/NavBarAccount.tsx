"use client";

import { havePermission } from "@/auth/security";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavBarAccountProps = {};

const urlLinks : {url: string, name: string}[] = [
    {url: "configuration-users", name: "Usuarios."},
    {url: "configuration-articles", name: "Articulos."},
    {url: "configuration-brand", name: "Marcas."},
    {url: "configuration-category", name: "Categorias."},
    {url: "configuration-clasifications", name: "Clasificaciones."},
    {url: "configuration-discounts", name: "Descuentos."},
]

const NavBarAccount: React.FC<NavBarAccountProps> = () => {
    const pathName = usePathname().split("/")[2];

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
                        
                        <Link href="/my-account">Información.</Link>
                    </li>
                </ul>
            </li>
            <li>
                {havePermission() && <>
                    <p className="font-bold text-lg">
                        Configuración empresarial.
                    </p>
                    <ul className="list-disc">
                        {urlLinks.map((item)=>(
                            <li
                                key={item.url}
                                className="ml-5 my-2"
                                style={{
                                    textDecoration:
                                        pathName === item.url
                                            ? "underline"
                                            : "none",
                                }}
                            >
                                <Link href={`/my-account/${item.url}`}>
                                    {item.name}
                                </Link>
                            </li>

                        ))}
                        <li className="ml-5 my-2"> Imagenes. </li>
                    </ul>
                </>
                }
            </li>
        </ul>
    );
};

export default NavBarAccount;
