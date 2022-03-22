import React, { useState, useEffect } from "react";
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
    const [ postDataList, setPostDataList ] = useState<Array<PostCardData>>([]);

    const [ page, setPage ] = useState({
        current: 64,
        last: 100
    });

    useEffect(() =>
    {
        if(postDataList.length > 0)
        {
            return;
        }

        setTimeout(() =>
        {
            setPostDataList([
                {
                    id: "string",
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
                },
                {
                    id: "string",
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
                }
            ]);
        },
        2000);
    });

    let content;
    if(postDataList.length === 0)
    {
        content = <div className="card-post-container">
            {[...new Array(3)].map((v, index) =>
            {
                return <div key={`${index}-loading`} className="loading-post-card">
                    <div className="loading cover"></div>
                    <div className="content">
                        <div className="tags">
                            <span className="loading"></span>
                            <span className="loading"></span>
                        </div>
                        <div className="loading title"></div>
                        <div className="text">
                            {[...new Array(5)].map((v, index) =>
                            {
                                return <span key={`${index}-text`} className="loading" style={{
                                    width: `${100 - (Math.random() * 10)}%`
                                }}></span>
                            })}
                        </div>
                    </div>
                </div>;
            })}
        </div>;
    }
    else
    {
        let leftPages = new Array<number>();
        const maxElements = page.current > 3 ? 3 : page.current - 1;
        for(let i = 0; i < maxElements && page.current - i > 1; ++i)
        {
            leftPages.push(page.current - (maxElements - i));
        }

        let rightPages = new Array<number>();
        for(let i = 0; i < 3 && (page.last - 1) - i > page.current; ++i)
        {
            rightPages.push(page.current + i + 1);
        }

        content = <>
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
                    return <PageNavigationButton key={`${index}-page`} symbol={`${value}`} className="mid-page-nav-button" />;
                })}

                <PageNavigationButton symbol={`${page.current}`} focus />

                {rightPages.map((value, index) =>
                {
                    return <PageNavigationButton key={`${index}-page`} symbol={`${value}`} className="mid-page-nav-button" />;
                })}

                {page.last > page.current ? <>
                    <PageNavigationButton symbol={`${page.last}`} />
                    <PageNavigationButton symbol=">" />
                </> : null}
            </div>
        </>
    }    

    return <section className="post-list">
        {content}
    </section>;
};

interface PageNavigationProps
{
    symbol: string;
    focus?: boolean;
    className?: string;
}

const PageNavigationButton: React.FunctionComponent<PageNavigationProps> = (props) =>
{
    return <div className={`page-nav-button ${props.className ? props.className : ""} ${props.focus ? "active" : ""}`}>
        {props.symbol}
    </div>;
};

export default PostList;