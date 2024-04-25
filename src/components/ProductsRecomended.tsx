import React from "react";
import CardItemWrapper from "./CardWrapper";
import { CardProductProps } from "@/types/Props";
import CardSimple from "./CardSimple";

type ProductsRecomendedProps = {
    data : CardProductProps[]
}

const ProductsRecomended : React.FC<ProductsRecomendedProps> = ({data}) => {
    return (
        <div>
                <h2 className="text-lg text-center font-bold text-red-mafer"> También te puede interesar. </h2>
                <CardItemWrapper dataLength={data.length}>
                    {data.map((product:CardProductProps) =>(
                        <CardSimple key={product.id} product={product}/>
                    ))}
                </CardItemWrapper>
            </div>
    )
}

export default ProductsRecomended;