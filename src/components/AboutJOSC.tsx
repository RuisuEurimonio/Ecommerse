import React from "react";
import CardItem from "./CardItem";
import {CardItemProps} from "@/types/CardItemProps";
import Link from "next/link";

type AboutJoscProps = {} 

const data = [{"id":1,"image":"http://dummyimage.com/x.png/ff4444/ffffff","nombre":"Magnotta Bel Paese Red","descripcion":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.","SKU":"783594659-9","precio":"$687685.76","marca":"Brooks Automation, Inc.","clasificacion":"Technology","descuento":false},
{"id":2,"image":"http://dummyimage.com/x.png/5fa2dd/ffffff","nombre":"Marzipan 50/50","descripcion":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.","SKU":"641515814-7","precio":"$14733.51","marca":"Scholastic Corporation","clasificacion":"Consumer Services","descuento":true},
{"id":3,"image":"http://dummyimage.com/x.png/5fa2dd/ffffff","nombre":"Napkin - Dinner, White","descripcion":"","SKU":"209362795-7","precio":"$440547.56","marca":"Gladstone Investment Corporation","clasificacion":"n/a","descuento":false},
{"id":4,"image":"http://dummyimage.com/x.png/ff4444/ffffff","nombre":"Wine - Red, Pinot Noir, Chateau","descripcion":"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.","SKU":"773036536-7","precio":"$596588.18","marca":"Quality Care Properties, Inc.","clasificacion":"Consumer Services","descuento":false},
{"id":5,"image":"http://dummyimage.com/x.png/dddddd/000000","nombre":"Cookies - Assorted","descripcion":"In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.","SKU":"440940613-2","precio":"$136914.67","marca":"Brooks Automation, Inc.","clasificacion":"Technology","descuento":false},
{"id":6,"image":"http://dummyimage.com/x.png/5fa2dd/ffffff","nombre":"Wine - Ice Wine","descripcion":"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.","SKU":"144041094-1","precio":"$489925.12","marca":"Chiasma, Inc.","clasificacion":"Health Care","descuento":false},
{"id":7,"image":"http://dummyimage.com/x.png/ff4444/ffffff","nombre":"Chocolate - Sugar Free Semi Choc","descripcion":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.","SKU":"135235155-2","precio":"$669368.31","marca":"Codexis, Inc.","clasificacion":"Basic Industries","descuento":false},
{"id":8,"image":"http://dummyimage.com/x.png/cc0000/ffffff","nombre":"Wine - White, Pinot Grigio","descripcion":"","SKU":"381256582-X","precio":"$311336.72","marca":"Boeing Company (The)","clasificacion":"Capital Goods","descuento":true},
{"id":9,"image":"http://dummyimage.com/x.png/cc0000/ffffff","nombre":"Pasta - Lasagne, Fresh","descripcion":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.","SKU":"807136402-9","precio":"$272997.71","marca":"Calumet Specialty Products Partners, L.P.","clasificacion":"Energy","descuento":true},
{"id":10,"image":"http://dummyimage.com/x.png/cc0000/ffffff","nombre":"Island Oasis - Ice Cream Mix","descripcion":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.","SKU":"109542568-4","precio":"$794975.88","marca":"Internap Corporation","clasificacion":"Technology","descuento":true}]

const AboutJosc : React.FC<AboutJoscProps> = () => {
    return(
        <div className="my-3 w-11/12 mx-auto
            2xl:w-4/5">
            <h2 className="text-lg text-center text-blue-mafer font-bold
                xl:text-2xl
            "> Nuestra marca JOSC. </h2>
            <p className="text-justify
                xl:text-lg
            "> <span className="text-blue-mafer font-bold"> JOSC </span> es la insignia líder en productos ferreteros y de construcción, destacando por su excelente relación calidad-precio. Nuestra oferta abarca una amplia gama de productos, desde siliconas de alta calidad hasta sprays especializados y pegamentos cerámicos confiables. Cada artículo está diseñado meticulosamente para brindar un rendimiento óptimo en diversas aplicaciones. Mantenemos un compromiso firme con la calidad sin sacrificar la accesibilidad, asegurando que nuestros clientes obtengan el mejor valor por su inversión en cada producto JOSC. </p>
            <div className="my-3 flex flex-wrap gap-4">
                {data.slice(0,8).map((item:CardItemProps)=>(
                    <CardItem key={item.id} item={item}/>
                ))}
            </div>
            <div className="flex items-center">
                <button className="text-lg text-center bg-red-mafer/85 hover:bg-red-mafer transition text-black-mafer py-1 px-2 inline mx-auto rounded-md"> <Link href=""> Conoce más. </Link> </button>
            </div>
        </div>
    )
}

export default AboutJosc;
