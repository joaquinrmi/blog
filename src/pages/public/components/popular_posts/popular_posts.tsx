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
    const [ data, setData ] = useState<Array<PopularPostData>>([]);

    useEffect(() =>
    {
        if(data.length > 0)
        {
            return;
        }

        setTimeout(() =>
        {
            setData([
                {
                    id: "hola",
                    title: "Lorem ipsum dolor sit amet",
                    tags: [
                        { name: "Animales", path: "animals" },
                        { name: "Ciencia", path: "science" }
                    ],
                    date: new Date()
                },
                {
                    id: "hola",
                    title: "Lorem ipsum dolor sit amet",
                    tags: [
                        { name: "Animales", path: "animals" },
                        { name: "Ciencia", path: "science" }
                    ],
                    date: new Date()
                },
                {
                    id: "hola",
                    title: "Lorem ipsum dolor sit amet",
                    tags: [
                        { name: "Animales", path: "animals" },
                        { name: "Ciencia", path: "science" }
                    ],
                    date: new Date()
                },
                {
                    id: "hola",
                    title: "Lorem ipsum dolor sit amet",
                    tags: [
                        { name: "Animales", path: "animals" },
                        { name: "Ciencia", path: "science" }
                    ],
                    date: new Date()
                },
                {
                    id: "hola",
                    title: "Lorem ipsum dolor sit amet",
                    tags: [
                        { name: "Animales", path: "animals" },
                        { name: "Ciencia", path: "science" }
                    ],
                    date: new Date()
                }
            ]);
        },
        3000);
    });

    let content;
    if(data.length > 0)
    {
        content = <>{data.map((postData, index) =>
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
        })}</>;
    }
    else
    {
        content = <>{[...new Array(5)].map((v, index) =>
        {
            return <li key={`${index}-litem`} className="popular-item popular-item-loading">
                <div className={`post-loading-title s${index + 1} loading`}></div>
                <div className="post-loading-date loading"></div>
                <div className="post-loading-tags">
                    <span className="loading"></span>
                    <span className="loading"></span>
                </div>
            </li>;
        })}</>;
    }

    return <div className="popular-posts">
        <h3 className="title">Popular</h3>
        <ul className="popular-post-list">
            {content}
        </ul>
    </div>;
};

export default PopularPosts;