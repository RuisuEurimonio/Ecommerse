"use client"

import FormUser from "./FormUser";

type ModalProps = {
    openCloseModal: React.MouseEventHandler<HTMLDivElement>,
    state: boolean,
    children: React.ReactNode
}

const Modal : React.FC<ModalProps> = ({openCloseModal, state, children}) => {

    return (
        <div className="fixed bg-black/20 h-screen w-screen z-50 top-0 left-0"
            style={{display: (state) ? "flex" : "none"}}
            onClick={openCloseModal}
        >
            <div className="w-11/12 max-h-[80vh] m-auto bg-white rounded-md shadow-md flex flex-col items-center py-5 overflow-y-auto border-2
                lg:w-1/2 lg:overflow-x-hidden    
            "
                onClick={(e)=>{e.stopPropagation()}}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal;