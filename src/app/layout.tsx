import "./globals.css";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import Navbar from "@/components/Navbar";
const UnderLineNav = dynamic(()=> import("@/components/UnderLineNav") , {ssr : false});
import Footer from "@/components/Footer";
import logo from "@/assets/img/logotipo-sin-fondo.ico"
import dynamic from "next/dynamic";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ruisu's Software",
  description: "Somos una tienda de cómputo dedicada a proporcionar soluciones tecnológicas innovadoras y de alta calidad. Nuestro propósito es equipar a individuos y empresas con el mejor software y hardware disponible, facilitando su acceso a herramientas esenciales para la productividad y el entretenimiento. Ofrecemos una amplia gama de productos, desde software especializado hasta componentes de hardware, respaldados por un servicio al cliente excepcional y soporte técnico experto para garantizar la satisfacción y el éxito de nuestros clientes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={logo.src} sizes="any" />
      </head>
      <body className={openSans.className}>
        <Navbar/>
        <UnderLineNav/>
        {children}
        <UnderLineNav/>
        <Footer/>
      </body>
    </html>
  );
}
