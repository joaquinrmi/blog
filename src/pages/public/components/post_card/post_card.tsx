import React from "react";
import { Link } from "react-router-dom";

import "./post_card.scss";

export interface Props
{
    data: PostCardData;
    editMode: boolean;
}

export interface PostCardData
{
    id: string;
    title: string;
    cover: string;
    tags: Array<{ name: string, tag: string }>;
    dateCreated: Date;
    contentFragment: string;
}

const PostCard: React.FunctionComponent<Props> = (props) =>
{
    return <div className="post-card">
        <Link className="card-post-cover" to={props.editMode ? `/admin/dashboard/posts/${props.data.id}` : `/post/${props.data.id}`} style={{
            backgroundImage: `url(${props.data.cover})`
        }}></Link>

        <div className="card-post-content">
            <div className="date">
                {props.data.dateCreated.getDate()}/
                {props.data.dateCreated.getMonth() + 1}/
                {props.data.dateCreated.getFullYear()}
            </div>

            <div className="tags">
                {props.data.tags.map((tag, index) =>
                {
                    return <>
                        <Link key={`tag-${index}`} to={`/category/${tag.tag}`}>
                            {tag.name}
                        </Link>
                        {index + 1 < props.data.tags.length ? <span key={`comma-${index}`} className="comma">,</span> : null}
                    </>;
                })}
            </div>

            <Link className="title" to={props.editMode ? `/admin/dashboard/posts/${props.data.id}` : `/post/${props.data.id}`}>
                {props.data.title}
            </Link>

            <span className="fragment">
                {props.data.contentFragment}
            </span>
        </div>
    </div>;
};

export default PostCard;