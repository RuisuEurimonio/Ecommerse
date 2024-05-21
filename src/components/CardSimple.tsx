import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CardProductProps, NewsLetterProps } from "@/types/Props";
import imageNotFound from "@/assets/img/imageNotFound.jpg";

type CardSimpleProps = {
    product?: CardProductProps;
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
            className={`bg-black-mafer/5 min-w-[10rem] flex flex-col justify-between
            ${newsletter ? "" : "flex-1"}
            
        `}
        >
            <Link href="">
                <div className="relative">
                    {discount && (
                        <React.Fragment>
                            <span className="absolute top-0 right-0 border-[1.5rem] w-0 h-0 border-red-mafer border-l-transparent border-b-transparent">
                                {" "}
                            </span>
                            <span className="absolute top-0.8 right-1 font-bold text-lg">
                                {" "}
                                %{" "}
                            </span>
                        </React.Fragment>
                    )}
                    <Image
                        src={product?.image || newsletter?.img || imageNotFound}
                        alt="Image not found"
                        width={400}
                        height={150}
                        style={{ width: "500px" }} // style attribute fix the Image component error
                        className="m-auto object-cover"
                    />
                </div>
                <div className="px-2">
                    <h3 className="font-bold">
                        {" "}
                        {product?.nombre || newsletter?.title}{" "}
                    </h3>
                    {newsletter && (
                        <h4 className=""> {newsletter.Subtitle} </h4>
                    )}
                    <p className="text-sm flex-grow line-clamp-3">
                        {" "}
                        {product?.descripcion || newsletter?.text}{" "}
                    </p>
                </div>
            </Link>
            <button
                className="bg-blue-mafer/80 hover:bg-blue-mafer text-white-mafer py-1 px-2 rounded-md transition w-4/5 mx-auto mb-2 text-xs
            lg:text-sm
        "
            >
                {" "}
                {newsletter ? "Mas información" : "Agregar al carrito"}{" "}
            </button>
        </li>
    );
};

export default CardSimple;
