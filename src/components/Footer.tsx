
import React from "react";
import logo from "@/assets/SVG/logo.svg";
import Link from "next/link";
import Image from "next/image";

type FooterProps ={

}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-principal-color w-full">
            <div className="w-[90%] m-auto
                lg:w-[80%]
            ">
                <div className="flex flex-col justify-between py-5
                    xl:flex-row xl:py-7
                ">
                    <div className="flex-1 justify-center items-center w-full h-full
                        sm:flex 
                    ">
                        <div className="w-4/5 h-full bg-black rounded-md p-2 m-auto
                            sm:w-4/12">
                            <Image
                                src={logo}
                                alt={"Logo de Centro Ferretero Mafer S.A.S."}
                                width={0}
                                height={0}
                                sizes="500"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <p className="block mx-5 text-justify py-4 text-sm 
                            sm:w-8/12
                            xl:py-0
                            2xl:text-base
                        "> <span className="font-semibold">Ruisu's Software</span> es una tienda de cómputo dedicada a proporcionar soluciones tecnológicas innovadoras y de alta calidad. Nuestro propósito es equipar a individuos y empresas con el mejor software y hardware disponible, facilitando su acceso a herramientas esenciales para la productividad y el entretenimiento. Ofrecemos una amplia gama de productos, desde software especializado hasta componentes de hardware, respaldados por un servicio al cliente excepcional y soporte técnico experto para garantizar la satisfacción y el éxito de nuestros clientes. </p>
                    </div>
                    <div className="flex-1 flex-wrap flex items-center
                        sm:flex-nowrap sm:items-start
                        xl:justify-normal 
                    ">
                        <ul className="text-fourth-color text-sm text-center basis-full">
                            <li className="font-bold text-base
                                xl:text-lg
                            "> Contactanos:  </li>
                            <li>
                                <h3 className="pl-1 text-sm font-semibold
                                    xl:text-base
                                "> Ubicación: </h3> 
                                <p className="pl-3 text-xs
                                    xl:text-sm
                                "> Éngativa </p>
                                <p className="pl-3 text-xs
                                    xl:text-sm
                                "> Bogotá Colombia. </p>
                            </li>
                            <li>
                                <h3 className="pl-1 text-sm font-semibold
                                    xl:text-base
                                "> Correo: </h3> 
                                <p className="pl-3 text-xs
                                    xl:text-sm
                                "> soporte@ruisussoftware.com </p>
                            </li>
                            <li>
                                <h3 className="pl-1 text-sm font-semibold
                                    xl:text-base
                                "> Telefono: </h3> 
                                <p className="pl-3 text-xs
                                    xl:text-sm
                                ">PBX: 601 9494 </p>
                            </li>
                            <li> 
                                <h3 className="pl-1 text-sm font-semibold
                                    xl:text-base
                                "> Horario: </h3>
                                <p className="pl-3 text-xs
                                    xl:text-sm
                                "> Lunes - Viernes / 7:00 AM - 5:00 PM.</p>
                                <p className="pl-3 text-xs
                                    xl:text-sm
                                "> Sábado /7:00 AM - 4:00 PM. </p>
                            </li>
                        </ul>
                        <ul className="text-fourth-color font-semibold text-center basis-1/2">
                            <li className="font-bold text-base
                                xl:text-lg"> Tienda: </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/products"> Productos. </Link> </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/products"> Marcas. </Link> </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/products"> Categorias. </Link> </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/discounts"> Descuentos. </Link> </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/ruisus"> Marca Propia. </Link> </li>
                        </ul> 
                        <ul className="text-fourth-color font-semibold text-center basis-1/2">
                            <li className="font-bold text-base
                                xl:text-lg"> Información: </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/about-us"> Sobre nosotros.  </Link> </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/ruisus"> Nuestra marca. </Link> </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/about-us#paymethods"> Medios de pago. </Link> </li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="relative py-3">
                    <h4 className="text-xs text-center"> © Ruisu's Software 2024. Todos los derechos reservados. </h4>
                    <ul className="justify-center flex gap-5  mt-3
                        xl:absolute xl:right-0 xl:top-1/2 xl:-translate-y-1/2 xl:text-xl xl:justify-normal xl:mt-0
                    ">
                        <li> <Link target="_blank" href="https://www.instagram.com"> <span className="icon icon-instagram"/> </Link> </li>
                        <li> <Link target="_blank" href="https://www.facebook.com"> <span className="icon icon-facebook"/> </Link> </li>
                        <li> <Link target="_blank" href="https://www.tiktok.com"> <span className="icon icon-tiktok"/> </Link> </li>
                        <li> <Link target="_blank" href="https://github.com/RuisuEurimonio"> <span className="icon icon-globe"/> </Link> </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;