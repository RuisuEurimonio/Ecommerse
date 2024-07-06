import React from "react";
import dataFake from "@/utils/json/productsFake.json";
import CardSimple from "./CardSimple";
import { ArticleProps } from "@/types/Props";
import CardItemWrapper from "./CardWrapper";

type LatestDiscountsProps = {

}

const data = dataFake.slice(0,10);

const LatestDiscounts : React.FC<LatestDiscountsProps> = () => {

    return(
        <div className="custom_content">
            <h2 className="custom_title"> Últimos descuentos. </h2>
                <CardItemWrapper dataLength={data.length}>
                        {data.map((product : ArticleProps)=>(
                            <CardSimple key={product.id} product={product} discount/>
                        ))}
                </CardItemWrapper>
        </div>
    )
}

export default LatestDiscounts;