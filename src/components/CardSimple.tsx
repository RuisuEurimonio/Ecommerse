import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardProductProps } from "@/types/Props";
import imageNotFound from "@/assets/img/imageNotFound.jpg"

const CardSimple : React.FC<{product:CardProductProps}> = (
    {product}
) => {
    return(
        <li className="flex-1 bg-black-mafer/5 min-w-[10rem] flex flex-col justify-between">
            <Link href="">
                <div className="relative">
                    <div className="absolute top-0 right-0 border-[1.5rem] w-0 h-0 border-red-mafer border-l-transparent border-b-transparent"> </div>
                    <span className="absolute top-0.8 right-1 font-bold text-lg"> % </span>
                    <Image src={imageNotFound} alt="Image not found"/>
                </div>
                <div className="px-2">
                    <h3 className="font-bold"> {product.nombre} </h3>
                    <p className="text-sm flex-grow line-clamp-3"> {product.descripcion} </p>
                </div>
            </Link>
        <button className="bg-blue-mafer/80 hover:bg-blue-mafer text-white-mafer py-1 px-2 rounded-md transition w-4/5 mx-auto mb-2 text-xs
            lg:text-sm
        "> Agregar al carrito </button>
        </li>
    )
}

export default CardSimple;