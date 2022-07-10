import React, { useEffect } from "react";

import "./modal.scss";

export interface Props
{
    id: string;
    className?: string;
    status: ModalStatus;
    closeAnimationTime?: number;

    closeRequest(): void;
}

export enum ModalStatus
{
    Closed = "closed",
    Closing = "closing",
    Open = "open"
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
            
            modal.classList.remove(ModalStatus.Closed);
            modal.classList.remove(ModalStatus.Open);
            modal.classList.add(ModalStatus.Closing);

            setTimeout(
                () =>
                {
                    props.closeRequest();
                },
                props.closeAnimationTime || 0
            );
        };

        modal.addEventListener("click", closeModal);

        return () =>
        {
            modal.removeEventListener("click", closeModal);
        };
    });

    useEffect(() =>
    {
        if(props.status === ModalStatus.Closing)
        {
            const modal = document.getElementById(props.id) as HTMLDivElement;

            if(modal === null)
            {
                return;
            }

            modal.classList.remove(ModalStatus.Closed);
            modal.classList.remove(ModalStatus.Open);
            modal.classList.add(ModalStatus.Closing);

            setTimeout(
                () =>
                {
                    props.closeRequest();
                },
                props.closeAnimationTime || 0
            );
        }
    });

    return <div
        id={props.id}
        className={`modal ${props.status} ${props.className}`}
    >
        {props.children}
    </div>;
};

export default Modal;