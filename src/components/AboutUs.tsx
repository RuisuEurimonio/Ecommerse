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
            "> <span className="text-secondary-color font-bold"> Ruisus </span>  es una marca de excelencia gracias a su compromiso inquebrantable con la calidad y la innovación. Desde sus inicios, Ruisu ha establecido estándares rigurosos en la selección de materiales y en los procesos de fabricación, garantizando productos duraderos y de alto rendimiento. La marca se distingue por su enfoque en la investigación y el desarrollo, lo que le permite ofrecer soluciones tecnológicas avanzadas y adaptadas a las necesidades cambiantes de sus clientes. Además, Ruisu valora la retroalimentación de sus usuarios, implementando mejoras continuas que reflejan un entendimiento profundo de las expectativas del mercado. Esta dedicación a la excelencia se traduce en productos que no solo cumplen, sino que superan las expectativas, posicionando a Ruisu como un líder confiable y respetado en la industria tecnológica. </p>
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
