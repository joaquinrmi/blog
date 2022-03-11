import React from "react";
import Navbar from "./components/navbar";

import "./public.scss";

export interface Props
{}

const Public: React.FunctionComponent<Props> = (props) =>
{
    return <>
        <Navbar sections={[
            {
                name: "Inicio",
                path: "/"
            },
            {
                name: "Animales",
                path: "/animals"
            }
        ]} currentSection="/" />

        <header className="main-header">
            <h1>Blog de ejemplo</h1>
            <h2>Un blog sobre nada</h2>
        </header>
    </>;
};

export default Public;