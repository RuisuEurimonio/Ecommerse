"use client"

import { useEffect } from 'react';
import { PDFViewer } from "@react-pdf/renderer";
import ReactDOM from 'react-dom';
import PricePdf from "@/components/PricePdf";

export default function App() {
  useEffect(() => {
    const rootElement = document.getElementById("hola");
    if (rootElement) {
      ReactDOM.render(
        <PDFViewer className="w-full h-full">
          <PricePdf />
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
