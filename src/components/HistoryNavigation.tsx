import Link from "next/link";
import React from "react";

type HistoryNavigationProps = {
    items: {
        names: string;
        url?: string
    }[]
}

const HistoryNavigation : React.FC<HistoryNavigationProps> = ({items}) => {
    return (
        <div className="my-2 flex items-center space-x-2 text-xs
            lg:text-sm
            2xl:text-base
        "> 
            <Link href="/" > <span> Inicio </span> </Link>
            {items.map((item)=>(
                <React.Fragment key={item.names}>
                    {item.names && <span className="icon icon-arrowr"></span>}
                    <Link href={item.url ?? "#"}>
                        <span className="text-black-mafer/50"> {item.names} </span>    
                    </Link>
                </React.Fragment>
            ))}
        </div>
    )
}

export default HistoryNavigation;