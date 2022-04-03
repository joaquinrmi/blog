import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Imageinput from "../../../../components/image_input/";
import PostContentEditor, { PostContentEditorElement } from "../post_content_editor/";
import uploadImage from "../../upload_image";
import TagEditor, { TagEditorElement } from "../tag_editor/";
import { PostData } from "../../../public/components/post";

import "./create_post.scss";

export interface Props
{
    postId?: string;
}

const CreatePost: React.FunctionComponent<Props> = (props) =>
{
    const [ postData, setPostData ] = useState<PostData | null>(null);
    const [ redirect, setRedirect ] = useState<string>("");
    const [ errorMessages, setErrorMessages ] = useState<Array<string>>([]);

    useEffect(() =>
    {
        if(props.postId)
        {
            const url = `${process.env.REACT_APP_SERVER}/api/post/get-single?postId=${props.postId}`;

            (async () =>
            {
                const res = await fetch(url, {
                    method: "GET"
                });

                if(res.status === 200)
                {
                    const data = await res.json();

                    setPostData({
                        id: data.id,
                        title: data.title,
                        cover: data.cover,
                        tags: data.tags,
                        dateCreated: new Date(data.dateCreated),
                        content: data.content,
                        gallery: data.gallery,
                        galleryPosition: data.galleryPosition
                    });
                }
            })();
        }
    },
    [ props ]);

    useEffect(() =>
    {
        if(props.postId && postData === null)
        {
            return;
        }

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

            const tags = tagEditor.getTags();

            const postForm: PostForm = {
                title: titleInput.value,
                cover: coverImage.src,
                content: contentEditor.getContent(),
                gallery: contentEditor.getGallery(),
                galleryPosition: contentEditor.getGalleryPosition(),
                tags: tags.map(tag => tag.tag)
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

            const createTagPath = `${process.env.REACT_APP_SERVER}/api/post/create-tag`;

            for(let i = 0; i < tags.length; ++i)
            {
                const res = await fetch(createTagPath, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tags[i]),
                    credentials: "include"
                });

                if(res.status !== 201)
                {
                    console.log(res);
                    newErrorMessages.push("Ocurrió un error inesperado.");
                    setErrorMessages(newErrorMessages);
                    return;
                }
            }

            const createPostPath = `${process.env.REACT_APP_SERVER}/api/post/create`;

            const res = await fetch(createPostPath, {
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
    [ postData ]);

    if(props.postId && postData === null)
    {
        return <div className="create-post-loading">
            Cargando información...
        </div>;
    }

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
            <input type="text" id="new-post-title" className="new-post-title" placeholder="Escriba un título" defaultValue={postData ? postData.title : ""} />

            <div className="new-post-cover-container">
                <span>Seleccione una imagen de portada:</span>

                <Imageinput id="new-post-cover" inputClassName="new-post-cover" imageContainerClassName="image-container" imgAlt="Imagen de portada" onChange={uploadImage} initSrc={postData ? postData.cover : undefined} />
            </div>

            <TagEditor id="new-post-tag-editor" initTags={postData ? postData.tags.map(value => {
                const splitPath = value.tag.split("/");

                return { tag: splitPath[splitPath.length - 1], name: value.name };
            }) : undefined} />
        </div>

        <PostContentEditor id="new-post-content" content={postData ? postData.content : undefined} gallery={postData ? postData.gallery : undefined} galleryPosition={postData ? postData.galleryPosition : undefined} />

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