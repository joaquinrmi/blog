import React, { useState, useEffect } from "react";
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
    const [ loaded, setLoaded ] = useState<boolean>(false);
    const [ categories, setCategories ] = useState<Array<Category>>([]);

    useEffect(() =>
    {
        const path = `${process.env.REACT_APP_SERVER}/api/post/tag-list`;

        (async () =>
        {
            const res = await fetch(path, {
                method: "GET"
            });

            if(res.status === 200)
            {
                const data = await res.json();

                setCategories(data);
                setLoaded(true);
            }
            else
            {
                setLoaded(true);
            }
        })();
    },
    []);

    if(!loaded)
    {
        return <></>;
    }

    const sections: Array<Section> = [
        {
            name: "Inicio",
            path: ""
        },
        ...categories.map((category) => ({ name: category.name, path: category.tag })).sort((a, b) =>
        {
            return a.name.localeCompare(b.name);
        })
    ];

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
                            <img src="https://avatars.githubusercontent.com/u/28006144?v=4" alt="Avatar de github" />
                        </div>

                        <div className="author-information">
                            <span className="name">
                                Joaquín Ruaimi
                            </span>
                            <span className="bio">
                                ¡Hola! Me llamo Joaquín y este es un pequeño proyecto de blog que desarrollé con fines didácticos.
                            </span>
                        </div>
                    </div>

                    <div className="aside-subsection aside-categories">
                        <h3 className="title">Categorías</h3>
                        <ul className="categories-list">
                            {sections.map((section, i) =>
                            {
                                return <li key={`${i}-cat`} className="aside-category-item">
                                    <Link to={section.path === "" ? "/" : `/category/${section.path}`}>
                                        {section.name}
                                    </Link>
                                    {i + 1 < sections.length ? <div className="aside-category-separator"></div> : null}
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

                        <Route path="/search/:query" element={
                            <ShowSearch />
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

interface Category
{
    tag: string;
    name: string;
    count: number;
}

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

const ShowSearch: React.FunctionComponent = () =>
{
    let { query } = useParams();

    return <PostList wordsInTitle={(query as string).split(" ")} />
};

export default Public;