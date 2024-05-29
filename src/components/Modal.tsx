"use client"

import FormUser from "./FormUser";

type ModalProps = {
    type?: string,
    openCloseModal: React.MouseEventHandler<HTMLDivElement>,
    state: boolean
}

const Modal : React.FC<ModalProps> = ({type, openCloseModal, state}) => {

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
                <div className="w-full relative">
                    <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
                </div>
                {type === "post" ?
                (<h2 className="font-bold text-blue-mafer text-xl m-2"> Agregar usuario. </h2>)
                :
                (<h2 className="font-bold text-blue-mafer text-xl m-2"> Actualizar usuario. </h2>)
            }
                <FormUser className="w-11/12 h-full" modal/>
            </div>
        </div>
    )
}

export default Modal;