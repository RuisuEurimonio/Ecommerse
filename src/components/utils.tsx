import React, {ReactNode} from 'react'

type inputErrorTextProps = {
    children: ReactNode
}

export const InputErrorText : React.FC<inputErrorTextProps>  = ({ children }) => {
    return (
        <p className="text-sm text-red-500
            lg:absolute lg:-right-4 lg:top-0 lg:-translate-x-[-100%] lg:max-w-[25vw]
        ">
            {" "}
            <span className="icon icon-alert"></span>{" "}
            {children}{" "}
        </p>
    );
};
