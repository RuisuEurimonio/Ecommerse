import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardProductProps } from "@/types/Props";
import imageNotFound from "@/assets/img/imageNotFound.jpg"

type CardItemProps = {
    item : CardProductProps,
    discount?: boolean,
    link: string
}

const CardItem : React.FC<CardItemProps> = ({item, discount = false, link}) => {
    return(
        <div className="flex-[20%] flex flex-col justify-between min-w-32">
            <div className="">
                <div className="w-full">
                    <Image src={imageNotFound} alt="image not found"/>
                </div>
                <p className="text-sm mt-2 line-clamp-1
                    xl:text-base
                "> {item.id} {item.clasificacion} </p>
                <p className="text-base font-semibold
                    xl:text-lg
                "> {item.nombre} </p>
                <p className="text-ellipsis overflow-hidden text-xs line-clamp-3
                    xl:text-sm
                "> {item.descripcion} </p>
            </div>
            <div className="flex text-sm flex-col-reverse items-center m-1
                lg:flex-row lg:gap-2 lg:text-center
                xl:text-lg
                2xl:text-base
            ">
                <button className="bg-blue-mafer/80 hover:bg-blue-mafer text-white-mafer py-1 px-2 rounded-md transition
                    lg:text-xs
                    2xl:text-sm
                "> Agregar al carrito </button>
                <Link href={`/${link}/${item.id}`} className="hover:underline
                    lg:text-xs
                    2xl:text-sm
                "> Más información. </Link>
            </div>
            
        </div>
    )
}

export default CardItem;