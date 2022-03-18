import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./popular_posts.scss";

interface PopularPostData
{
    id: string;
    title: string;
    tags: Array<{ name: string, path: string }>;
    date: Date;
}

const PopularPosts: React.FunctionComponent = () =>
{
    const [ data, setData ] = useState<Array<PopularPostData>>([
        {
            id: "hola",
            title: "Quiero ver cómo queda un título largo",
            tags: [ { name: "Animales", path: "animals" } ],
            date: new Date()
        },
        {
            id: "hola",
            title: "Quiero ver cómo queda un título largo",
            tags: [
                { name: "Animales", path: "animals" },
                { name: "Ciencia", path: "science" }
            ],
            date: new Date()
        },
        {
            id: "hola",
            title: "Quiero ver cómo queda un título largo",
            tags: [
                { name: "Animales", path: "animals" },
                { name: "Ciencia", path: "science" }
            ],
            date: new Date()
        },
        {
            id: "hola",
            title: "Quiero ver cómo queda un título largo",
            tags: [
                { name: "Animales", path: "animals" },
                { name: "Ciencia", path: "science" }
            ],
            date: new Date()
        },
        {
            id: "hola",
            title: "Quiero ver cómo queda un título largo",
            tags: [
                { name: "Animales", path: "animals" },
                { name: "Ciencia", path: "science" }
            ],
            date: new Date()
        }
    ]);

    return <div className="popular-posts">
        <h3 className="title">Popular</h3>
        <ul className="popular-post-list">
            {data.map((postData, index) =>
            {
                return <li key={`${index}-item`} className="popular-item">
                    <Link to={`/post/${postData.id}`} className={`popular-title s${index + 1}`}>
                        <h4>
                            {postData.title}
                        </h4>
                    </Link>

                    <span className="popular-date">
                        {`${postData.date.getDate()}/${postData.date.getMonth()}/${postData.date.getFullYear()}`}
                    </span>

                    <span className="popular-tags">
                        {postData.tags.map((tag, index) =>
                        {
                            return <span key={`${index}-tag`} className="popular-tag">
                                <Link to={`/category/${tag.path}`}>
                                    {tag.name}
                                </Link>
                                {index + 1 < postData.tags.length ? <span className="comma">,</span> : null}
                            </span>;
                        })}
                    </span>
                </li>;
            })}
        </ul>
    </div>;
};

export default PopularPosts;