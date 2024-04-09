import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardItemProps } from "@/types/CardItemProps";
import imageNotFound from "@/assets/img/imageNotFound.jpg"

const CardItem : React.FC<{item : CardItemProps}> = ({item}) => {
    return(
        <div className="flex-[20%] flex flex-col justify-between min-w-32">
            <div className="">
                <div className="w-full">
                    <Image src={imageNotFound} alt="image not found"/>
                </div>
                <p className="text-sm mt-2
                    xl:text-lg
                "> {item.clasificacion} </p>
                <p className="text-base font-semibold
                    xl:text-xl
                "> {item.nombre} </p>
                <p className="text-ellipsis overflow-hidden text-xs
                    xl:text-base
                "> {item.descripcion} </p>
            </div>
            <div className="flex text-sm flex-col-reverse items-center m-1
                lg:flex-row lg:gap-2 lg:text-center
                xl:text-lg
            ">
                <button className="bg-blue-mafer/80 hover:bg-blue-mafer text-white-mafer py-1 px-2 rounded-md transition"> Agregar al carrito </button>
                <Link href="" className="hover:underline"> Más información. </Link>
            </div>
            
        </div>
    )
}

export default CardItem;