import Image from "next/image";

import Experiencie from "@/components/Experiencie";
import PayMethods from "@/components/PayMethods";
import OurOffices from "@/components/OurOffices";
import Reviews from "@/components/Reviews";

import image from "@/assets/img/Fachadas-MAFER-5.png";

type AboutUsProps = {}

const AboutUs : React.FC<AboutUsProps> = ( ) => {
    return(
        <>
            <Image src={image} alt="" className="w-full h-[50vh] object-bottom object-cover" priority={false} loading="lazy"/>
            <div className="w-11/12 mx-auto  my-2
                md:w-4/5">
                <h2 className="text-center text-blue-mafer font-bold text-2xl"> Centro Ferretero Mafer SAS</h2>
                <p className="text-justify"> Se constituyo el 29 de Septiembre de 2.003 bajo escritura publica No 3901 de la notaria doce (12) de Bogotá, D.C. e inscrito en la cámara de comercio el 20 de Octubre de 2.003 con matrícula No. 01316985, abarcando gran parte del mercado de Bogotá, D.C. </p>
                <div className="flex flex-col gap-2 my-2
                    lg:flex-row lg:gap-4"
                >
                    <div>
                        <h3 className="text-xl text-blue-mafer font-bold
                            lg:text-center"> Misión: </h3>
                        <p className="text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aspernatur illo rem voluptates maxime quod suscipit reiciendis labore totam. Quasi doloremque, consequatur quis unde doloribus quo voluptates porro error nisi natus, dignissimos animi, magnam iure esse odit explicabo. Impedit consequatur qui provident non fuga quaerat nihil deserunt quidem blanditiis nobis, voluptas aliquid dolores necessitatibus officiis, consequuntur a tempora, sunt cum assumenda! Sed nobis exercitationem libero optio sit ullam fuga illo quis dolore ex! Quaerat neque debitis totam magnam eius doloremque dolorem animi blanditiis quam libero eligendi, nesciunt necessitatibus. Excepturi molestias ipsam voluptates ipsum quidem, aliquam numquam repellat vel asperiores harum?</p>
                    </div>
                    <div>
                        <h3 className="text-xl text-blue-mafer font-bold
                            lg:text-center"> Visión: </h3>
                        <p className="text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aspernatur illo rem voluptates maxime quod suscipit reiciendis labore totam. Quasi doloremque, consequatur quis unde doloribus quo voluptates porro error nisi natus, dignissimos animi, magnam iure esse odit explicabo. Impedit consequatur qui provident non fuga quaerat nihil deserunt quidem blanditiis nobis, voluptas aliquid dolores necessitatibus officiis, consequuntur a tempora, sunt cum assumenda! Sed nobis exercitationem libero optio sit ullam fuga illo quis dolore ex! Quaerat neque debitis totam magnam eius doloremque dolorem animi blanditiis quam libero eligendi, nesciunt necessitatibus. Excepturi molestias ipsam voluptates ipsum quidem, aliquam numquam repellat vel asperiores harum?</p>
                    </div>
                </div>
                <Experiencie/>
                <PayMethods id="paymethods" />
                <OurOffices/>
                <Reviews/>
            </div>
        </>
    )
}

export default AboutUs;