import React from "react";
import Imageinput from "../../../../components/image_input/";
import PostContentEditor from "../post_content_editor/";
import uploadImage from "../../upload_image";
import TagEditor from "../tag_editor/";

import "./create_post.scss";

const CreatePost: React.FunctionComponent = () =>
{
    return <form id="create-post-form" className="create-post">
        <div className="new-post-header">
            <input type="text" id="new-post-title" className="new-post-title" placeholder="Escriba un título" />

            <div className="new-post-cover-container">
                <span>Seleccione una imagen de portada:</span>

                <Imageinput id="new-post-cover" inputClassName="new-post-cover" imageContainerClassName="image-container" imgAlt="Imagen de portada" onChange={uploadImage} />
            </div>

            <TagEditor />
        </div>

        <PostContentEditor />

        <div id="new-post-create-button" className="new-post-create-button" role="button">
            Publicar
        </div>
    </form>;
};

export default CreatePost;