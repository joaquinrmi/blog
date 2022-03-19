import React from "react";
import { Link } from "react-router-dom";

import "./post_card.scss";

export interface Props
{
    data: PostCardData;
}

export interface PostCardData
{
    id: string;
    title: string;
    cover: string;
    tags: Array<{ name: string, path: string }>;
    contentFragment: string;
}

const PostCard: React.FunctionComponent<Props> = (props) =>
{
    return <Link className="post-card" to={`/post/${props.data.id}`}>
        <div className="card-post-cover" style={{
            backgroundImage: `url(${props.data.cover})`
        }}></div>

        <div className="card-post-content">
            <div className="tags">
                {props.data.tags.map((tag, index) =>
                {
                    return <>
                        <Link key={`tag-${index}`} to={`/category/${tag.path}`}>
                            {tag.name}
                        </Link>
                        {index + 1 < props.data.tags.length ? <span className="comma">,</span> : null}
                    </>;
                })}
            </div>
            <h3 className="title">
                {props.data.title}
            </h3>
            <span className="fragment">
                {props.data.contentFragment}
            </span>
        </div>
    </Link>;
};

export default PostCard;