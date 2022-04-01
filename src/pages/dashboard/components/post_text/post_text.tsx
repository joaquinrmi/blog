import React, { useState, useEffect } from "react";
import PostElement from "../post_element/";

import "./post_text.scss";

export interface Props
{
    id: string;
    value?: string;

    erase(): void;
}

const PostText: React.FunctionComponent<Props> = (props) =>
{
    const [ initValue ] = useState<string>(props.value ? props.value : "");

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
        <textarea placeholder="Comience a escribir aquí" id={`textarea-${props.id}`} className="new-post-textarea" value={initValue}></textarea>
    </PostElement>;
};

export default PostText;