import React, { useState, useEffect } from "react";
import PostText from "../post_text/";
import PostImage from "../post_image/";

import "./post_content_editor.scss";

export interface Props
{}

const PostContentEditor: React.FunctionComponent<Props> = (props) =>
{
    const [ elements, setElements ] = useState<Array<PostElement>>([]);

    useEffect(() =>
    {
        const addTextButton = document.getElementById("new-post-add-text") as HTMLDivElement;

        addTextButton.onclick = () =>
        {
            setElements(state =>
            {
                return [ ...state, { type: PostElementType.Text } ];
            });
        };

        const addImageButton = document.getElementById("new-post-add-image") as HTMLDivElement;

        addImageButton.onclick = () =>
        {
            setElements(state =>
            {
                return [ ...state, { type: PostElementType.Image } ];
            });
        };
    },
    []);

    const eraseElement = (id: number) =>
    {
        setElements(state =>
        {
            let elements = [ ...state ];
            elements[id] = { type: PostElementType.None };

            return elements;
        });
    };

    return <div id="new-post-content" className="new-post-content">
        {elements.map((element, index) =>
        {
            switch(element.type)
            {
            case PostElementType.None:
                return null;

            case PostElementType.Text:
                return <PostText key={`${index}-post-text`} id={`${index}-post-text`} erase={() =>
                {
                    eraseElement(index);
                }} />;

            case PostElementType.Image:
                return <PostImage key={`${index}-post-image`} id={`${index}-post-image`} erase={() =>
                {
                    eraseElement(index);
                }} />;
            }
        })}

        <div id="new-post-options" className="new-post-options">
            <div id="new-post-add-text" className="new-post-add-text" title="Añadir nuevo párrafo">
                <i className="fa-solid fa-align-justify"></i>
                <span>Nuevo párrafo</span>
            </div>

            <div id="new-post-add-image" className="new-post-add-image" title="Añadir nueva imagen">
                <i className="fa-regular fa-image"></i>
                <span>Nueva imagen</span>
            </div>
        </div>
    </div>;
};

interface PostElement
{
    type: PostElementType;
}

enum PostElementType
{
    None,
    Text,
    Image
}

export default PostContentEditor;