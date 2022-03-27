import React from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import PostList from "../public/components/post_list";
import SessionContext from "../admin/session_context";
import NavItem from "../../components/nav_item";

import "./dashboard.scss";

export interface Props
{
    logout(): void;
}

const Dashboard: React.FunctionComponent<Props> = (props) =>
{
    return <div className="dashboard">
        <header className="dashboard-header">
            <div className="header-content">
                <div className="navigation"></div>
                <div id="dashboard-logout-button" className="account-button" role="button">
                    <span>Cerrar sesión</span>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </div>
        </header>

        <section className="dashboard-body">
            <div className="body-content">
                <aside className="dashboard-aside">
                    <ul className="aside-navigation">
                        <NavItem to="/admin/dashboard" className="nav-item">
                            <span className="icon-container">
                                <i className="fa-solid fa-desktop"></i>
                            </span>
                            <span>Inicio</span>
                        </NavItem>
                            
                        <NavItem to="/admin/dashboard/posts" className="nav-item">
                            <span className="icon-container">
                                <i className="fa-regular fa-file-lines"></i>
                            </span>
                            <span>Publicaciones</span>
                        </NavItem>
                    </ul>
                </aside>

                <section className="dashboard-content">
                    <Routes>
                        <Route path="/" element={<></>} />

                        <Route path="/posts" element={<>
                            <SessionContext.Consumer>
                                {({ session }) =>
                                {
                                    return <>
                                        <section className="post-actions-container">
                                            <Link to="/admin/dashboard/create-post" className="create-post-action" role="button">
                                                <i className="fa-regular fa-plus"></i>
                                                <span>
                                                    Nuevo artículo
                                                </span>
                                            </Link>
                                        </section>

                                        <PostList author={session.username} editMode />
                                    </>;
                                }}
                            </SessionContext.Consumer>
                        </>} />

                        <Route path="/posts/:postId" element={<ShowPost />} />
                    </Routes>
                </section>
            </div>
        </section>
    </div>;
};

const ShowPost: React.FunctionComponent = () =>
{
    const { postId } = useParams();

    return <></>;
};

export default Dashboard;