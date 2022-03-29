async function uploadImage(inputElement: HTMLInputElement, imageElement: HTMLImageElement): Promise<string>
{
    if(!inputElement.files)
    {
        return "";
    }

    const fileData = inputElement.files[0];

    const formData = new FormData();
    formData.append("image", fileData);

    const res = await fetch(`${process.env.REACT_APP_SERVER}/api/upload/image`,
    {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    if(res.status === 201)
    {
        const data = await res.json();
        imageElement.src = data.imgUrl;
        imageElement.style.display = "block";

        return data.imgUrl;
    }
    else
    {
        console.log(await res.json());

        return "";
    }
}

export default uploadImage;