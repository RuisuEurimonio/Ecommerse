import Link from "next/link";

import CardItem from "./CardItem";

import {ArticleProps} from "@/types/Props";

import dataFake from "@/utils/json/productsFake.json";

type AboutJoscProps = {
    fullContent?: boolean
} 

const data = dataFake;  //TODO : delete this when we implement fetch data

const AboutJosc : React.FC<AboutJoscProps> = ({fullContent = true}) => {
    return(
        <div className={`${fullContent ? "custom_content" : "w-full my-2"}`}>
            <h2 className="custom_title"> Nuestra marca JOSC. </h2>
            <p className="text-justify
                xl:text-base
            "> <span className="text-blue-mafer font-bold"> JOSC </span> es la insignia líder en productos ferreteros y de construcción, destacando por su excelente relación calidad-precio. Nuestra oferta abarca una amplia gama de productos, desde siliconas de alta calidad hasta sprays especializados y pegamentos cerámicos confiables. Cada artículo está diseñado meticulosamente para brindar un rendimiento óptimo en diversas aplicaciones. Mantenemos un compromiso firme con la calidad sin sacrificar la accesibilidad, asegurando que nuestros clientes obtengan el mejor valor por su inversión en cada producto <span className="text-blue-mafer font-bold"> JOSC. </span> </p>
            {fullContent && (
            <>
                <div className="my-3 flex flex-wrap gap-4">
                    {data.slice(0,8).map((item:ArticleProps)=>(
                        <CardItem key={item.id} item={item} discount={item.descuento} link={(item.descuento ? "discounts" : "product")} />
                    ))}
                </div>
                <div className="flex items-center">
                    <button className="text-lg text-center bg-red-mafer/85 hover:bg-red-mafer transition text-black-mafer py-1 px-2 inline mx-auto rounded-md"> <Link href=""> Conoce más. </Link> </button>
                </div>
            </>)
            }
        </div>
    )
}

export default AboutJosc;
