import React from "react";
import PostElement from "../post_element/";
import Imageinput from "../../../../components/image_input/";
import uploadImage from "../../upload_image";

import "./post_image.scss";

export interface Props
{
    id: string;

    erase(): void;
}

const PostImage: React.FunctionComponent<Props> = (props) =>
{
    return <PostElement id={props.id} erase={props.erase}>
        <div className="new-post-image-input-container">
            <Imageinput id={`${props.id}`} inputClassName="" imageContainerClassName="new-post-image-container" onChange={uploadImage} />
        </div>
    </PostElement>;
};

export default PostImage;