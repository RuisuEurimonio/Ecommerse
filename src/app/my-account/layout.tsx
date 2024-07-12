import NavBarAccount from "@/components/NavBarAccount";
import Link from "next/link";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="mb-4">
            <div className="bg-fifth-color h-8 mb-5 flex items-center pb-3">
                <div className="w-4/5 m-auto text-principal-color">
                    <Link className="flex items-center gap-3" href="/">
                        <span className="icon icon-arrowl"></span>
                        <p className=""> Inicio. </p>
                    </Link>
                </div>
            </div>
            <div
                className="flex gap-5 flex-col-reverse 
                md:divide-x-2 md:flex-row
            "
            >
                <div
                    className="mx-4 
                    md:flex-none md:w-[15%] md:ml-10 md:my-16
                "
                >
                    <NavBarAccount />
                </div>
                
                {children}
                
            </div>
        </div>
    );
};

export default Layout;
