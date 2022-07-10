import React, { useEffect } from "react";

import "./modal.scss";

export interface Props
{
    id: string;
    className?: string;
    open?: boolean;

    closeRequest(): void;
}

const Modal: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const modal = document.getElementById(props.id) as HTMLDivElement;

        if(modal === null)
        {
            return;
        }

        const closeModal = (ev: MouseEvent) =>
        {
            if(ev.target !== modal)
            {
                return;
            }

            props.closeRequest();
        };

        modal.addEventListener("click", closeModal);

        return () =>
        {
            modal.removeEventListener("click", closeModal);
        };
    });

    return <div
        id={props.id}
        className={`modal ${props.open ? "open" : "closed"} ${props.className}`}
    >
        {props.children}
    </div>;
};

export default Modal;