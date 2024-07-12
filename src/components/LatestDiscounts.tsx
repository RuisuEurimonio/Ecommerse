import React from "react";
import CardSimple from "./CardSimple";
import { ArticleProps } from "@/types/Props";
import CardItemWrapper from "./CardWrapper";
import { getElementsApi } from "@/data/api";
import DataNotFoundMessage from "./DataNotFoundMessage";

type LatestDiscountsProps = {

}

async function get(){
    const data = await getElementsApi("http://localhost:8080/api/producto/all");
    if(data){
        let res : ArticleProps[] = [];
        data.forEach((item:ArticleProps)=>{
            if(item.descuento?.activo){
                res.push(item);
            }
        })
        return res as ArticleProps[];
    }
}

const LatestDiscounts : React.FC<LatestDiscountsProps> = async () => {

    const data = await get();

    return(
        <div className="custom_content">
            <h2 className="custom_title text-fifth-color"> Últimos descuentos. </h2>
            {data?.length ?
                <CardItemWrapper dataLength={data.length}>
                        {data.map((product : ArticleProps)=>(
                            <CardSimple key={product.id} product={product} discount/>
                        ))}
                </CardItemWrapper>
                :
                <DataNotFoundMessage title="No hay productos" text="No se encontraron productos, vuelvelo a intentar más tarde." />
            }
        </div>
    )
}

export default LatestDiscounts;