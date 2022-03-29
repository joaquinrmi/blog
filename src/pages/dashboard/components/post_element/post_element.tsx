import React, { useEffect } from "react";

import "./post_element.scss";

export interface Props
{
    id: string;

    erase(): void;
}

const PostElement: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const eraseButton = document.getElementById(`erase-button-${props.id}`) as HTMLDivElement;

        eraseButton.onclick = () =>
        {
            props.erase();
        }
    });

    return <div id={props.id} className="new-post-element-container">
        <div id={`button-container-${props.id}`} className="erase-button-container">
            <div id={`erase-button-${props.id}`} className="new-post-element-erase">
                <i className="fa-regular fa-circle-xmark"></i>
            </div>
        </div>

        {props.children}
    </div>;
};

export default PostElement;