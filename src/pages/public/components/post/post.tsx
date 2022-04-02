import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./post.scss";

export interface Props
{
    postId: string;
}

export interface PostData
{
    id: string;
    title: string;
    dateCreated: Date;
    tags: Array<{ tag: string, name: string }>;
    content: Array<string>;
    cover: string;
    gallery: Array<string>;
    galleryPosition: Array<number>;
}

interface PostDataStatus
{
    loaded: boolean;
    data?: PostData;
}

const Post: React.FunctionComponent<Props> = (props) =>
{
    const [ status, setStatus ] = useState<PostDataStatus>({
        loaded: false
    });

    useEffect(() =>
    {
        const path = `${process.env.REACT_APP_SERVER}/api/post/get-single/?postId=${props.postId}`;

        fetch(path, {
            method: "GET"
        })
        .then(res =>
        {
            if(res.status === 200)
            {
                return res.json();
            }
        })
        .then(data =>
        {
            setStatus({
                loaded: true,
                data: {
                    id: data.id,
                    title: data.title,
                    dateCreated: new Date(data.dateCreated),
                    tags: data.tags,
                    content: data.content,
                    cover: data.cover,
                    gallery: data.gallery,
                    galleryPosition: data.galleryPosition
                }
            });
        });
    },
    []);

    let content: any;
    if(status.loaded && status.data)
    {
        content = <>
            <div className="post-header">
                <span className="post-date">
                    {status.data.dateCreated.getDate()}/
                    {status.data.dateCreated.getMonth() + 1}/
                    {status.data.dateCreated.getFullYear()}
                </span>

                <h1 className="post-title">
                    {status.data.title}
                </h1>

                <div className="post-tags">
                    {status.data.tags.map((tag, index) =>
                    {
                        return <Link to={`/category/${tag.tag}`} key={`${index}-tag`} className="post-tag">
                            {tag.name}
                        </Link>
                    })}
                </div>
            </div>

            <div className="post-cover">
                <img src={status.data.cover} />
            </div>

            <div className="post-content">
                {status.data.content.map((para, index) =>
                {
                    return <p className="post-paragraph">
                        {para}
                    </p>;
                })}
            </div>
        </>;
    }
    else
    {
        content = <div className="loading">
            <div className="loading-title"></div>
            <div className="loading-tags">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="loading-cover"></div>
            <div className="loading-content">
                {[...new Array(10)].map((v, i) =>
                {
                    return <span style={{
                        width: `${100 - (Math.random() * 10)}%`,
                        marginBottom: i === 4 ? "1em" : 0
                    }}></span>;
                })}
            </div>
        </div>;
    }

    return <div className="post">
        {content}
    </div>;
};

export default Post;