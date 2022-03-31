import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Imageinput from "../../../../components/image_input/";
import PostContentEditor, { PostContentEditorElement } from "../post_content_editor/";
import uploadImage from "../../upload_image";
import TagEditor, { TagEditorElement } from "../tag_editor/";

import "./create_post.scss";

const CreatePost: React.FunctionComponent = () =>
{
    const [ redirect, setRedirect ] = useState<string>("");
    const [ errorMessages, setErrorMessages ] = useState<Array<string>>([]);

    useEffect(() =>
    {
        const postButton = document.getElementById("new-post-create-button") as HTMLDivElement;

        let uploading = false;

        postButton.onclick = async () =>
        {
            if(uploading)
            {
                return;
            }

            const titleInput = document.getElementById("new-post-title") as HTMLInputElement;

            const coverImage = document.getElementById("new-post-cover-image") as HTMLImageElement;

            const tagEditor = document.getElementById("new-post-tag-editor") as TagEditorElement;

            const contentEditor = document.getElementById("new-post-content") as PostContentEditorElement;

            const postForm: PostForm = {
                title: titleInput.value,
                cover: coverImage.src,
                content: contentEditor.getContent(),
                gallery: contentEditor.getGallery(),
                galleryPosition: contentEditor.getGalleryPosition(),
                tags: tagEditor.getTags()
            };

            const newErrorMessages: Array<string> = [];

            if(postForm.title === "")
            {
                newErrorMessages.push("El título no puede estar en blanco.");
            }

            if(postForm.content.length === 0 && postForm.gallery.length === 0)
            {
                newErrorMessages.push("Debe añadir al menos un elemento al contenido del artítulo.");
            }

            if(newErrorMessages.length > 0)
            {
                setErrorMessages(newErrorMessages);
                return;
            }

            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/post/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postForm),
                credentials: "include"
            });

            if(res.status === 201)
            {
                const postId = (await res.json()).postId;
                setRedirect(`/admin/dashboard/post/${postId}`);
            }
            else
            {
                const { what } = await res.json();

                if(what === "the_title_is_already_used")
                {
                    newErrorMessages.push("El título ya existe, pruebe con otro.");
                }

                if(what === "internal_server_error")
                {
                    newErrorMessages.push("Ocurrió un error inesperado en el servidor, por favor intente de nuevo más tarde.");
                }

                setErrorMessages(newErrorMessages);
            }
        };
    },
    []);

    if(redirect)
    {
        return <Navigate to={redirect} />;
    }

    return <form id="create-post-form" className="create-post">
        <div className={`new-post-error ${errorMessages.length > 0 ? "show" : ""}`}>
            <span className="error-title">
                El artículo no se ha podido publicar debido a los siguientes errores:
            </span>

            <ul>
                {errorMessages.map((message, index) =>
                {
                    return <li key={`${index}-error`}>{message}</li>;
                })}
            </ul>
        </div>

        <div className="new-post-header">
            <input type="text" id="new-post-title" className="new-post-title" placeholder="Escriba un título" />

            <div className="new-post-cover-container">
                <span>Seleccione una imagen de portada:</span>

                <Imageinput id="new-post-cover" inputClassName="new-post-cover" imageContainerClassName="image-container" imgAlt="Imagen de portada" onChange={uploadImage} />
            </div>

            <TagEditor id="new-post-tag-editor" />
        </div>

        <PostContentEditor id="new-post-content" />

        <div id="new-post-create-button" className="new-post-create-button" role="button">
            Publicar
        </div>
    </form>;
};

interface PostForm
{
   title: string;
   content: Array<string>;
   cover: string;
   gallery: Array<string>;
   galleryPosition: Array<number>;
   tags: Array<string>;
}

export default CreatePost;