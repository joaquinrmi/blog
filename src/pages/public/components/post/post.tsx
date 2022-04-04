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
            fetch(`${process.env.REACT_APP_SERVER}/api/post/view?postId=${props.postId}`,
            {
                method: "POST"
            });

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
    [ props.postId ]);

    let content: any;
    if(status.loaded && status.data)
    {
        const data = status.data;
        if(!data.gallery)
        {
            data.gallery = [];
            data.galleryPosition = [];
        }

        let postContent = new Array<PostContentElement>();

        let gpIndex = 0;
        for(let i = 0; i < data.content.length; ++i)
        {
            if(gpIndex < data.galleryPosition.length)
            {
                if(data.galleryPosition[gpIndex] === i)
                {
                    postContent.push({
                        type: PostContentElementType.Image,
                        index: gpIndex
                    });
                    ++gpIndex;
                }
            }

            postContent.push({
                type: PostContentElementType.Text,
                index: i
            });
        }

        content = <>
            <div className="post-header">
                <span className="post-date">
                    {data.dateCreated.getDate()}/
                    {data.dateCreated.getMonth() + 1}/
                    {data.dateCreated.getFullYear()}
                </span>

                <h1 className="post-title">
                    {data.title}
                </h1>

                <div className="post-tags">
                    {data.tags.map((tag, index) =>
                    {
                        return <Link key={`${index}-tag`} to={`/category/${tag.tag}`} className="post-tag">
                            {tag.name}
                        </Link>
                    })}
                </div>
            </div>

            <div className="post-cover">
                <img src={data.cover} />
            </div>

            <div className="post-content">
                {postContent.map((element, index) =>
                {
                    switch(element.type)
                    {
                    case PostContentElementType.Image:
                        return <div key={`${index}-content`} className="post-image">
                            <img src={data.gallery[element.index]} alt="" />
                        </div>;

                    case PostContentElementType.Text:
                        return <p key={`${index}-content`} className="post-paragraph">
                            {data.content[element.index]}
                        </p>;
                    }
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
                    return <span key={`load-${i}`} style={{
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

interface PostContentElement
{
    type: PostContentElementType;
    index: number;
}

enum PostContentElementType
{
    Text,
    Image
}

export default Post;