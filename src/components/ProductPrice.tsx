import React from "react";
import { ArticleProps } from "@/types/Props";
import { moneyFormatter } from "./utils";

type ProductPriceProp = {
    data: ArticleProps;
};

const ProductPrice: React.FC<ProductPriceProp> = ({ data }) => {
    return (
        <>
            <h4
                className={`mt-2 text-principal-color inline-block font-bold 
                            ${data.descuento ? "xl:text-xl" : "text-2xl"}
                            ${data.descuento ? "xl:text-2xl" : "xl:text-3xl"}
                            ${data.descuento && "line-through"}
                        `}
            >
                {moneyFormatter(data.precio)}
            </h4>
            {data.descuento && (
                <>
                    <h4
                        className="no-underline text-2xl my-1 text-fifth-color font-bold 
                                        sm:inline-block sm:mx-2
                                        xl:text-3xl
                                "
                    >
                        {moneyFormatter(data.precio * ((100 - data.descuento.porcentaje) / 100))} <span className="text-sm font-bold underline"> {data.descuento.porcentaje}% OFF </span>
                    </h4>
                </>
            )}
        </>
    );
};

export default ProductPrice;
