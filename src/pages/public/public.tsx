import React, { useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Navbar, { Section } from "./components/navbar";
import Post from "./components/post";
import PostList from "./components/post_list/";
import PopularPosts from "./components/popular_posts/";

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

                    <div className="aside-subsection aside-categories">
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

                    <div className="aside-subsection">
                        <PopularPosts />
                    </div>
                </aside>

                <section className="main-right-section">
                    <Routes>
                        <Route path="/" element={
                            <PostList />
                        } />

                        <Route path="/post/:postId" element={
                            <ShowPost />
                        } />

                        <Route path="/category/:categoryName" element={
                            <ShowCategory />
                        } />
                    </Routes>
                </section>
            </div>
        </section>

        <footer className="main-footer">
            <div className="footer-content">
                <section className="footer-info-container">
                    <h3 className="footer-title">
                        Información
                    </h3>

                    <span>
                        Sitio web desarrollado por Joaquín Ruaimi.
                    </span>

                    <div className="contact-container">
                        <a href="https://www.linkedin.com/in/joaquin-ruaimi-3381a1201/" target="_blank" rel="noreferrer" className="contact-item"><i className="fab fa-linkedin-in" aria-hidden="true"></i>
                        </a><a href="https://github.com/joaquinrmi" target="_blank" rel="noreferrer" className="contact-item"><i className="fab fa-github" aria-hidden="true"></i>
                        </a><a href="mailto:joaquinruaimi@gmail.com" target="_blank" rel="noreferrer" className="contact-item"><i className="far fa-envelope" aria-hidden="true"></i></a>
                    </div>
                </section>                

                <span>
                    Icons by <a href="https://fontawesome.com" target="_blank" rel="noreferrer">Font Awesome</a>.
                </span>
            </div>
        </footer>
    </>;
};

const ShowPost: React.FunctionComponent = () =>
{
    let { postId } = useParams();

    return <Post postId={postId as string} />
};

const ShowCategory: React.FunctionComponent = () =>
{
    let { categoryName } = useParams();

    return <PostList tags={[ categoryName as string ]} />
};

export default Public;