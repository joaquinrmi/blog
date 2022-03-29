import React, { useEffect } from "react";
import PostElement from "../post_element/";

import "./post_text.scss";

export interface Props
{
    id: string;

    erase(): void;
}

const PostText: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const textElement = document.getElementById(`textarea-${props.id}`) as HTMLTextAreaElement;

        textElement.oninput = () =>
        {
            textElement.style.height = "5px";
            textElement.style.height = `${textElement.scrollHeight + 10}px`;
        };
    });

    return <PostElement id={props.id} erase={props.erase}>
        <textarea placeholder="Comience a escribir aquí" id={`textarea-${props.id}`} className="new-post-textarea"></textarea>
    </PostElement>;
};

export default PostText;