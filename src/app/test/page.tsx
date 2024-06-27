"use client"

import { useEffect } from 'react';
import { PDFViewer } from "@react-pdf/renderer";
import ReactDOM from 'react-dom';
import PricePdf from "@/components/PricePdf";

export default function App() {
  useEffect(() => {
    const rootElement = document.getElementById("hola");

    const products = localStorage.getItem("products");
    const productsVerify = products ? JSON.parse(products) : [];

    if (rootElement) {
      ReactDOM.render(
        <PDFViewer className="w-full h-full">
          <PricePdf items={productsVerify} subtotal={0} discounts={0} sendPrice={0} total={0}/>
        </PDFViewer>,
        rootElement
      );
    }

  }, []);

  return (
    <div id="hola" className="w-screen h-screen">
      {/* Este contenedor se usará para montar el PDFViewer en el cliente */}
    </div>
  );
}
