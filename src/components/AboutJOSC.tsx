import React from "react";
import CardItem from "./CardItem";
import {CardProductProps} from "@/types/Props";
import Link from "next/link";
import dataFake from "@/utils/json/productsFake.json";

type AboutJoscProps = {} 

const data = dataFake;

const AboutJosc : React.FC<AboutJoscProps> = () => {
    return(
        <div className="custom_content">
            <h2 className="custom_title"> Nuestra marca JOSC. </h2>
            <p className="text-justify
                xl:text-base
            "> <span className="text-blue-mafer font-bold"> JOSC </span> es la insignia líder en productos ferreteros y de construcción, destacando por su excelente relación calidad-precio. Nuestra oferta abarca una amplia gama de productos, desde siliconas de alta calidad hasta sprays especializados y pegamentos cerámicos confiables. Cada artículo está diseñado meticulosamente para brindar un rendimiento óptimo en diversas aplicaciones. Mantenemos un compromiso firme con la calidad sin sacrificar la accesibilidad, asegurando que nuestros clientes obtengan el mejor valor por su inversión en cada producto JOSC. </p>
            <div className="my-3 flex flex-wrap gap-4">
                {data.slice(0,8).map((item:CardProductProps)=>(
                    <CardItem key={item.id} item={item} discount={item.descuento} link={(item.descuento ? "discounts" : "product")} />
                ))}
            </div>
            <div className="flex items-center">
                <button className="text-lg text-center bg-red-mafer/85 hover:bg-red-mafer transition text-black-mafer py-1 px-2 inline mx-auto rounded-md"> <Link href=""> Conoce más. </Link> </button>
            </div>
        </div>
    )
}

export default AboutJosc;
