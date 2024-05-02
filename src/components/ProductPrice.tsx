import React from "react";
import { CardProductProps } from "@/types/Props";

type ProductPriceProp = {
    data: CardProductProps;
};

const ProductPrice: React.FC<ProductPriceProp> = ({ data }) => {
    return (
        <>
            <h4
                className={`mt-2 text-red-mafer inline-block font-bold 
                            ${data?.descuento ? "xl:text-xl" : "text-2xl"}
                            ${data?.descuento ? "xl:text-2xl" : "xl:text-3xl"}
                            ${data?.descuento && "line-through"}
                        `}
            >
                {" "}
                {data?.precio ?? "Not found"}{" "}
            </h4>
            {data?.descuento && (
                <h4
                    className="no-underline text-2xl my-1 text-red-mafer font-bold 
                                    sm:inline-block sm:mx-2
                                    xl:text-3xl
                            "
                >
                    ${parseInt(data?.precio.replace("$", "")) * 0.85}
                </h4>
            )}
        </>
    );
};

export default ProductPrice;
