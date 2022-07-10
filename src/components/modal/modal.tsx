import React, { useEffect } from "react";

import "./modal.scss";

export interface Props
{
    id: string;
    className?: string;
    open?: boolean;
}

export interface ModalElement extends HTMLDivElement
{
    open(): void;
    close(): void;
    isOpen(): boolean;
}

const Modal: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const modal = document.getElementById(props.id) as ModalElement;

        modal.open = () =>
        {
            modal.classList.remove("closed");
            modal.classList.add("open");
        };

        modal.close = () =>
        {
            modal.classList.remove("open");
            modal.classList.add("closed");
        };

        modal.isOpen = () =>
        {
            return modal.classList.contains("open");
        };
    });

    return <div
        id={props.id}
        className={`modal ${props.open ? "open" : "close"} ${props.className}`}
    >
        {props.children}
    </div>;
};

export default Modal;