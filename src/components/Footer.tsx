import Image from "next/image";
import React from "react";
import logo from "@/assets/SVG/logo.svg";
import Link from "next/link";

type FooterProps ={

}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-red-mafer w-full">
            <div className="w-[90%] m-auto
                lg:w-[80%]
            ">
                <div className="flex flex-col justify-around py-5
                    xl:flex-row xl:py-7
                ">
                    <div className="flex flex-col gap-1 justify-center items-center
                        sm:flex-row sm:gap-3 xl:w-1/2
                        xl:justify-center xl:gap-5 xl:mx-5 
                    ">
                        <Image className=""
                            src={logo}
                            alt={"Logo de Centro Ferretero Mafer S.A.S."}
                            width={180}
                        />
                        <p className="block mx-5 text-justify py-4 text-sm 
                            xl:py-0
                            2xl:text-base
                        "> <span className="font-semibold">Centro Ferretero Mafer</span> es una entidad debidamente constituida, especializada en la venta de productos de ferretería en general y construcción, con el objeto de ofrecer un servicio integral a todos nuestros clientes, contamos con el personal humano mas idóneo, una infraestructura organizacional, la cual nos permite que el desarrollo de nuestro objeto social trascienda a nuestros clientes en una calidad de servicio, brindando una oportuna y efectiva atención, lo que garantiza los resultados mas confiables. </p>
                    </div>
                    <div className="flex gap-4 justify-around flex-wrap
                        sm:flex-nowrap
                        xl:gap-8 xl:justify-normal 
                    ">
                        <ul className="text-black-mafer text-sm">
                            <li className="font-bold text-base
                                xl:text-lg
                            "> Contactanos:  </li>
                            <li>
                                <h3 className="pl-1 text-sm font-semibold
                                    xl:text-base
                                "> Ubicación: </h3> 
                                <p className="pl-3 text-xs
                                    xl:text-sm
                                "> Calle 12 # 15 - 30 / Carrera 15 # 12 - 61 </p>
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
                                ">ventas@centroferreteromafer.com </p>
                            </li>
                            <li>
                                <h3 className="pl-1 text-sm font-semibold
                                    xl:text-base
                                "> Telefono: </h3> 
                                <p className="pl-3 text-xs
                                    xl:text-sm
                                ">PBX: 742 19 81 </p>
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
                        <ul className="text-black-mafer font-semibold">
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
                            "> <Link href="/JOSC"> JOSC. </Link> </li>
                        </ul> 
                        <ul className="text-black-mafer font-semibold">
                            <li className="font-bold text-base
                                xl:text-lg"> Información: </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/about-us"> Sobre nosotros.  </Link> </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/JOSC"> Nuestra marca. </Link> </li>
                            <li className="pl-1 text-sm font-semibold
                                xl:text-base
                            "> <Link href="/about-us#paymethods"> Medios de pago. </Link> </li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="relative py-3">
                    <h4 className="text-xs text-center"> © Centro Ferretero Mafer 2024. Todos los derechos reservados. Desarrollado por Ruisu's Software </h4>
                    <ul className="justify-center flex gap-5  mt-3
                        xl:absolute xl:right-0 xl:top-1/2 xl:-translate-y-1/2 xl:text-xl xl:justify-normal xl:mt-0
                    ">
                        <li> <Link target="_blank" href="https://www.instagram.com/centro_ferretero_mafer_sas"> <span className="icon icon-instagram"/> </Link> </li>
                        <li> <Link target="_blank" href="https://www.facebook.com/CentroFerreteroMaferSAS"> <span className="icon icon-facebook"/> </Link> </li>
                        <li> <Link target="_blank" href="https://www.tiktok.com/@centrofmafer"> <span className="icon icon-tiktok"/> </Link> </li>
                        <li> <Link target="_blank" href="https://centroferreteromafer.com/"> <span className="icon icon-globe"/> </Link> </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;