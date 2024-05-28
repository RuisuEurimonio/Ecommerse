"use client"

import { useState } from "react";

type ModalProps = {
    type?: string,
    openCloseModal: React.MouseEventHandler<HTMLDivElement>,
    state: boolean
}

const Modal : React.FC<ModalProps> = ({type, openCloseModal, state}) => {

    return (
        <div className="fixed bg-black/20 h-screen w-screen z-50 top-0 left-0 flex items-center justify-center"
            style={{display: (state) ? "flex" : "none"}}
            onClick={openCloseModal}
        >
            <div className="w-4/5 m-auto">
                {type === "post" ?
                (<h2> Agregar usuario. </h2>)
                :
                (<h2> Actualizar usuario. </h2>)
            }
            </div>
        </div>
    )
}

export default Modal;