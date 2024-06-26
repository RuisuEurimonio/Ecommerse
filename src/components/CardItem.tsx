"use client"

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CardProductProps } from "@/types/Props";
import { askForEditProduct, askForSaveProduct } from "./utils";

    type CardItemProps = {
        item: CardProductProps,
        discount?: boolean,
        itemCart?: boolean,
        cantidad?: number,
        index?: number,
        functionFather?: () => void;
        link: string,
    };

const CardItem: React.FC<CardItemProps> = ({
    item,
    discount = false,
    itemCart = false,
    cantidad = 0,
    index = -1,
    functionFather = () => {},
    link,
}) => {
    return (
        <div className="flex-[20%] flex flex-col justify-between min-w-32">
            <div className="relative">
                {discount && (
                    <React.Fragment>
                        <span className="absolute top-0 right-0 border-[1.5rem] w-0 h-0 border-red-mafer border-l-transparent border-b-transparent"/>
                        <span className="absolute top-0.8 right-1 font-bold text-lg"> % </span>
                    </React.Fragment>
                )}
                <div className="w-full">
                    <Image
                        src={item.image}
                        alt="image not found"
                        width={400}
                        height={150}
                        style={{ width: "400px"}} // style attribute fix the Image component error 
                        className="m-auto object-cover"
                    />
                </div>
                <p
                    className="text-sm mt-2 line-clamp-1
                    xl:text-base"
                >
                    {item.id} {item.clasificacion}
                </p>
                <p
                    className="text-base font-semibold
                    xl:text-lg"
                >
                    {item.nombre}
                </p>
                <p
                    className="text-ellipsis overflow-hidden text-xs line-clamp-3
                    xl:text-sm"
                >
                    {item.descripcion}
                </p>
            </div>
            <div
                className="flex text-sm flex-col-reverse items-center m-1
                lg:flex-row lg:gap-2 lg:text-center
                xl:text-lg
                2xl:text-base"
            >
                {!itemCart ?
                <>
                    <button
                        className="bg-blue-mafer/80 hover:bg-blue-mafer text-white-mafer py-1 px-2 rounded-md transition
                        lg:text-xs
                        2xl:text-sm"
                        onClick={()=> askForSaveProduct(item) }
                    >
                        Agregar al carrito
                    </button>
                    <Link
                        href={`/${link}/${item.id}`}
                        className="hover:underline
                        lg:text-xs
                        2xl:text-sm"
                    >
                        Más información.
                    </Link>
                </>
                :
                <>
                    <button
                            className="bg-blue-mafer/80 hover:bg-blue-mafer text-white-mafer py-1 px-2 rounded-md transition
                            lg:text-xs
                            2xl:text-sm"
                            onClick={()=> askForEditProduct(item, index, functionFather, cantidad) }
                        >
                            Modificar
                    </button>
                    <h3> Cantidad: {cantidad} </h3>
                </>
                }
            </div>
        </div>
    );
};

export default CardItem;
