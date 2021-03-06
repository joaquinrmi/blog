import React, { useState, useEffect } from "react";
import PostCard, { PostCardData } from "../post_card";
import { PostData } from "../post/";

import "./post_list.scss";

export interface Props
{
    author?: string;
    tags?: Array<string>;
    initOffset?: number;
    startDate?: Date;
    endDate?: Date;
    wordsInTitle?: Array<string>;
    editMode?: boolean;
}

const PostList: React.FunctionComponent<Props> = (props) =>
{
    const [ postDataList, setPostDataList ] = useState<Array<PostCardData>>([]);

    const [ loadPage, setLoadPage ] = useState<number>(-1);
    const [ page, setPage ] = useState({
        current: 1,
        last: 1
    });

    const [ elementsPerPage, setElementsPerPage ] = useState(5);

    useEffect(() =>
    {
        const queryTags = props.tags ? `[${props.tags.map(e => `"${e}"`).toString()}]` : "[]";
        const queryWords = props.wordsInTitle ? `[${props.wordsInTitle.map(e => `"${e}"`).toString()}]` : `[]`;

        const query = `offset=${props.initOffset ? props.initOffset : (page.current - 1) * elementsPerPage}&count=${elementsPerPage}&tags=${queryTags}&order=desc&wordsInTitle=${queryWords}`;

        const searchPath = `${process.env.REACT_APP_SERVER}/api/post/get-list/?${query}`;

        fetch(searchPath, {
            method: "GET"
        })
        .then(res =>
            {
                if(res.status === 200)
                {
                    return res.json();
                }
                else
                {
                    setPostDataList([
                        { ...NOTHING_TO_SHOW }
                    ]);

                    setLoadPage(-1);
                }
            }
        ).then(data =>
            {
                if(data.elements.length === 0)
                {
                    setPostDataList([
                        { ...NOTHING_TO_SHOW }
                    ]);
                    setLoadPage(-1);

                    return;
                }

                setPostDataList((data.elements as Array<PostData>).map(postData =>
                {
                    return {
                        id: postData.id,
                        title: postData.title,
                        cover: postData.cover,
                        tags: postData.tags,
                        dateCreated: new Date(postData.dateCreated),
                        contentFragment: postData.content[0].slice(0, 180)
                    };
                }));

                setPage(state =>
                {
                    return {
                        current: state.current,
                        last: Math.ceil(data.totalElementCount / elementsPerPage)
                    };
                });

                setLoadPage(-1);
            }
        );
    },
    [ props, page.current ]);

    let content;
    if(postDataList.length === 0 || loadPage !== -1)
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
    else if(postDataList[0].id === NOTHING_TO_SHOW.id)
    {
        content = <div className="nothing-to-show">
            No hay elementos para mostrar.
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

        const setCurrentPage = (page: number) =>
        {
            setLoadPage(page);

            setPage(state =>
            {
                return { ...state, current: page };
            });
        };

        content = <>
            <div className="card-post-container">
                {postDataList.map((postData, index) =>
                {
                    return <PostCard key={`${index}-post`} editMode={props.editMode ? true : false} data={postData} />
                })}
            </div>

            <div className="page-navigation">
                {page.current > 1 ? <ArrowPageNavigationButton direction={PageNavigationDirection.Prev} currentPage={page.current} setPage={setCurrentPage} /> : null}

                {leftPages.map((value, index) =>
                {
                    return <NumberPageNavigationButton key={`${index}-page`} page={value} className="mid-page-nav-button" setPage={setCurrentPage} />;
                })}

                <NumberPageNavigationButton page={page.current} focus setPage={setCurrentPage} />

                {rightPages.map((value, index) =>
                {
                    return <NumberPageNavigationButton key={`${index}-page`} page={value} className="mid-page-nav-button" setPage={setCurrentPage} />;
                })}

                {page.last > page.current ? <>
                    <NumberPageNavigationButton page={page.last} setPage={setCurrentPage} />
                    <ArrowPageNavigationButton direction={PageNavigationDirection.Next} currentPage={page.current} setPage={setCurrentPage} />
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

    onClick(): void;
}

const PageNavigationButton: React.FunctionComponent<PageNavigationProps> = (props) =>
{
    return <div className={`page-nav-button ${props.className ? props.className : ""} ${props.focus ? "active" : ""}`} onClick={props.onClick}>
        {props.symbol}
    </div>;
};

interface NumberPageNavigationProps
{
    page: number;
    focus?: boolean;
    className?: string;

    setPage(page: number): void;
}

const NumberPageNavigationButton: React.FunctionComponent<NumberPageNavigationProps> = (props) =>
{
    return <PageNavigationButton symbol={props.page.toString()} focus={props.focus} className={props.className} onClick={() => { props.setPage(props.page); }} />;
};

interface ArrowPageNavigationProps
{
    direction: PageNavigationDirection;
    currentPage: number;
    focus?: boolean;
    className?: string;

    setPage(page: number): void;
}

enum PageNavigationDirection
{
    Prev = "<",
    Next = ">"
}

const ArrowPageNavigationButton: React.FunctionComponent<ArrowPageNavigationProps> = (props) =>
{
    return <PageNavigationButton
        symbol={props.direction}
        focus={props.focus}
        className={props.className}
        onClick={() => {
            props.setPage(props.currentPage + 1 * (props.direction === PageNavigationDirection.Prev ? -1 : 1));
        }} />;
};

const NOTHING_TO_SHOW: PostCardData = {
    id: "nothing-to-show",
    title: "",
    cover: "",
    tags: [],
    dateCreated: new Date(),
    contentFragment: ""
};

export default PostList;