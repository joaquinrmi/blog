import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar, { Section } from "./components/navbar";

import "./public.scss";

export interface Props
{}

const Public: React.FunctionComponent<Props> = (props) =>
{
    const [ sections, setSection ] = useState<Array<Section>>([
        {
            name: "Inicio",
            path: "/"
        },
        {
            name: "Animales",
            path: "/animals"
        }
    ]);

    return <>
        <Navbar sections={sections} currentSection="/" />

        <header className="main-header">
            <h1>Blog de ejemplo</h1>
            <h2>Un blog sobre nada</h2>
        </header>
        
        <section className="main-content">
            <div className="main-body-container">
                <aside className="main-left-section">
                    <div className="about-author">
                        <div className="photo-container">
                            <img src="" alt="" />
                        </div>

                        <div className="author-information">
                            <span className="name">
                                Nombre Autor
                            </span>
                            <span className="bio">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. In expedita ducimus quia illum aspernatur, recusandae delectus, doloribus veritatis ullam placeat voluptas accusamus aliquam nisi? Laboriosam perferendis nisi asperiores laudantium eligendi!
                            </span>
                        </div>
                    </div>

                    <div className="aside-categories">
                        <h3 className="title">Categorías</h3>
                        <ul className="categories-list">
                            {sections.map((section, i) =>
                            {
                                return <li key={`${i}-cat`} className="aside-category-item">
                                    <Link to={section.path}>
                                        {section.name}
                                    </Link>
                                </li>;
                            })}
                        </ul>
                    </div>
                </aside>

                <section className="main-right-section">
                </section>
            </div>
        </section>
    </>;
};

export default Public;