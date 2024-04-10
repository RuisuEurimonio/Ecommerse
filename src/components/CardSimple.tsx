import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardProductProps } from "@/types/Props";
import imageNotFound from "@/assets/img/imageNotFound.jpg"

const CardSimple : React.FC<{product:CardProductProps}> = (
    {product}
) => {
    return(
        <li className="flex-1 bg-black-mafer/5 min-w-[10rem]">
            <Image src={imageNotFound} alt="Image not found"/>
            <div className="px-2">
                <h3 className="font-bold"> {product.nombre} </h3>
                <div className="flex items-center w-11/12 justify-between gap-1 m-auto">
                    <p className="text-sm flex-grow"> {product.id} {product.descripcion.slice(0,50)+". . ."} </p>
                    <button className="bg-blue-mafer flex-grow-0 p-2 rounded-full min-w-8 min-h-8">
                        <Link href=""> <span className="icon icon-arrowr before:text-white-mafer before:content-['\e90a'] "/> </Link>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default CardSimple;