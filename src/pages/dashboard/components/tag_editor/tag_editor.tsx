import React, { useState, useEffect } from "react";

import "./tag_editor.scss";

export interface Props
{
    id: string;
}

export interface TagEditorElement extends HTMLDivElement
{
    getTags(): Array<string>;
}

const TagEditor: React.FunctionComponent<Props> = (props) =>
{
    const [ tags, setTags ] = useState<Array<TagData>>([]);

    useEffect(() =>
    {
        const addTagButton = document.getElementById("new-post-add-tag") as HTMLDivElement;

        const tagInput = document.getElementById("new-post-tag-input") as HTMLInputElement;
        const nameInput = document.getElementById("new-post-name-input") as HTMLInputElement;

        addTagButton.onclick = () =>
        {
            if(tagInput.value.length === 0 || nameInput.value.length === 0)
            {
                tagInput.classList.add("error");
                nameInput.classList.add("error");

                return;
            }

            const tag = tagInput.value;
            const name = nameInput.value;

            tagInput.value = "";
            nameInput.value = "";

            setTags(state =>
            {
                return [ ...state, {
                    tag: tag,
                    name: name
                } ];
            });
        };

        tagInput.onchange = () =>
        {
            tagInput.classList.remove("error");
            nameInput.classList.remove("error");
        };

        nameInput.onchange = () =>
        {
            tagInput.classList.remove("error");
            nameInput.classList.remove("error");
        };

        const element = document.getElementById(props.id) as TagEditorElement;
        
        element.getTags = () =>
        {
            return tags.map(tag =>
            {
                return tag.tag;
            });
        };
    },
    []);

    const removeTag = (index: number) =>
    {
        setTags(state =>
        {
            let newTags = [ ...state ];
            newTags[index] = { tag: "", name: "" }

            return newTags;
        });
    };

    return <div id={props.id} className="new-post-tags-container">
        <span>Selecciones una o más categorías:</span>

        <div className="create-tag">
            <input type="text" placeholder="Etiqueta" id="new-post-tag-input" />
            <input type="text" placeholder="Nombre para mostrar" id="new-post-name-input" />

            <div id="new-post-add-tag" className="add-tag" role="button">
                <i className="fa-solid fa-plus"></i>
            </div>
        </div>

        <ul id="new-post-tag-list" className="tag-list">
            {tags.map((tagData, index) =>
            {
                if(tagData.tag === "")
                {
                    return;
                }

                return <li key={`tag-${index}`} className="new-post-tag" onClick={() => removeTag(index)}>
                    {tagData.name} (<i>{tagData.tag}</i>)
                </li>;
            })}
        </ul>
    </div>;
};

interface TagData
{
    tag: string;
    name: string;
}

export default TagEditor;