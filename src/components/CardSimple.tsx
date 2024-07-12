"use client"

import Image from "next/image";
import Link from "next/link";

import React from "react";

import { ArticleProps, NewsLetterProps } from "@/types/Props";

import imageNotFound from "@/assets/img/imageNotFound.jpg";
import { askForSaveProduct } from "./utils";

type CardSimpleProps = {
    product?: ArticleProps;
    discount?: boolean;
    newsletter?: NewsLetterProps;
};

const CardSimple: React.FC<CardSimpleProps> = ({
    product,
    discount = false,
    newsletter,
}) => {

    return (
        <li
            className={`bg-fourth-color/5 min-w-[10rem] flex flex-col justify-between max-w-40
            ${newsletter ? "" : "flex-1"}`}
        >
            <Link href={ product ? ("/products/"+product.id+"?name="+product.nombre) : ("/events/"+newsletter?.id)}> 
                <div className="relative">
                    {discount && (
                        <React.Fragment>
                            <span className="absolute top-0 right-0 border-[1.5rem] w-0 h-0 border-fifth-color border-l-transparent border-b-transparent" />
                            <span className="absolute top-0.8 right-1 font-bold text-lg"> % </span>
                        </React.Fragment>
                    )}
                    <Image
                        src={product?.imagen || newsletter?.img || imageNotFound}
                        alt="Image not found"
                        width={0}
                        height={0}
                        sizes="300"
                        style={{ width: 400, height: 150}} 
                        className="m-auto object-cover"
                        priority={false}
                    />
                </div>
                <div className="px-2">
                    <h3 className="font-bold">
                        {product?.nombre || newsletter?.title}
                    </h3>
                    {newsletter && (
                        <h4 className=""> {newsletter.Subtitle} </h4>
                    )}
                    <p className="text-sm flex-grow line-clamp-3">
                        {product?.descripcion || newsletter?.text}
                    </p>
                </div>
            </Link>
            {product && <button
                className="bg-secondary-color/80 hover:bg-secondary-color text-third-color py-1 px-2 rounded-md transition w-4/5 mx-auto mb-2 text-xs
                    lg:text-sm"
                    onClick={()=> {product ? askForSaveProduct(product) : ""} }
            >
                Agregar al carrito
            </button>}

            {newsletter && <Link
                className="bg-secondary-color/80 hover:bg-secondary-color text-third-color py-1 px-2 rounded-md transition w-4/5 mx-auto mb-2 text-xs text-center
                    lg:text-sm"
                    href={"/events/"+newsletter.id}
            >
                Agregar al carrito
            </Link>}
        </li>
    );
};

export default CardSimple;
