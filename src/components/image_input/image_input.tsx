import React, { useEffect } from "react";

export interface Props
{
    id: string;
    inputClassName: string;
    imageContainerClassName: string;
    imgAlt?: string;
    initSrc?: string;
    
    onChange(inputElement: HTMLInputElement, imageElement: HTMLImageElement): Promise<string>;
}

const Imageinput: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const inputElement = document.getElementById(`${props.id}-input`) as HTMLInputElement;
        const imageElement = document.getElementById(`${props.id}-image`) as HTMLImageElement;

        inputElement.onchange = async () =>
        {
            const imgUrl = await props.onChange(inputElement, imageElement);
            if(imgUrl !== imageElement.src)
            {
                imageElement.src = imgUrl;
                imageElement.style.display = "block";
            }
        };
    });

    return <>
        <input type="file" accept="image/png, image/jpeg" id={`${props.id}-input`} className={props.inputClassName} />

        <div className={props.imageContainerClassName}>
            <img src={props.initSrc ? props.initSrc : ""} alt={props.imgAlt} id={`${props.id}-image`} style={props.initSrc ? { display: "block" } : {}}/>
        </div>
    </>;
};

export default Imageinput;