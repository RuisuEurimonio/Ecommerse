import React, {ReactNode} from 'react'

type inputErrorTextProps = {
    children: ReactNode,
    modal?:boolean
}

export const InputErrorText : React.FC<inputErrorTextProps>  = ({ children, modal }) => {
    return (
        <p className={`text-sm text-red-500
            ${(!modal)?"lg:absolute lg:-right-4 lg:top-0 lg:-translate-x-[-100%] lg:max-w-[25vw]":"text-right"}
        `}>
            {" "}
            <span className="icon icon-alert"></span>{" "}
            {children}{" "}
        </p>
    );
};
