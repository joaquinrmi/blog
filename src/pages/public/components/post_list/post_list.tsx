import React, { useState } from "react";
import PostCard, { PostCardData } from "../post_card";

import "./post_list.scss";

export interface Props
{
    tags?: Array<string>;
    initOffset?: number;
    startDate?: Date;
    endDate?: Date;
}

const PostList: React.FunctionComponent<Props> = (props) =>
{
    const [ postDataList, setPostDataList ] = useState<Array<PostCardData>>([
        {
            title: "El mundo de los zorros",
            cover: "https://cdn.pixabay.com/photo/2019/10/30/16/19/fox-4589927__340.jpg",
            tags: [
                {
                    name: "Animales",
                    path: "animals"
                },
                {
                    name: "Ciencia",
                    path: "science"
                }
            ],
            contentFragment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nobis labore excepturi! Amet deleniti sit sint aperiam ipsum debitis beatae facere voluptatibus distinctio? Autem sed, sapiente illum quidem est repellat.",
            url: "string",
        },
        {
            title: "El mundo de los zorros",
            cover: "https://www.northern-scot.co.uk/_media/img/N1HIOLEM3ZQ1K82I05CK.jpg",
            tags: [
                {
                    name: "Animales",
                    path: "animals"
                },
                {
                    name: "Ciencia",
                    path: "science"
                }
            ],
            contentFragment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nobis labore excepturi! Amet deleniti sit sint aperiam ipsum debitis beatae facere voluptatibus distinctio? Autem sed, sapiente illum quidem est repellat.",
            url: "string",
        }
    ]);

    const [ page, setPage ] = useState({
        current: 64,
        last: 100
    });

    let leftPages = new Array<number>();
    for(let i = 0; i < 3 && page.current - i > 1; ++i)
    {
        leftPages.push(page.current - (i + 1));
    }

    let rightPages = new Array<number>();
    for(let i = 0; i < 3 && (page.last - 1) - i > page.current; ++i)
    {
        rightPages.push(page.current + i + 1);
    }

    return <section className="post-list">
        <div className="card-post-container">
            {postDataList.map((postData, index) =>
            {
                return <PostCard key={`${index}-post`} data={postData} />
            })}
        </div>

        <div className="page-navigation">
            {page.current > 1 ? <PageNavigationButton symbol="<" /> : null}

            {leftPages.map((value, index) =>
            {
                return <PageNavigationButton key={`${index}-page`} symbol={`${value}`} />;
            })}

            <PageNavigationButton symbol={`${page.current}`} focus />

            {rightPages.map((value, index) =>
            {
                return <PageNavigationButton key={`${index}-page`} symbol={`${value}`} />;
            })}

            {page.last > page.current ? <>
                <PageNavigationButton symbol={`${page.last}`} />
                <PageNavigationButton symbol=">" />
            </> : null}
        </div>
    </section>;
};

interface PageNavigationProps
{
    symbol: string;
    focus?: boolean;
}

const PageNavigationButton: React.FunctionComponent<PageNavigationProps> = (props) =>
{
    return <div className={`page-nav-button ${props.focus ? "active" : ""}`}>
        {props.symbol}
    </div>;
};

export default PostList;