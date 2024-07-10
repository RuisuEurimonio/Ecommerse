import Image from "next/image";

import Experiencie from "@/components/Experiencie";
import PayMethods from "@/components/PayMethods";
import OurOffices from "@/components/OurOffices";
import Reviews from "@/components/Reviews";

import image from "@/assets/img/about-us.jpg";

type AboutUsProps = {}

const AboutUs : React.FC<AboutUsProps> = ( ) => {
    return(
        <>
            <Image src={image} alt="" className="w-full h-[50vh] object-bottom object-cover" priority={false} loading="lazy"/>
            <div className="w-11/12 mx-auto  my-2
                md:w-4/5">
                <h2 className="text-center text-fourth-color font-bold text-2xl"> Ruisu's Software. </h2>
                <p className="text-justify"> Fundada en 2024, nació con la visión de revolucionar el mercado tecnológico. En sus inicios, la compañía se centró en proporcionar soluciones innovadoras y accesibles para empresas y usuarios individuales, combinando tecnología avanzada con un servicio al cliente excepcional. Desde su creación, Ruisu's Software ha trabajado incansablemente para establecerse como líder en la industria. </p>
                <div className="flex flex-col gap-2 my-2
                    lg:flex-row lg:gap-4"
                >
                    <div>
                        <h3 className="text-xl text-fourth-color font-bold
                            lg:text-center"> Misión: </h3>
                        <p className="text-justify">Nuestra misión en Ruisu's Software es desarrollar y entregar soluciones de software de alta calidad que satisfagan las necesidades únicas de cada cliente. Nos dedicamos a ofrecer productos innovadores que simplifiquen procesos complejos, mejoren la eficiencia operativa y fomenten la transformación digital. Trabajamos con pasión y dedicación, colaborando estrechamente con nuestros clientes para entender sus desafíos y proporcionarles soluciones que superen sus expectativas. Valoramos la excelencia, la integridad y el compromiso con el cliente, y nos esforzamos por crear un entorno de trabajo inspirador y colaborativo para nuestros empleados. A través de nuestra misión, buscamos no solo satisfacer a nuestros clientes, sino también contribuir al desarrollo tecnológico y al bienestar de la comunidad global.</p>
                    </div>
                    <div>
                        <h3 className="text-xl text-fourth-color font-bold
                            lg:text-center"> Visión: </h3>
                        <p className="text-justify">En Ruisu's Software, nuestra visión es ser reconocidos como líderes mundiales en innovación tecnológica y soluciones de software personalizadas. Aspiramos a transformar la manera en que las empresas y los individuos interactúan con la tecnología, proporcionando herramientas intuitivas y eficientes que impulsen el crecimiento y la productividad. Nos comprometemos a estar siempre a la vanguardia de la tecnología, adaptándonos rápidamente a los cambios del mercado y anticipándonos a las necesidades de nuestros clientes. Nuestro objetivo es crear un impacto positivo y duradero en la sociedad, promoviendo un entorno digital accesible y sostenible para todos.</p>
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