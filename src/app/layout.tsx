import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UnderLineNav from "@/components/UnderLineNav";
import Footer from "@/components/Footer";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Centro Ferretero Mafer – Su distribuidor de Confianza",
  description: "Centro Ferretero Mafer S.A.S, es una entidad debidamente constituida, especializada en la venta de productos de ferretería en general y construcción, con el objeto de ofrecer un servicio integral a todos nuestros clientes, contamos con el personal humano mas idóneo, una infraestructura organizacional, la cual nos permite que el desarrollo de nuestro objeto social trascienda a nuestros clientes en una calidad de servicio, brindando una oportuna y efectiva atención, lo que garantiza los resultados mas confiables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
