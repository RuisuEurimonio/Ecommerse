import Image from "next/image";
import React from "react";
import logo from "@/assets/SVG/logo.svg";
import Link from "next/link";

type FooterProps ={

}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-red-mafer w-full">
            <div className="w-[80%] m-auto">
                <div className="flex justify-around py-7">
                    <div className="flex items-center mx-5 gap-10">
                        <Image 
                            src={logo}
                            alt={"Logo de Centro Ferretero Mafer S.A.S."}
                            width={250}
                        />
                        <p className="block max-w-[400px] mx-5 text-justify text-sm"> <span className="font-semibold">Centro Ferretero Mafer</span> es una entidad debidamente constituida, especializada en la venta de productos de ferretería en general y construcción, con el objeto de ofrecer un servicio integral a todos nuestros clientes, contamos con el personal humano mas idóneo, una infraestructura organizacional, la cual nos permite que el desarrollo de nuestro objeto social trascienda a nuestros clientes en una calidad de servicio, brindando una oportuna y efectiva atención, lo que garantiza los resultados mas confiables. </p>
                    </div>
                    <div className="flex gap-8">
                        <ul className="text-black-mafer text-sm">
                            <li className="font-bold text-xl"> Contactanos:  </li>
                            <li>
                                <h3 className="pl-1 text-base font-semibold"> Ubicación: </h3> 
                                <p className="pl-3"> Calle 12 # 15 - 30 / Carrera 15 # 12 - 61 </p>
                                <p className="pl-3"> Bogotá Colombia. </p>
                            </li>
                            <li>
                                <h3 className="pl-1 text-base font-semibold"> Correo: </h3> 
                                <p className="pl-3">ventas@centroferreteromafer.com </p>
                            </li>
                            <li>
                                <h3 className="pl-1 text-base font-semibold"> Telefono: </h3> 
                                <p className="pl-3">PBX: 742 19 81 </p>
                            </li>
                            <li> 
                                <h3 className="pl-1 text-base font-semibold"> Horario: </h3>
                                <p className="pl-3"> Lunes - Viernes / 7:00 AM - 5:00 PM.</p>
                                <p className="pl-3"> Sábado /7:00 AM - 4:00 PM. </p>
                            </li>
                        </ul>
                        <ul className="text-black-mafer font-semibold">
                            <li className="font-bold text-xl"> Tienda: </li>
                            <li> <Link href="/productos"> Productos. </Link> </li>
                            <li> <Link href="/"> Marcas. </Link> </li>
                            <li> <Link href="/"> Categorias. </Link> </li>
                            <li> <Link href="/"> Descuentos. </Link> </li>
                            <li> <Link href="/"> JOSC. </Link> </li>
                        </ul> 
                        <ul className="text-black-mafer font-semibold">
                            <li className="font-bold text-xl"> Información: </li>
                            <li> <Link href="/about"> Sobre nosotros.  </Link> </li>
                            <li> <Link href="/josc"> Nuestra marca. </Link> </li>
                            <li> <Link href="/"> Medios de pago. </Link> </li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="relative py-3">
                    <h4 className="text-xs text-center"> © Centro Ferretero Mafer 2024. Todos los derechos reservados. Desarrollado por Ruisu's Software </h4>
                    <ul className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-5 text-xl">
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