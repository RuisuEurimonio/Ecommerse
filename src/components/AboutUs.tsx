import Link from "next/link";

import CardItem from "./CardItem";

import {ArticleProps} from "@/types/Props";

import { getElementsByFilterName } from "@/data/api";
import CardItemWrapper from "./CardWrapper";

type AboutUsProps = {
    fullContent?: boolean
} 

const RUISU_ID = 6;

async function getData(){
    const data = await getElementsByFilterName("http://localhost:8080/api/producto/filter/marca", RUISU_ID);
    if(data){
        return data as ArticleProps[];
    }
}

const AboutUs : React.FC<AboutUsProps> = async ({fullContent = true}) => {

    const data = await getData();

    

    return(
        <div className={`${fullContent ? "custom_content" : "w-full my-2"}`}>
            <h2 className="custom_title"> Nuestra marca Ruisus. </h2>
            <p className="text-justify
                xl:text-base
            "> <span className="text-secondary-color font-bold"> Ruisus </span> es la insignia líder en productos ferreteros y de construcción, destacando por su excelente relación calidad-precio. Nuestra oferta abarca una amplia gama de productos, desde siliconas de alta calidad hasta sprays especializados y pegamentos cerámicos confiables. Cada artículo está diseñado meticulosamente para brindar un rendimiento óptimo en diversas aplicaciones. Mantenemos un compromiso firme con la calidad sin sacrificar la accesibilidad, asegurando que nuestros clientes obtengan el mejor valor por su inversión en cada producto <span className="text-secondary-color font-bold"> JOSC. </span> </p>
            {fullContent && data && (
            <>
                <CardItemWrapper dataLength={data.length}>
                    
                    {data.slice(0,8).map((item:ArticleProps)=>(
                        <CardItem key={item.id} item={item} discount={item.descuento?.activo} link={(item.descuento ? "discounts" : "product")} />
                    ))}
                </CardItemWrapper>
                <div className="flex items-center">
                    <button className="text-lg text-center bg-secondary-color hover:scale-105 transition text-third-color py-1 px-2 inline mx-auto rounded-md"> <Link href=""> Conoce más. </Link> </button>
                </div>
            </>)
            }
        </div>
    )
}


export default AboutUs;
